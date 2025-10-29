
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
                Veo Video Intro Generator
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
                Bring your photos to life. Upload an image, describe the action, and let Veo's AI generate a stunning video intro in seconds.
            </p>
        </header>
    );
};
