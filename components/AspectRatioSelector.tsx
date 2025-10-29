
import React from 'react';
import type { AspectRatio } from '../types';

interface AspectRatioSelectorProps {
    aspectRatio: AspectRatio;
    setAspectRatio: (ratio: AspectRatio) => void;
    disabled: boolean;
}

export const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({ aspectRatio, setAspectRatio, disabled }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">3. Select Aspect Ratio</label>
            <div className="grid grid-cols-2 gap-4">
                <label className={`relative flex items-center justify-center p-4 rounded-lg cursor-pointer transition-all duration-300 ${aspectRatio === '16:9' ? 'bg-indigo-600 border-2 border-indigo-400' : 'bg-slate-700 hover:bg-slate-600 border-2 border-transparent'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <input type="radio" name="aspect-ratio" value="16:9" checked={aspectRatio === '16:9'} onChange={() => setAspectRatio('16:9')} className="sr-only" disabled={disabled} />
                    <div className="w-16 h-9 bg-slate-500 rounded-sm"></div>
                    <span className="absolute bottom-2 text-xs font-semibold">16:9</span>
                </label>
                <label className={`relative flex items-center justify-center p-4 rounded-lg cursor-pointer transition-all duration-300 ${aspectRatio === '9:16' ? 'bg-indigo-600 border-2 border-indigo-400' : 'bg-slate-700 hover:bg-slate-600 border-2 border-transparent'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <input type="radio" name="aspect-ratio" value="9:16" checked={aspectRatio === '9:16'} onChange={() => setAspectRatio('9:16')} className="sr-only" disabled={disabled} />
                    <div className="w-9 h-16 bg-slate-500 rounded-sm"></div>
                    <span className="absolute bottom-2 text-xs font-semibold">9:16</span>
                </label>
            </div>
        </div>
    );
}
