import React, { useState } from 'react';

interface SubscriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose }) => {
    const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');

    if (!isOpen) {
        return null;
    }

    return (
        <div 
            className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 transition-opacity duration-300"
            onClick={onClose}
        >
            <div 
                className="bg-slate-800 rounded-2xl shadow-xl w-full max-w-md p-8 text-white transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600 mb-2">Upgrade to Pro</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
                </div>
                
                <p className="text-gray-400 mb-6">Unlock full-length video downloads and more.</p>

                <ul className="space-y-2 text-gray-300 mb-6">
                    <li className="flex items-center"><svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>Full-Length HD Video Downloads</li>
                    <li className="flex items-center"><svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>No Watermarks</li>
                    <li className="flex items-center"><svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>Priority Generation Queue</li>
                </ul>

                <div className="space-y-4">
                    <div onClick={() => setSelectedPlan('monthly')} className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedPlan === 'monthly' ? 'border-indigo-500 bg-slate-700/50' : 'border-slate-600 bg-slate-700'}`}>
                        <p className="font-bold">Monthly Plan</p>
                        <p className="text-gray-400">$10 / month</p>
                    </div>
                    <div onClick={() => setSelectedPlan('yearly')} className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedPlan === 'yearly' ? 'border-indigo-500 bg-slate-700/50' : 'border-slate-600 bg-slate-700'}`}>
                        <span className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">Save 20%</span>
                        <p className="font-bold">Yearly Plan</p>
                        <p className="text-gray-400">$96 / year</p>
                    </div>
                </div>

                <a 
                    href={selectedPlan === 'monthly' ? '#paypal-monthly' : '#paypal-yearly'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-6 w-full block text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                >
                    Subscribe with PayPal
                </a>
            </div>
            <style>{`
                @keyframes fadeInScale {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-fade-in-scale {
                    animation: fadeInScale 0.2s ease-out forwards;
                }
            `}</style>
        </div>
    );
};
