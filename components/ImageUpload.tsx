import { useRef, useState } from "react";
import { upload } from "@vercel/blob/client";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pick = async (file: File) => {
    setUploading(true);
    setError(null);
    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/admin/upload",
      });
      onChange(blob.url);
    } catch {
      setError("Upload failed. Try a smaller image or a different file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      {value ? (
        <img src={value} alt="" style={{ width: 44, height: 44, objectFit: "cover", borderRadius: 10, flexShrink: 0, border: "1px solid var(--border-subtle)" }} />
      ) : (
        <div style={{ width: 44, height: 44, borderRadius: 10, flexShrink: 0, border: "1px dashed var(--border-default)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-tertiary)" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2"></rect>
            <circle cx="9" cy="9" r="2"></circle>
            <path d="m21 15-5-5L5 21"></path>
          </svg>
        </div>
      )}
      <button type="button" className="btn-outline sm" onClick={() => inputRef.current?.click()} disabled={uploading}>
        {uploading ? "Uploading…" : value ? "Change photo" : "Upload photo"}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) pick(file);
          e.target.value = "";
        }}
      />
      {error && <span style={{ fontSize: 12, color: "var(--red-400, #e05d5d)" }}>{error}</span>}
    </div>
  );
}
