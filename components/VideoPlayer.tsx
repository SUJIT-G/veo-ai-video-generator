import React from 'react';
import type { AspectRatio } from '../types';

interface VideoPlayerProps {
  src: string;
  aspectRatio: AspectRatio;
  onUnlockClick: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, aspectRatio, onUnlockClick }) => {
  const aspectRatioClass = aspectRatio === '16:9' ? 'aspect-video' : 'aspect-[9/16]';

  return (
    <div className="w-full max-w-full flex flex-col items-center gap-4">
      <h3 className="text-xl font-bold text-gray-200">Video Preview</h3>
      <div className={`w-full rounded-lg overflow-hidden shadow-2xl ${aspectRatioClass}`}>
        <video
          src={src}
          controls
          autoPlay
          loop
          className="w-full h-full object-contain bg-black"
        >
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="w-full space-y-3 mt-2">
        <a
          href={src}
          download="generated-video-preview.mp4"
          className="w-full inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-slate-800"
        >
          <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 9.707a1 1 0 011.414 0L9 11.086V3a1 1 0 112 0v8.086l1.293-1.379a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Download 10s Preview
        </a>
        <button
          onClick={onUnlockClick}
          className="w-full inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-800"
        >
          <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2V7a5 5 0 00-5-5zm0 2.5a2.5 2.5 0 012.5 2.5V7h-5V7a2.5 2.5 0 012.5-2.5z" />
          </svg>
          Unlock & Download Full Video
        </button>
      </div>
    </div>
  );
};