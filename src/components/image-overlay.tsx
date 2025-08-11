import { ArrowLeftIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { ViewType } from "./image-actions";

interface ImageOverlayProps {
  setCurrentView: (view: ViewType) => void;
}

export function ImageOverlay({ setCurrentView }: ImageOverlayProps) {
  const handleBack = () => {
    setCurrentView("main");
  };

  return (
    <>
      <div className="grid grid-cols-[auto_auto_auto_auto] space-x-4">
        <div className="flex items-center space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" onClick={handleBack}>
                <ArrowLeftIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Go Back</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <Separator orientation="vertical" />
      </div>
    </>
  );
}
