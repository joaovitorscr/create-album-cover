"use client";

import { UploadIcon } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

interface DropImageProps {
  onImageUpload: (file: File) => void;
}

export function DropImage({ onImageUpload }: DropImageProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };  

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageUpload(e.dataTransfer.files[0]);
    }
  };

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };

  return (
  <div
    onDrop={handleDrop}
    onDragEnter={handleDragEnter}
    onDragLeave={handleDragLeave}
    onDragOver={handleDragOver}
    className={cn(`transition-colors border-2 p-8 rounded-xl mx-auto w-92 max-w-2xl flex flex-col items-center justify-center cursor-pointer outline-none focus:ring-2 focus:ring-blue-400`, isDragging
    ? "border-blue-500 bg-blue-50"
    : "border-dashed border-gray-300 bg-white") }
    tabIndex={0}
    role="button"
    aria-label="Upload image by clicking or dragging"
    onClick={handleUploadClick}
  >
    <div className="flex flex-col items-center space-y-2 pointer-events-none select-none">
      <UploadIcon
        className={`size-8 mb-2 transition-colors ${
          isDragging ? "text-blue-500" : "text-gray-400"
        }`}
        strokeWidth={2.2}
      />
      <span
        className={`font-medium text-lg ${
          isDragging ? "text-blue-600" : "text-gray-700"
        }`}
      >
        {isDragging ? "Drop your image here" : "Click or drag an image to upload"}
      </span>
    </div>
    <input
      ref={inputRef}
      type="file"
      className="hidden"
      accept="image/*"
      onChange={handleFileChange}
      tabIndex={-1}
    />
  </div>
  );
}
