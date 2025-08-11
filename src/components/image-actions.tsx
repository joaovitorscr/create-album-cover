import { DownloadIcon, ImagePlusIcon, PaletteIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { ImageFilters } from "./image-filters";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { ImageOverlay } from "./image-overlay";

interface ImageActionsProps {
  image: string | null;
  filters: Record<string, number>;
  setFilters: (filters: Record<string, number>) => void;
}

export type ViewType = "main" | "filters" | "overlays";

export function ImageActions({
  image,
  filters,
  setFilters,
}: ImageActionsProps) {
  const [currentView, setCurrentView] = React.useState<ViewType>("main");

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

  const handleAddOverlay = () => {
    setCurrentView("overlays");
  };

  return (
    <div className="flex w-full items-center justify-between">
      {currentView === "main" && (
        <div className="space-x-2">
          <Button variant="secondary" onClick={() => setCurrentView("filters")}>
            <PaletteIcon className="h-4 w-4" />
            <span className="text-xs font-medium">Filters</span>
          </Button>
          <Button variant="secondary" onClick={handleAddOverlay}>
            <ImagePlusIcon className="h-4 w-4" />
            <span className="text-xs font-medium">Add Overlay</span>
          </Button>
        </div>
      )}
      {currentView === "filters" && (
        <ImageFilters
          filters={filters}
          setFilters={setFilters}
          setCurrentView={(value) => setCurrentView(value)}
        />
      )}
      {currentView === "overlays" && (
        <ImageOverlay setCurrentView={(value) => setCurrentView(value)} />
      )}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={handleDownload} variant="success" size="sm">
            <DownloadIcon className="h-4 w-4" />
            <span className="text-xs font-medium">Download</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Download Image</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
