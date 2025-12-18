import { useState, useRef } from 'react';
import { Upload, X, FileImage, FileText, File, Music, Video, Link2, Youtube, Check } from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  type: 'file' | 'url' | 'youtube' | 'google-drive';
  url?: string;
  file?: File;
  preview?: string;
  size?: number;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  mimeType?: string;
}

interface UniversalUploaderProps {
  onFilesUploaded?: (files: UploadedFile[]) => void;
  acceptedTypes?: string[];
  maxFiles?: number;
  showUrlInput?: boolean;
}

export function UniversalUploader({
  onFilesUploaded,
  acceptedTypes = ['*'],
  maxFiles = 50,
  showUrlInput = true
}: UniversalUploaderProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [showUrlModal, setShowUrlModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      handleFiles(selectedFiles);
    }
  };

  const handleFiles = (newFiles: File[]) => {
    if (files.length + newFiles.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`);
      return;
    }

    const uploadedFiles: UploadedFile[] = newFiles.map(file => {
      const isImage = file.type.startsWith('image/');

      return {
        id: `${Date.now()}-${file.name}`,
        name: file.name,
        type: 'file' as const,
        file,
        preview: isImage ? URL.createObjectURL(file) : undefined,
        size: file.size,
        progress: 0,
        status: 'uploading' as const,
        mimeType: file.type
      };
    });

    setFiles(prev => [...prev, ...uploadedFiles]);

    uploadedFiles.forEach(uploadFile => {
      simulateUpload(uploadFile.id);
    });

    if (onFilesUploaded) {
      setTimeout(() => {
        onFilesUploaded(uploadedFiles.map(f => ({ ...f, status: 'completed', progress: 100 })));
      }, 3000);
    }
  };

  const handleUrlSubmit = () => {
    if (!urlInput.trim()) return;

    const urls = urlInput.split('\n').filter(url => url.trim());

    const urlFiles: UploadedFile[] = urls.map(url => {
      const trimmedUrl = url.trim();
      let type: UploadedFile['type'] = 'url';
      let name = trimmedUrl;

      if (trimmedUrl.includes('youtube.com') || trimmedUrl.includes('youtu.be')) {
        type = 'youtube';
        name = `YouTube: ${extractYouTubeId(trimmedUrl)}`;
      } else if (trimmedUrl.includes('drive.google.com')) {
        type = 'google-drive';
        name = `Google Drive: ${extractGoogleDriveId(trimmedUrl)}`;
      } else {
        name = trimmedUrl.split('/').pop() || trimmedUrl;
      }

      return {
        id: `url-${Date.now()}-${Math.random()}`,
        name,
        type,
        url: trimmedUrl,
        progress: 0,
        status: 'uploading' as const
      };
    });

    setFiles(prev => [...prev, ...urlFiles]);
    setShowUrlModal(false);
    setUrlInput('');

    urlFiles.forEach(file => {
      simulateUpload(file.id);
    });

    if (onFilesUploaded) {
      setTimeout(() => {
        onFilesUploaded(urlFiles.map(f => ({ ...f, status: 'completed', progress: 100 })));
      }, 2000);
    }
  };

  const extractYouTubeId = (url: string): string => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : url;
  };

  const extractGoogleDriveId = (url: string): string => {
    const match = url.match(/[-\w]{25,}/);
    return match ? match[0] : url;
  };

  const simulateUpload = (fileId: string) => {
    const interval = setInterval(() => {
      setFiles(prev => prev.map(f => {
        if (f.id === fileId) {
          const newProgress = Math.min(f.progress + 10, 100);
          return {
            ...f,
            progress: newProgress,
            status: newProgress === 100 ? 'completed' : 'uploading'
          };
        }
        return f;
      }));
    }, 200);

    setTimeout(() => clearInterval(interval), 2000);
  };

  const removeFile = (fileId: string) => {
    setFiles(files.filter(f => f.id !== fileId));
  };

  const getFileIcon = (file: UploadedFile) => {
    if (file.type === 'youtube') return Youtube;
    if (file.type === 'url' || file.type === 'google-drive') return Link2;

    if (file.mimeType?.startsWith('image/')) return FileImage;
    if (file.mimeType?.startsWith('video/')) return Video;
    if (file.mimeType?.startsWith('audio/')) return Music;
    if (file.mimeType?.startsWith('text/')) return FileText;

    return File;
  };

  const formatFileSize = (bytes?: number): string => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'youtube': return 'bg-red-100 text-red-700';
      case 'google-drive': return 'bg-blue-100 text-blue-700';
      case 'url': return 'bg-purple-100 text-purple-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-all
          ${isDragging
            ? 'border-blue-500 bg-blue-50 scale-105'
            : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'
          }
        `}
      >
        <Upload className="h-12 w-12 mx-auto mb-4 text-slate-400" />
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          Drop files here to upload
        </h3>
        <p className="text-sm text-slate-600 mb-4">
          or choose from the options below
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileSelect}
            accept={acceptedTypes.join(',')}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Files
          </button>

          {showUrlInput && (
            <button
              onClick={() => setShowUrlModal(true)}
              className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors flex items-center justify-center gap-2"
            >
              <Link2 className="h-4 w-4" />
              Add from URL
            </button>
          )}
        </div>

        <p className="text-xs text-slate-500 mt-4">
          Supports: Images (JPG, PNG, GIF, SVG), Videos (MP4, MOV, AVI), Audio (MP3, WAV),
          Documents (PDF, DOC, TXT), YouTube URLs, Google Drive links
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-slate-900">
              {files.length} file{files.length !== 1 ? 's' : ''} uploaded
            </h4>
            <button
              onClick={() => setFiles([])}
              className="text-sm text-red-600 hover:text-red-700"
            >
              Clear all
            </button>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {files.map(file => {
              const Icon = getFileIcon(file);
              return (
                <div
                  key={file.id}
                  className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-colors"
                >
                  {file.preview ? (
                    <img
                      src={file.preview}
                      alt={file.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-slate-100 rounded flex items-center justify-center">
                      <Icon className="h-6 w-6 text-slate-400" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-slate-900 truncate">
                        {file.name}
                      </span>
                      {file.type !== 'file' && (
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getTypeColor(file.type)}`}>
                          {file.type === 'youtube' ? 'YouTube' : file.type === 'google-drive' ? 'Drive' : 'URL'}
                        </span>
                      )}
                    </div>

                    {file.status === 'uploading' && (
                      <div className="relative h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="absolute inset-y-0 left-0 bg-blue-600 transition-all"
                          style={{ width: `${file.progress}%` }}
                        />
                      </div>
                    )}

                    {file.status === 'completed' && (
                      <div className="flex items-center gap-2">
                        <Check className="h-3 w-3 text-green-600" />
                        <span className="text-xs text-green-600 font-medium">Uploaded</span>
                        {file.size && (
                          <span className="text-xs text-slate-500">• {formatFileSize(file.size)}</span>
                        )}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => removeFile(file.id)}
                    className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {showUrlModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowUrlModal(false)}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-900">Add from URL</h3>
              <button
                onClick={() => setShowUrlModal(false)}
                className="p-1 hover:bg-slate-100 rounded"
              >
                <X className="h-5 w-5 text-slate-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Paste URLs (one per line)
                </label>
                <textarea
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder={`https://drive.google.com/file/d/...\nhttps://youtube.com/watch?v=...\nhttps://example.com/image.jpg\n\nSupported:\n• Google Drive files and folders\n• YouTube videos\n• Direct file URLs\n• Any web URL`}
                  rows={8}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Supported Sources:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Google Drive: Share link (file or folder)</li>
                  <li>• YouTube: Video or playlist URL</li>
                  <li>• Direct links: Images, videos, documents</li>
                  <li>• Web URLs: Any accessible web resource</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleUrlSubmit}
                  disabled={!urlInput.trim()}
                  className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Add URLs
                </button>
                <button
                  onClick={() => setShowUrlModal(false)}
                  className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
