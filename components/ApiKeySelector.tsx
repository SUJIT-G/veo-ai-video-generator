
import React from 'react';

interface ApiKeySelectorProps {
    onKeySelected: () => void;
}

export const ApiKeySelector: React.FC<ApiKeySelectorProps> = ({ onKeySelected }) => {
    const handleSelectKey = async () => {
        try {
            // @ts-ignore
            await window.aistudio.openSelectKey();
            // Assume success after dialog opens to handle race conditions
            onKeySelected();
        } catch (e) {
            console.error("Could not open API key selection dialog:", e);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-slate-800 p-8 rounded-2xl shadow-lg text-center max-w-md mx-4">
                <h2 className="text-2xl font-bold text-white mb-4">Select API Key</h2>
                <p className="text-gray-400 mb-6">
                    This application uses the Veo video generation model, which requires you to select your own API key.
                    Your key will be used for API requests.
                </p>
                 <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-400 hover:text-indigo-300 mb-6 block">
                    Learn more about billing
                </a>
                <button
                    onClick={handleSelectKey}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                    Select Your API Key
                </button>
            </div>
        </div>
    );
};
