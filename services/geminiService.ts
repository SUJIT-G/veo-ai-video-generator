import { GoogleGenAI } from '@google/genai';
import type { UploadedImage, AspectRatio, VideoQuality } from '../types';

export const generateVideoFromImage = async (
  image: UploadedImage,
  prompt: string,
  aspectRatio: AspectRatio,
  quality: VideoQuality
): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API key is not configured. Please select your API key.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  console.log("Starting video generation...");

  let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt,
    image: {
      imageBytes: image.base64,
      mimeType: image.mimeType,
    },
    config: {
      numberOfVideos: 1,
      resolution: quality,
      aspectRatio: aspectRatio,
    }
  });

  console.log("Polling for video generation result...");
  
  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({ operation: operation });
    console.log(`Operation status: ${operation.done ? 'Done' : 'In Progress'}`);
  }

  if (operation.error) {
    const apiError = operation.error as any;
    const errorMessage = apiError.message || 'Unknown generation error.';
    console.error("Video generation API error:", apiError);

    if (errorMessage.toLowerCase().includes('prompt was blocked') || errorMessage.toLowerCase().includes('image was blocked')) {
        throw new Error("SAFETY_VIOLATION: Your prompt or image may have violated safety policies. Please adjust and try again.");
    }
    if (errorMessage.toLowerCase().includes('quota')) {
        throw new Error("QUOTA_EXCEEDED: You have exceeded your API usage quota.");
    }
    
    throw new Error(`Video generation failed: ${errorMessage}`);
  }

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;

  if (!downloadLink) {
    throw new Error("Video generation completed, but no download link was found.");
  }

  console.log("Fetching generated video from:", downloadLink);
  const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
  
  if (!response.ok) {
    throw new Error(`Failed to download video: ${response.statusText}`);
  }

  const videoBlob = await response.blob();
  const videoUrl = URL.createObjectURL(videoBlob);
  console.log("Video URL created:", videoUrl);

  return videoUrl;
};