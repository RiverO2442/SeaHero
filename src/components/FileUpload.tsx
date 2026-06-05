import React, { useRef, useState } from "react";

interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  onFiles: (files: File[]) => void;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  accept,
  multiple = false,
  onFiles,
  className = "",
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [selected, setSelected] = useState<File[]>([]);

  const handle = (files: FileList | null) => {
    if (!files) return;
    const list = Array.from(files);
    setSelected(list);
    onFiles(list);
  };

  return (
    <div className={className}>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); handle(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
        className={`flex flex-col items-center justify-center gap-2 p-8 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
          dragging
            ? "border-blue-500 bg-blue-50"
            : "border-slate-300 hover:border-blue-400 hover:bg-slate-50"
        }`}
      >
        <span className="material-symbols-outlined text-4xl text-slate-400">upload_file</span>
        <p className="text-sm font-medium text-slate-600">
          Drag & drop files here, or <span className="text-blue-600">browse</span>
        </p>
        {accept && <p className="text-xs text-slate-400">{accept}</p>}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="sr-only"
          onChange={(e) => handle(e.target.files)}
        />
      </div>

      {selected.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {selected.map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-slate-700 bg-slate-50 rounded-lg px-3 py-2">
              <span className="material-symbols-outlined text-base text-slate-400">description</span>
              <span className="flex-1 truncate">{f.name}</span>
              <span className="text-xs text-slate-400 shrink-0">{(f.size / 1024).toFixed(1)} KB</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileUpload;
