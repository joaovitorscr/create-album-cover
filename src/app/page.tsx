"use client";

import { DropImage } from "@/components/drop-image";
import { ImagePreview } from "@/components/image-preview";
import * as React from "react";

export default function Home() {
  const [image, setImage] = React.useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    setImage(URL.createObjectURL(file));
  };

  return (
    <main className="h-screen py-10">
      <div className="mx-auto max-w-7xl space-y-12">
        <div className="space-y-2">
          <h1 className="text-center text-3xl font-semibold tracking-tighter md:text-4xl">
            Create Album Cover
          </h1>
          <p className="text-muted-foreground text-center text-sm md:text-base">
            Upload your image and customize it with powerful editing tools
          </p>
        </div>

        <div className="grid h-[calc(100vh-280px)] grid-cols-1 gap-4 lg:grid-cols-3">
          <DropImage onImageUpload={handleImageUpload} />
          <ImagePreview image={image} />
        </div>
      </div>
    </main>
  );
}
