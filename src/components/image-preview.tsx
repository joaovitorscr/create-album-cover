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

            const devicePixelRatio = window.devicePixelRatio || 1

            let canvasWidth, canvasHeight

            if (containerWidth / containerHeight > aspectRatio) {
                canvasHeight = containerHeight
                canvasWidth = canvasHeight * aspectRatio
            } else {
                canvasWidth = containerWidth
                canvasHeight = canvasWidth / aspectRatio
            }

            canvas.style.width = `${canvasWidth}px`
            canvas.style.height = `${canvasHeight}px`

            canvas.width = canvasWidth * devicePixelRatio
            canvas.height = canvasHeight * devicePixelRatio

            ctx.scale(devicePixelRatio, devicePixelRatio)

            ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight)
        }
    }, [image])

    return (
        <div className="w-full h-full flex items-center justify-center">
            <canvas
                ref={canvasRef}
                className="max-w-full max-h-full rounded-lg shadow-lg"
            />
        </div>
    )
}