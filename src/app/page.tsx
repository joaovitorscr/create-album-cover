"use client"

import { DropImage } from "@/components/drop-image";
import { ImagePreview } from "@/components/image-preview";
import * as React from "react";

export default function Home() {
  const [image, setImage] = React.useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    console.log(file);
    setImage(URL.createObjectURL(file));
  };

  return (
    <main className="max-w-4xl mx-auto flex flex-col items-center min-h-dvh justify-center gap-8">
      <h1 className="text-5xl font-semibold tracking-tighter">
        Create Album Cover
      </h1>
      <section>
        <DropImage onImageUpload={handleImageUpload} />
        <ImagePreview image={image} />
      </section>
    </main>
  );
}
