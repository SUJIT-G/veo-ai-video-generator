
import React, { useCallback, useState } from 'react';
import type { UploadedImage } from '../types';

interface FileUploadProps {
  onImageUpload: (image: UploadedImage | null) => void;
}

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // remove the `data:mime/type;base64,` prefix
      resolve(result.split(',')[1]);
    };
    reader.onerror = (error) => reject(error);
  });
};

export const FileUpload: React.FC<FileUploadProps> = ({ onImageUpload }) => {
  const [fileName, setFileName] = useState<string>('');

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        setFileName(file.name);
        const base64 = await fileToBase64(file);
        const previewUrl = URL.createObjectURL(file);
        onImageUpload({
          base64,
          mimeType: file.type,
          previewUrl
        });
      } catch (error) {
        console.error("Error converting file to base64", error);
        onImageUpload(null);
        setFileName('');
      }
    }
  }, [onImageUpload]);

  return (
    <div className="w-full">
      <label htmlFor="file-upload" className="block text-sm font-medium text-gray-300 mb-2">
        1. Upload an Image
      </label>
      <div className="relative border-2 border-dashed border-slate-600 rounded-lg p-6 flex flex-col items-center justify-center hover:border-indigo-500 transition-colors duration-300">
        <input
          id="file-upload"
          name="file-upload"
          type="file"
          className="sr-only"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
        />
        <label htmlFor="file-upload" className="cursor-pointer text-center">
            <svg className="mx-auto h-12 w-12 text-slate-500" stroke="currentColor" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
            </svg>
            <p className="mt-2 text-sm text-gray-400">
              <span className="font-semibold text-indigo-400">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
            {fileName && <p className="mt-2 text-xs text-green-400 font-mono truncate max-w-xs">{fileName}</p>}
        </label>
      </div>
    </div>
  );
};
