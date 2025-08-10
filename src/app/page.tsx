"use client";

import { DropImage } from "@/components/drop-image";
import { ImagePreview } from "@/components/image-preview";
import * as React from "react";
import {
  DownloadIcon,
  PaletteIcon,
  ImagePlusIcon,
  ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const [image, setImage] = React.useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    console.log(file);
    setImage(URL.createObjectURL(file));
  };

  const handleDownload = () => {
    if (!image) return;

    const canvas = document.querySelector("canvas");
    if (canvas) {
      const link = document.createElement("a");
      link.download = "album-cover.png";
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const handleFilters = () => {
    console.log("Apply filters");
  };

  const handleAddOverlay = () => {
    console.log("Apply overlay");
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
          <div className="space-y-4 overflow-y-auto lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Upload Image</CardTitle>
              </CardHeader>
              <CardContent>
                <DropImage onImageUpload={handleImageUpload} />
              </CardContent>
            </Card>

            {image && (
              <Card>
                <CardHeader>
                  <CardTitle>Edit Tools</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-2">
                  <Button onClick={handleFilters}>
                    <PaletteIcon className="h-4 w-4" />
                    <span className="text-xs font-medium">Filters</span>
                  </Button>
                  <Button onClick={handleAddOverlay}>
                    <ImagePlusIcon className="h-4 w-4" />
                    <span className="text-xs font-medium">Add Overlay</span>
                  </Button>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button onClick={handleDownload} variant="success">
                    <DownloadIcon className="h-4 w-4" />
                    <span className="text-xs font-medium">Download</span>
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent className="h-full">
              {image ? (
                <div className="flex h-full w-full items-center justify-center">
                  <ImagePreview image={image} />
                </div>
              ) : (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="bg-accent mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full">
                    <ImageIcon className="size-8" />
                  </div>
                  <h3 className="text-base font-medium">
                    Upload an image to get started
                  </h3>
                  <p className="text-muted-foreground text-sm tracking-tighter">
                    Your album cover will appear here
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
