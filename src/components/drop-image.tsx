"use client";

import { UploadIcon } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Upload Image</CardTitle>
      </CardHeader>
      <CardContent
        onDrop={handleDrop}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        className={cn(
          "w-92 focus:ring-primary border-1 mx-auto flex max-w-2xl cursor-pointer flex-col items-center justify-center rounded-xl p-8 outline-none transition-colors focus:ring-2",
          isDragging
            ? "border-primary bg-primary/10"
            : "border-muted-foreground bg-muted border-dashed",
        )}
        tabIndex={0}
        role="button"
        aria-label="Upload image by clicking or dragging"
        onClick={handleUploadClick}
      >
        <div className="pointer-events-none flex select-none flex-col items-center space-y-2">
          <UploadIcon
            className={cn(
              "mb-2 size-8 transition-colors",
              isDragging ? "text-green-500" : "text-gray-400",
            )}
            strokeWidth={2.2}
          />
          <span
            className={cn(
              "text-lg font-medium",
              isDragging ? "text-green-500" : "text-gray-400",
            )}
          >
            {isDragging
              ? "Drop your image here"
              : "Click or drag an image to upload"}
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
      </CardContent>
    </Card>
  );
}
