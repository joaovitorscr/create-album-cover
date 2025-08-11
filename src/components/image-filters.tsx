import { ArrowLeftIcon, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import * as React from "react";
import { capitalize } from "@/lib/capitalize";
import { ViewType } from "./image-actions";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ImageFiltersProps {
  filters: Record<string, number>;
  setFilters: (filters: Record<string, number>) => void;
  setCurrentView: (view: ViewType) => void;
}

export function ImageFilters({
  filters,
  setFilters,
  setCurrentView,
}: ImageFiltersProps) {
  const [defaultFilterValues] = React.useState(filters);

  const resetFilters = () => {
    setFilters(defaultFilterValues);
  };

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
        <div className="flex flex-1 items-center space-x-4">
          {Object.entries(filters).map(([k, v]) => (
            <div key={k} className="flex min-w-0 space-x-2">
              <span className="text-muted-foreground whitespace-nowrap text-xs">
                {capitalize(k)}
              </span>
              <Slider
                value={[v]}
                onValueChange={(value) =>
                  setFilters({ ...filters, [k]: value[0] })
                }
                max={200}
                min={0}
                step={1}
                className="w-20"
                onDoubleClick={() => {
                  setFilters({ ...filters, [k]: defaultFilterValues[k] });
                }}
              />
              <span className="text-muted-foreground w-8 text-right text-xs">
                {v}%
              </span>
            </div>
          ))}
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={() => resetFilters()} variant="outline" size="sm">
              <RotateCcw className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Reset Filters</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </>
  );
}
