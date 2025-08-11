import * as React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ImageIcon } from "lucide-react";
import { ImageActions } from "./image-actions";

interface ImagePreviewProps {
  image: string | null;
}

export function ImagePreview({ image }: ImagePreviewProps) {
  const [filters, setFilters] = React.useState<Record<string, number>>({
    brightness: 100,
    contrast: 100,
    saturation: 100,
  });

  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", {
      willReadFrequently: true,
    });
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = image;

    img.onload = () => {
      const aspectRatio = img.width / img.height;

      const container = canvas.parentElement;
      if (!container) return;

      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      const devicePixelRatio = window.devicePixelRatio || 1;

      let canvasWidth, canvasHeight;

      if (containerWidth / containerHeight > aspectRatio) {
        canvasHeight = containerHeight;
        canvasWidth = canvasHeight * aspectRatio;
      } else {
        canvasWidth = containerWidth;
        canvasHeight = canvasWidth / aspectRatio;
      }

      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;

      canvas.width = canvasWidth * devicePixelRatio;
      canvas.height = canvasHeight * devicePixelRatio;

      ctx.scale(devicePixelRatio, devicePixelRatio);

      ctx.filter = `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturation}%)`;

      ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
    };
  }, [image, filters]);

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Preview</CardTitle>
      </CardHeader>
      <CardContent className="h-full">
        {image ? (
          <div className="flex h-full w-full items-center justify-center">
            <canvas
              ref={canvasRef}
              className="max-h-full max-w-full rounded-lg shadow-lg"
            />
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
      {image && (
        <CardFooter className="h-12 border-t">
          <ImageActions
            filters={filters}
            setFilters={setFilters}
            image={image}
          />
        </CardFooter>
      )}
    </Card>
  );
}
