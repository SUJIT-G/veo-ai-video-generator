
import React from 'react';
import type { UploadedImage } from '../types';

interface ImagePreviewProps {
    image: UploadedImage | null;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ image }) => {
    if (image) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <img src={image.previewUrl} alt="Preview" className="max-w-full max-h-full object-contain rounded-lg" />
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center text-center text-gray-500 border-2 border-dashed border-slate-700 rounded-lg p-8">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <p className="mt-4 font-semibold">Your generated video will appear here</p>
            <p className="text-sm">Start by uploading an image and entering a prompt.</p>
        </div>
    );
};
