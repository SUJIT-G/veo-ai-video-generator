
import React from 'react';

interface PromptInputProps {
    prompt: string;
    setPrompt: (prompt: string) => void;
    disabled: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt, disabled }) => {
    return (
        <div>
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
                2. Enter a Prompt
            </label>
            <textarea
                id="prompt"
                name="prompt"
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={disabled}
                className="w-full bg-slate-700 border-slate-600 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300 disabled:opacity-50"
                placeholder="e.g., A cinematic shot of the host..."
            />
        </div>
    );
}
