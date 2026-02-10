'use client';

import React, { useEffect, useRef, useCallback, useState } from 'react';
import './FrameCanvas.css';

const FRAME_COUNT = 192;
// Use optimized JPGs instead of heavy PNGs
const IMAGE_PATH = (index: number) => `/sequence_opt/frame_${index.toString().padStart(4, '0')}.jpg`;

interface FrameCanvasProps {
    scrollProgress: number;
}

const FrameCanvas: React.FC<FrameCanvasProps> = ({ scrollProgress }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageCache = useRef<Map<number, HTMLImageElement>>(new Map());
    const currentFrameRef = useRef<number>(0);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // Preload a specific frame
    const preloadFrame = useCallback((index: number) => {
        if (index < 0 || index >= FRAME_COUNT || imageCache.current.has(index)) return;

        const img = new window.Image();
        img.src = IMAGE_PATH(index + 1);
        img.onload = () => {
            imageCache.current.set(index, img);
            if (index === 0) setImagesLoaded(true); // First frame ready
        };
    }, []);

    // Buffer strategy: Preload frames around the current one
    useEffect(() => {
        const currentIndex = Math.floor(scrollProgress * FRAME_COUNT);
        const bufferSize = 25; // Preload 25 frames ahead and 5 behind

        // High priority: immediate next frames
        for (let i = 0; i < bufferSize; i++) {
            preloadFrame(currentIndex + i);
        }

        // Low priority: previous frames (for reverse scroll)
        for (let i = 1; i <= 5; i++) {
            preloadFrame(currentIndex - i);
        }
    }, [scrollProgress, preloadFrame]);

    // Initial load: Preload a chunk to ensure smooth start
    useEffect(() => {
        for (let i = 0; i < 30; i++) {
            preloadFrame(i);
        }
    }, [preloadFrame]);

    const drawFrame = useCallback((frameIndex: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        // Clean frame index
        const safeIndex = Math.max(0, Math.min(FRAME_COUNT - 1, frameIndex));

        if (imageCache.current.has(safeIndex)) {
            const img = imageCache.current.get(safeIndex)!;

            // Draw optimized
            // We use 'cover' logic here to ensure it fills screen
            const canvasRatio = canvas.width / canvas.height;
            const imgRatio = img.width / img.height;

            let drawWidth = canvas.width;
            let drawHeight = canvas.height;
            let offsetX = 0;
            let offsetY = 0;

            if (canvasRatio > imgRatio) {
                drawHeight = canvas.width / imgRatio;
                offsetY = (canvas.height - drawHeight) / 2;
            } else {
                drawWidth = canvas.height * imgRatio;
                offsetX = (canvas.width - drawWidth) / 2;
            }

            // Clear first to avoid artifacts if transparent (though these are jpgs now)
            ctx.fillStyle = '#050505'; // Match global bg
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        } else {
            // Check if we have a nearby frame to show instead of flickering black
            // Try to find the closest loaded frame within a small range
            /* 
            let fallbackIndex = -1;
            for (let i = 1; i < 5; i++) {
                if (imageCache.current.has(safeIndex - i)) { fallbackIndex = safeIndex - i; break; }
                if (imageCache.current.has(safeIndex + i)) { fallbackIndex = safeIndex + i; break; }
            }
            if (fallbackIndex !== -1) {
                drawFrame(fallbackIndex);
            }
            */
            // Actually, simply doing nothing preserves the *last drawn frame* on the canvas, 
            // which is better than clearing to black. So we just skip drawing.
        }
    }, []);

    // Main render loop based on scroll
    useEffect(() => {
        const frameIndex = Math.floor(scrollProgress * FRAME_COUNT);
        currentFrameRef.current = frameIndex;

        requestAnimationFrame(() => drawFrame(frameIndex));
    }, [scrollProgress, drawFrame]);

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                // Set internal resolution matches display size for crispness
                // or fix it to 1920x1080 for performance?
                // Let's match window size but cap it for performance if needed
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;

                // Redraw immediately
                drawFrame(currentFrameRef.current);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, [drawFrame]);

    return (
        <div className="frame-canvas-container">
            <canvas ref={canvasRef} />
        </div>
    );
};

export default FrameCanvas;
