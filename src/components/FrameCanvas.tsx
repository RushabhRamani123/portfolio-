'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import './FrameCanvas.css';

const FRAME_COUNT = 241;
const IMAGE_PATH = (index: number) => `/sequence_png/frame-${index.toString().padStart(3, '0')}.png`;

interface FrameCanvasProps {
    scrollProgress: number;
}

const FrameCanvas: React.FC<FrameCanvasProps> = ({ scrollProgress }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageCache = useRef<Map<number, HTMLImageElement>>(new Map());
    const currentFrameRef = useRef<number>(-1);

    // Draw frame on demand
    const drawFrame = useCallback((frameIndex: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        // Check cache first
        if (imageCache.current.has(frameIndex)) {
            const img = imageCache.current.get(frameIndex)!;
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            const offsetX = (canvas.width - img.width) / 2;
            const offsetY = (canvas.height - img.height) / 2;
            ctx.drawImage(img, offsetX, offsetY);
            return;
        }

        // Load and draw
        const img = new window.Image();
        img.src = IMAGE_PATH(frameIndex + 1); // frames are 1-indexed
        img.onload = () => {
            imageCache.current.set(frameIndex, img);
            // Only draw if this is still the current frame
            if (currentFrameRef.current === frameIndex) {
                ctx.fillStyle = '#000000';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                const offsetX = (canvas.width - img.width) / 2;
                const offsetY = (canvas.height - img.height) / 2;
                ctx.drawImage(img, offsetX, offsetY);
            }
        };
    }, []);

    // Draw on scroll
    useEffect(() => {
        const frameIndex = Math.min(
            FRAME_COUNT - 1,
            Math.floor(scrollProgress * FRAME_COUNT)
        );
        currentFrameRef.current = frameIndex;
        drawFrame(frameIndex);
    }, [scrollProgress, drawFrame]);

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = 1920;
                canvasRef.current.height = 1080;
                // Redraw current frame after resize
                if (currentFrameRef.current >= 0) {
                    drawFrame(currentFrameRef.current);
                }
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, [drawFrame]);

    // Preload first frame immediately
    useEffect(() => {
        const img = new window.Image();
        img.src = IMAGE_PATH(1);
        img.onload = () => {
            imageCache.current.set(0, img);
            drawFrame(0);
        };
    }, [drawFrame]);

    return (
        <div className="frame-canvas-container">
            <canvas ref={canvasRef} />
        </div>
    );
};

export default FrameCanvas;
