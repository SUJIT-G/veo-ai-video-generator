import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { FileUpload } from './components/FileUpload';
import { VideoPlayer } from './components/VideoPlayer';
import { Loader } from './components/Loader';
import { ApiKeySelector } from './components/ApiKeySelector';
import { AspectRatioSelector } from './components/AspectRatioSelector';
import { PromptInput } from './components/PromptInput';
import { GenerateButton } from './components/GenerateButton';
import { Header } from './components/Header';
import { ImagePreview } from './components/ImagePreview';
import { QualitySelector } from './components/QualitySelector';
import { SubscriptionModal } from './components/SubscriptionModal';
import type { UploadedImage, AspectRatio, VideoQuality } from './types';
import { generateVideoFromImage } from './services/geminiService';

const LOADING_MESSAGES = [
  "Warming up the digital director's chair...",
  "Cueing the digital actors...",
  "Rendering the opening scene...",
  "This can take a few minutes, please wait...",
  "Applying special effects...",
  "Finalizing the video score...",
  "Just a little longer, the magic is happening!",
];

export default function App() {
  const [apiKeySelected, setApiKeySelected] = useState(false);
  const [image, setImage] = useState<UploadedImage | null>(null);
  const [prompt, setPrompt] = useState<string>('Host starts a video intro');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  const [quality, setQuality] = useState<VideoQuality>('720p');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const loadingIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    const checkApiKey = async () => {
      // @ts-ignore
      if (window.aistudio && await window.aistudio.hasSelectedApiKey()) {
        setApiKeySelected(true);
      }
    };
    checkApiKey();
  }, []);

  useEffect(() => {
    if (isLoading) {
      setLoadingMessage(LOADING_MESSAGES[0]);
      loadingIntervalRef.current = window.setInterval(() => {
        setLoadingMessage(prev => {
          const currentIndex = LOADING_MESSAGES.indexOf(prev);
          const nextIndex = (currentIndex + 1) % LOADING_MESSAGES.length;
          return LOADING_MESSAGES[nextIndex];
        });
      }, 4000);
    } else {
      if (loadingIntervalRef.current) {
        clearInterval(loadingIntervalRef.current);
        loadingIntervalRef.current = null;
      }
    }
    return () => {
      if (loadingIntervalRef.current) {
        clearInterval(loadingIntervalRef.current);
      }
    };
  }, [isLoading]);
  
  const handleGenerateVideo = useCallback(async () => {
    if (!image) {
      setError('Please upload an image first.');
      return;
    }
    if (!prompt) {
      setError('Please enter a prompt.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setVideoUrl(null);
    
    try {
      const url = await generateVideoFromImage(image, prompt, aspectRatio, quality);
      setVideoUrl(url);
    } catch (err: any) {
      console.error("Caught error in App:", err);
      let userFriendlyMessage = 'An unknown error occurred. Please try again.';
      const errorMessage = err.message || '';

      if (errorMessage.includes("Requested entity was not found") || errorMessage.includes('API key not valid')) {
        userFriendlyMessage = "API key not found or invalid. Please select a valid API key and try again.";
        setApiKeySelected(false);
      } else if (errorMessage.startsWith("SAFETY_VIOLATION:")) {
        userFriendlyMessage = errorMessage.replace("SAFETY_VIOLATION:", "").trim();
      } else if (errorMessage.startsWith("QUOTA_EXCEEDED:")) {
        userFriendlyMessage = errorMessage.replace("QUOTA_EXCEEDED:", "").trim() + " Check your Google AI Studio billing details.";
      } else if (errorMessage.includes("Failed to download video")) {
        userFriendlyMessage = "Could not download the generated video. Please check your network connection and try again.";
      } else if (errorMessage.includes("Video generation failed:")) {
        userFriendlyMessage = errorMessage;
      }
      
      setError(userFriendlyMessage);
    } finally {
      setIsLoading(false);
    }
  }, [image, prompt, aspectRatio, quality]);

  if (!apiKeySelected) {
    return <ApiKeySelector onKeySelected={() => setApiKeySelected(true)} />;
  }
  
  return (
    <>
      <div className="min-h-screen bg-slate-900 text-gray-200 font-sans">
        <div className="container mx-auto p-4 md:p-8">
          <Header />

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Controls Column */}
            <div className="bg-slate-800 p-6 rounded-2xl shadow-lg flex flex-col space-y-6">
              <FileUpload onImageUpload={setImage} />
              <PromptInput prompt={prompt} setPrompt={setPrompt} disabled={isLoading} />
              <AspectRatioSelector aspectRatio={aspectRatio} setAspectRatio={setAspectRatio} disabled={isLoading} />
              <QualitySelector quality={quality} setQuality={setQuality} disabled={isLoading} />
              <GenerateButton onClick={handleGenerateVideo} disabled={!image || isLoading} />
              {error && <div className="text-red-400 bg-red-900/50 p-3 rounded-lg text-center">{error}</div>}
            </div>
            
            {/* Display Column */}
            <div className="bg-slate-800 p-6 rounded-2xl shadow-lg flex items-center justify-center min-h-[300px] lg:min-h-0">
              {isLoading ? (
                <Loader message={loadingMessage} />
              ) : videoUrl ? (
                <VideoPlayer src={videoUrl} aspectRatio={aspectRatio} onUnlockClick={() => setIsModalOpen(true)} />
              ) : (
                <ImagePreview image={image} />
              )}
            </div>
          </div>
        </div>
      </div>
      <SubscriptionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}