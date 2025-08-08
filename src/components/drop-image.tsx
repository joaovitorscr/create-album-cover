"use client";

import { UploadIcon } from "lucide-react";
import { Button } from "./ui/button";
import * as React from "react";

// TODO: This component needs to accept drag and drop of a image :)
export function DropImage() {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0]);
    }
  };

  return (
    <div className="border border-dashed p-4 rounded-lg mx-auto max-w-4xl flex flex-col items-center">
      <Button type="button" onClick={handleUploadClick} className="space-x-1">
        <UploadIcon className="size-4" />
        Upload Image
      </Button>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
}
