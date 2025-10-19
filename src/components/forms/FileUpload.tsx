"use client";

import { useState, useRef } from "react";
import { useAuth } from "@/lib/firebase/useAuth";
import { uploadFile } from "@/lib/firebase/storage";
import { addFileMetadata } from "@/lib/firebase/firestore";
import { UploadCloud, File as FileIcon, Trash2, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface FileUploadProps {
  recordId: string;
  module: "clients" | "staff";
  existingFiles: any[];
  onUploadComplete: () => void;
}

export default function FileUpload({ recordId, module, onUploadComplete }: FileUploadProps) {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleUpload = async (file: File) => {
    if (!user) {
      setError("You must be logged in to upload files.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setError("File size cannot exceed 10MB.");
        return;
    }
    
    setUploading(true);
    setError(null);
    setProgress(0);

    try {
      const { downloadURL, filePath } = await uploadFile(
        file,
        `uploads/${user.uid}/${module}/${recordId}/${file.name}`,
        (p) => setProgress(p)
      );

      await addFileMetadata({
        userId: user.uid,
        module,
        recordId,
        fileName: file.name,
        fileUrl: downloadURL,
        filePath,
        uploadedBy: user.email || "unknown",
      });

      onUploadComplete();
    } catch (err: any) {
      setError(err.message || "Failed to upload file.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Documents</label>
        <div
          className="flex justify-center items-center flex-col w-full p-6 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-primary hover:bg-gray-50 transition"
          onClick={() => fileInputRef.current?.click()}
        >
          <UploadCloud className="w-10 h-10 text-gray-400 mb-2" />
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-primary">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500">PDF, DOCX, PNG, JPG (max. 10MB)</p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
          />
        </div>
      </div>

      {uploading && (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Uploading...</span>
                <span className="text-sm font-medium text-gray-700">{Math.round(progress)}%</span>
            </div>
          <Progress value={progress} className="w-full" />
        </div>
      )}

      {error && (
        <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</p>
      )}
    </div>
  );
}
