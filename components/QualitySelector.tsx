import React from 'react';
import type { VideoQuality } from '../types';

interface QualitySelectorProps {
    quality: VideoQuality;
    setQuality: (quality: VideoQuality) => void;
    disabled: boolean;
}

export const QualitySelector: React.FC<QualitySelectorProps> = ({ quality, setQuality, disabled }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">4. Select Video Quality</label>
            <div className="flex space-x-4">
                <label className={`flex-1 text-center p-3 rounded-lg cursor-pointer transition-all duration-300 ${quality === '720p' ? 'bg-indigo-600 border-2 border-indigo-400' : 'bg-slate-700 hover:bg-slate-600 border-2 border-transparent'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <input type="radio" name="quality" value="720p" checked={quality === '720p'} onChange={() => setQuality('720p')} className="sr-only" disabled={disabled} />
                    <span className="font-semibold">720p</span>
                    <span className="block text-xs text-gray-400">Faster</span>
                </label>
                <label className={`flex-1 text-center p-3 rounded-lg cursor-pointer transition-all duration-300 ${quality === '1080p' ? 'bg-indigo-600 border-2 border-indigo-400' : 'bg-slate-700 hover:bg-slate-600 border-2 border-transparent'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <input type="radio" name="quality" value="1080p" checked={quality === '1080p'} onChange={() => setQuality('1080p')} className="sr-only" disabled={disabled} />
                    <span className="font-semibold">1080p</span>
                     <span className="block text-xs text-gray-400">Higher Quality</span>
                </label>
            </div>
        </div>
    );
}
