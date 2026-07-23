"use client";

import React, { useState, useEffect } from "react";
import { useVisualEditor } from "./VisualEditorProvider";
import { useRouter } from "next/navigation";

interface EditableImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    id: string; // The key in settings or the field in table
    table?: string; // e.g., 'services', 'sectors'. If undefined, defaults to 'settings'
    entityId?: number; // e.g., service id
}

export function EditableImage({ id, table, entityId, className = "", style = {}, src, alt, ...props }: EditableImageProps) {
    const { isEditMode, token, liveSettings, liveEntities, refreshSettings } = useVisualEditor();
    
    // Fallback to static 'src' until live data is fetched
    let displaySrc = src;
    if (table && entityId) {
        if (liveEntities && liveEntities[table] && liveEntities[table][entityId]) {
            displaySrc = liveEntities[table][entityId][id] ?? src;
        }
    } else {
        if (liveSettings) {
            displaySrc = liveSettings[id] ?? src;
        }
    }

    const [currentSrc, setCurrentSrc] = useState(displaySrc);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setCurrentSrc(displaySrc);
    }, [displaySrc]);

    useEffect(() => {
        if (!isEditMode) return;

        // Listen for message from the parent admin dashboard
        const handleMessage = async (e: MessageEvent) => {
            // Check if the message is for this specific image field
            if (e.data.action === "mediaPicked" && e.data.targetId === id && e.data.table === table && e.data.entityId === entityId) {
                const newUrl = e.data.url;
                setCurrentSrc(newUrl);
                await saveImage(newUrl);
            }
        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, [isEditMode, id, table, entityId, token]);

    const saveImage = async (newUrl: string) => {
        setIsSaving(true);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://www.afc-cpa.com";
            
            let endpoint = `${apiUrl}/api/settings.php`;
            let bodyData: any = { [id]: newUrl };

            if (table && entityId) {
                endpoint = `${apiUrl}/api/update_field.php`;
                bodyData = { table, id: entityId, field: id, value: newUrl };
            }

            const res = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { "Authorization": `Bearer ${token}` } : {})
                },
                body: JSON.stringify(bodyData),
            });
            const data = await res.json().catch(() => ({}));
            
            if (res.ok) {
                refreshSettings(); // Refetch globally
            } else {
                alert("فشل في حفظ الصورة: " + (data.error || res.statusText));
            }
        } catch (error) {
            console.error(error);
            alert("حدث خطأ أثناء الحفظ. يرجى التحقق من الاتصال.");
        }
        setIsSaving(false);
    };

    const handleClick = (e: React.MouseEvent) => {
        if (!isEditMode) return;
        e.preventDefault();
        e.stopPropagation();
        
        // Ask parent admin dashboard to open media picker
        window.parent.postMessage({
            action: "openMediaPicker",
            targetId: id,
            table: table,
            entityId: entityId
        }, "*");
    };

    if (!isEditMode) {
        return <img src={currentSrc} alt={alt} className={className} style={style} {...props} />;
    }

    return (
        <div 
            className={`editable-image-wrapper ${className}`}
            style={{ 
                ...style,
                position: "relative",
                display: "inline-block",
                cursor: "pointer",
                outline: "2px dashed rgba(0, 91, 171, 0.5)",
                outlineOffset: "4px"
            }}
            onClick={handleClick}
            title="انقر لتغيير الصورة"
        >
            <img src={currentSrc} alt={alt} style={{ width: "100%", height: "100%", objectFit: style.objectFit || "cover" }} {...props} />
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "rgba(0,91,171,0.8)", color: "#fff", padding: "5px 10px", borderRadius: "5px", fontSize: "12px", pointerEvents: "none", opacity: isSaving ? 1 : 0.8 }}>
                {isSaving ? "جاري الحفظ..." : "تغيير الصورة"}
            </div>
        </div>
    );
}
