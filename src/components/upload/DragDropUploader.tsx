import { useState, useRef, DragEvent } from 'react';
import { Upload, X, FileImage, FileText, Film, File, Check } from 'lucide-react';

interface DragDropUploaderProps {
  onUpload: (files: File[]) => void;
  accept?: string;
  maxSize?: number;
  maxFiles?: number;
  category?: string;
  className?: string;
}

interface UploadedFile {
  file: File;
  preview?: string;
  progress: number;
  status: 'uploading' | 'success' | 'error';
}

export function DragDropUploader({
  onUpload,
  accept = 'image/*,video/*,.pdf,.doc,.docx',
  maxSize = 10 * 1024 * 1024,
  maxFiles = 10,
  className = '',
}: DragDropUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    processFiles(files);
  };

  const processFiles = (files: File[]) => {
    const validFiles = files.filter((file) => {
      if (file.size > maxSize) {
        alert(`${file.name} is too large. Max size is ${maxSize / (1024 * 1024)}MB`);
        return false;
      }
      return true;
    });

    if (uploadedFiles.length + validFiles.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`);
      return;
    }

    const newFiles: UploadedFile[] = validFiles.map((file) => ({
      file,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
      progress: 0,
      status: 'uploading',
    }));

    setUploadedFiles([...uploadedFiles, ...newFiles]);

    newFiles.forEach((_, index) => {
      simulateUpload(uploadedFiles.length + index);
    });

    onUpload(validFiles);
  };

  const simulateUpload = (index: number) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadedFiles((prev) => {
        const updated = [...prev];
        if (updated[index]) {
          updated[index].progress = progress;
          if (progress >= 100) {
            updated[index].status = 'success';
          }
        }
        return updated;
      });

      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 100);
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => {
      const updated = [...prev];
      if (updated[index].preview) {
        URL.revokeObjectURL(updated[index].preview!);
      }
      updated.splice(index, 1);
      return updated;
    });
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <FileImage className="h-6 w-6" />;
    if (file.type.startsWith('video/')) return <Film className="h-6 w-6" />;
    if (file.type.includes('pdf') || file.type.includes('document')) return <FileText className="h-6 w-6" />;
    return <File className="h-6 w-6" />;
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl transition-all ${
          isDragging
            ? 'border-blue-500 bg-blue-50 scale-[1.02]'
            : 'border-slate-300 bg-white hover:border-blue-400 hover:bg-slate-50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="p-12 text-center">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
            isDragging ? 'bg-blue-500' : 'bg-slate-100'
          }`}>
            <Upload className={`h-8 w-8 ${isDragging ? 'text-white' : 'text-slate-600'}`} />
          </div>

          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            {isDragging ? 'Drop files here' : 'Upload brand assets'}
          </h3>
          <p className="text-sm text-slate-600 mb-4">
            Drag and drop files here, or{' '}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              browse
            </button>
          </p>
          <p className="text-xs text-slate-500">
            Maximum file size: {maxSize / (1024 * 1024)}MB • Up to {maxFiles} files
          </p>
        </div>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {uploadedFiles.map((uploadFile, index) => (
            <div
              key={index}
              className="relative bg-white rounded-lg border border-slate-200 overflow-hidden group"
            >
              {uploadFile.preview ? (
                <div className="aspect-video bg-slate-100 relative">
                  <img
                    src={uploadFile.preview}
                    alt={uploadFile.file.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-video bg-slate-100 flex items-center justify-center">
                  {getFileIcon(uploadFile.file)}
                </div>
              )}

              <div className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-slate-900 truncate flex-1">
                    {uploadFile.file.name}
                  </p>
                  {uploadFile.status === 'success' && (
                    <Check className="h-4 w-4 text-green-600 flex-shrink-0 ml-2" />
                  )}
                </div>
                <p className="text-xs text-slate-500 mb-2">
                  {(uploadFile.file.size / 1024).toFixed(1)} KB
                </p>

                {uploadFile.status === 'uploading' && (
                  <div className="w-full bg-slate-200 rounded-full h-1.5">
                    <div
                      className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${uploadFile.progress}%` }}
                    />
                  </div>
                )}
              </div>

              <button
                onClick={() => removeFile(index)}
                className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
              >
                <X className="h-4 w-4 text-slate-600 hover:text-red-600" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
