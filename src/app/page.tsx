"use client"

import { DropImage } from "@/components/drop-image";
import { ImagePreview } from "@/components/image-preview";
import * as React from "react";
import { Download, RotateCw, Palette, Type, Sparkles, Settings, ImagePlusIcon, MusicIcon, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const [image, setImage] = React.useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    console.log(file);
    setImage(URL.createObjectURL(file));
  };

  const handleDownload = () => {
    if (!image) return;

    const canvas = document.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'album-cover.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const handleFilters = () => {
    console.log('Apply filters');
  };

  const handleAddOverlay = () => {
    console.log("Apply overlay")
  }

  return (
    <main className="h-screen py-10">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-semibold text-center tracking-tighter">
            Create Album Cover
          </h1>
          <p className="text-center text-muted-foreground text-sm md:text-base">
            Upload your image and customize it with powerful editing tools
          </p>
        </div>

        <div className="h-[calc(100vh-280px)] grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1 space-y-4 overflow-y-auto">
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
                  <Button
                    onClick={handleFilters}
                  >
                    <Palette className="w-4 h-4" />
                    <span className="text-xs font-medium">Filters</span>
                  </Button>
                  <Button onClick={handleAddOverlay}>
                    <ImagePlusIcon className="w-4 h-4" />
                    <span className="text-xs font-medium">Add Overlay</span>
                  </Button>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button
                    onClick={handleDownload}
                    variant="success"
                  >
                    <Download className="w-4 h-4" />
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
                <div className="h-full w-full flex items-center justify-center">
                  <ImagePreview image={image} />
                </div>
              ) : (
                <div className="text-center h-full flex flex-col items-center justify-center">
                  <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-accent flex items-center justify-center">
                    <ImageIcon className="size-8" />
                  </div>
                  <h3 className="text-base font-medium">Upload an image to get started</h3>
                  <p className="text-sm text-muted-foreground tracking-tighter">Your album cover will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
