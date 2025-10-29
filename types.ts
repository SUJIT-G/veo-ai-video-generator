export interface UploadedImage {
  base64: string;
  mimeType: string;
  previewUrl: string;
}

export type AspectRatio = '16:9' | '9:16';

export type VideoQuality = '720p' | '1080p';
