"use client";

import React, { createContext, useContext, useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface VisualEditorContextType {
    isEditMode: boolean;
    token: string | null;
    liveSettings: Record<string, string> | null;
    liveEntities: Record<string, Record<number, any>> | null;
    refreshSettings: () => void;
}

const VisualEditorContext = createContext<VisualEditorContextType>({ 
    isEditMode: false, 
    token: null, 
    liveSettings: null, 
    liveEntities: null,
    refreshSettings: () => {} 
});

export const useVisualEditor = () => useContext(VisualEditorContext);

function VisualEditorLogic({ children }: { children: React.ReactNode }) {
    const searchParams = useSearchParams();
    const isEditMode = searchParams.get("edit_mode") === "true";
    const token = searchParams.get("token");

    const [activeToken, setActiveToken] = useState<string | null>(null);
    const [activeEditMode, setActiveEditMode] = useState<boolean>(false);
    const [liveSettings, setLiveSettings] = useState<Record<string, string> | null>(null);
    const [liveEntities, setLiveEntities] = useState<Record<string, Record<number, any>> | null>(null);

    const refreshSettings = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://www.afc-cpa.com";
            const res = await fetch(`${apiUrl}/api/settings.php`);
            if (res.ok) {
                const data = await res.json();
                setLiveSettings(data);
            }
            
            // Fetch live entities if we are in edit mode to save bandwidth for regular visitors
            // Actually, we fetch them for all so that the live updates work. 
            // To optimize, we can fetch all tables into a single endpoint or fetch concurrently.
            // For now, let's fetch the main ones if needed, or create a 'api/all_data.php' later.
            // Let's fetch them:
            const tables = ['services', 'sectors', 'articles', 'features', 'stats'];
            const entitiesMap: Record<string, Record<number, any>> = {};
            
            await Promise.all(tables.map(async (table) => {
                const tres = await fetch(`${apiUrl}/api/${table}.php`);
                if (tres.ok) {
                    const tdata = await tres.json();
                    entitiesMap[table] = {};
                    tdata.forEach((item: any) => {
                        entitiesMap[table][item.id] = item;
                    });
                }
            }));
            
            setLiveEntities(entitiesMap);
        } catch (e) {
            console.error("Failed to fetch live settings/entities", e);
        }
    };

    useEffect(() => {
        refreshSettings();
    }, []);

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
        <VisualEditorContext.Provider value={{ isEditMode: activeEditMode, token: activeToken, liveSettings, liveEntities, refreshSettings }}>
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
