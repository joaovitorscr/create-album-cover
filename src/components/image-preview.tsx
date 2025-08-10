import * as React from "react";

interface ImagePreviewProps {
    image: string | null;
}

export function ImagePreview({ image }: ImagePreviewProps) {
    const canvasRef = React.useRef<HTMLCanvasElement>(null)

    React.useEffect(() => {
        if (!image || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d")
        if (!ctx) return;

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = image;

        img.onload = () => {
            const aspectRatio = img.width / img.height

            const container = canvas.parentElement
            if (!container) return

            const containerWidth = container.clientWidth
            const containerHeight = container.clientHeight

            let canvasWidth, canvasHeight

            if (containerWidth / containerHeight > aspectRatio) {
                canvasHeight = Math.min(containerHeight, 5000)
                canvasWidth = canvasHeight * aspectRatio
            } else {
                canvasWidth = Math.min(containerWidth, 5000)
                canvasHeight = canvasWidth / aspectRatio
            }

            canvas.width = canvasWidth
            canvas.height = canvasHeight

            ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight)
        }
    }, [image])

    return (
        <div className="flex flex-col h-full mt-8">
            <div className="flex-1 flex items-center justify-center overflow-hidden">
                <canvas ref={canvasRef} className="max-w-full max-h-full rounded-md" />
            </div>
        </div>
    )
}