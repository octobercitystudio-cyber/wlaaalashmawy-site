"use client";

import React, { createContext, useContext, useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface VisualEditorContextType {
    isEditMode: boolean;
    token: string | null;
}

const VisualEditorContext = createContext<VisualEditorContextType>({ isEditMode: false, token: null });

export const useVisualEditor = () => useContext(VisualEditorContext);

function VisualEditorLogic({ children }: { children: React.ReactNode }) {
    const searchParams = useSearchParams();
    const isEditMode = searchParams.get("edit_mode") === "true";
    const token = searchParams.get("token");

    const [activeToken, setActiveToken] = useState<string | null>(null);
    const [activeEditMode, setActiveEditMode] = useState<boolean>(false);

    useEffect(() => {
        let currentToken = token;
        if (currentToken) {
            sessionStorage.setItem("admin_token", currentToken);
        } else {
            currentToken = sessionStorage.getItem("admin_token");
        }
        setActiveToken(currentToken);

        let currentEditMode = isEditMode;
        if (currentEditMode) {
            sessionStorage.setItem("edit_mode", "true");
        } else {
            currentEditMode = sessionStorage.getItem("edit_mode") === "true";
        }
        setActiveEditMode(currentEditMode);
    }, [token, isEditMode]);

    return (
        <VisualEditorContext.Provider value={{ isEditMode: activeEditMode, token: activeToken }}>
            {children}
        </VisualEditorContext.Provider>
    );
}

export function VisualEditorProvider({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={<>{children}</>}>
            <VisualEditorLogic>
                {children}
            </VisualEditorLogic>
        </Suspense>
    );
}
