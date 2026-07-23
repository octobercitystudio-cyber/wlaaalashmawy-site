"use client";

import React, { useState } from "react";
import { useVisualEditor } from "./VisualEditorProvider";
import { useRouter } from "next/navigation";

interface EditableTextProps {
    id: string;
    value: string;
    as?: React.ElementType;
    isHtml?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

export function EditableText({ id, value, as: Component = "span", isHtml = false, className = "", style = {} }: EditableTextProps) {
    const { isEditMode, token } = useVisualEditor();
    const [isEditing, setIsEditing] = useState(false);
    const [currentValue, setCurrentValue] = useState(value);
    const [isSaving, setIsSaving] = useState(false);
    const router = useRouter();

    if (!isEditMode) {
        if (isHtml) {
            return <Component className={className} style={style} dangerouslySetInnerHTML={{ __html: value || "" }} />;
        }
        return <Component className={className} style={style}>{value}</Component>;
    }

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://www.afc-cpa.com";
            const res = await fetch(`${apiUrl}/api/settings.php`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { "Authorization": `Bearer ${token}` } : {})
                },
                body: JSON.stringify({ [id]: currentValue }),
            });
            if (res.ok) {
                setIsEditing(false);
                router.refresh();
            } else {
                alert("فشل في حفظ التعديل");
            }
        } catch (error) {
            console.error(error);
            alert("حدث خطأ أثناء الحفظ");
        }
        setIsSaving(false);
    };

    if (isEditing) {
        return (
            <div style={{ position: "relative", zIndex: 9999, background: "#fff", padding: "10px", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.2)", width: "100%", maxWidth: "600px", color: "#000" }}>
                <div style={{ marginBottom: "10px", fontSize: "14px", fontWeight: "bold", color: "#333" }}>تعديل: {id}</div>
                {isHtml ? (
                    <textarea 
                        value={currentValue} 
                        onChange={(e) => setCurrentValue(e.target.value)} 
                        style={{ width: "100%", minHeight: "150px", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", color: "#000", fontFamily: "monospace" }} 
                    />
                ) : (
                    <input 
                        type="text" 
                        value={currentValue} 
                        onChange={(e) => setCurrentValue(e.target.value)} 
                        style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", color: "#000" }} 
                    />
                )}
                <div style={{ display: "flex", gap: "10px", marginTop: "10px", justifyContent: "flex-end" }}>
                    <button onClick={() => setIsEditing(false)} style={{ padding: "6px 12px", background: "#f0f0f0", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer", color: "#333" }}>إلغاء</button>
                    <button onClick={handleSave} disabled={isSaving} style={{ padding: "6px 12px", background: "#005bab", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                        {isSaving ? "جاري الحفظ..." : "حفظ"}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <Component 
            className={`editable-field ${className}`} 
            style={{ 
                ...style, 
                outline: "2px dashed rgba(0, 91, 171, 0.5)", 
                outlineOffset: "4px",
                cursor: "pointer",
                position: "relative",
                display: "inline-block"
            }} 
            title="انقر للتعديل"
            onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                e.stopPropagation();
                setIsEditing(true);
            }}
        >
            {isHtml ? <span dangerouslySetInnerHTML={{ __html: currentValue || "" }} /> : currentValue}
            <div className="editable-hint" style={{ position: "absolute", top: "-20px", right: "0", background: "#005bab", color: "#fff", fontSize: "10px", padding: "2px 6px", borderRadius: "4px", opacity: 0.8, pointerEvents: "none", whiteSpace: "nowrap" }}>
                تعديل
            </div>
        </Component>
    );
}
