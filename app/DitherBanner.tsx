'use client';
import React, { useEffect, useRef } from 'react';

// An animated, dithered pixel-screen banner. It renders a tiny low-res buffer
// with an ordered (Bayer) dither via a single putImageData per frame (instead
// of hundreds of fillRect calls), throttles to ~30fps, and pauses entirely
// when scrolled off-screen or when the tab is hidden. That keeps the main
// thread free so page scrolling stays smooth.

const PIXEL = 4; // on-screen size of each "fat pixel" (via CSS upscaling)
const FPS = 30;
const FRAME_MS = 1000 / FPS;

const BAYER = [
    [0, 8, 2, 10],
    [12, 4, 14, 6],
    [3, 11, 1, 9],
    [15, 7, 13, 5],
];

// Warm red -> orange sunset palette (dark -> light), quantized bands.
const PALETTE = [
    [60, 12, 24],
    [130, 28, 36],
    [200, 60, 40],
    [232, 110, 46],
    [246, 168, 74],
    [252, 214, 130],
];

interface Ripple {
    x: number;
    y: number;
    t: number;
}

export default function DitherBanner({ title }: { title: string }) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const pointer = useRef({ x: 0.5, y: 0.5, active: false });
    const ripples = useRef<Ripple[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        // Backing store is the low-res grid itself; CSS scales it up (pixelated),
        // so we only ever touch cols*rows pixels, not the full banner resolution.
        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        let raf = 0;
        let cols = 0;
        let rows = 0;
        let image: ImageData | null = null;
        let visible = true;
        let lastFrame = 0;

        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            cols = Math.max(1, Math.ceil(rect.width / PIXEL));
            rows = Math.max(1, Math.ceil(rect.height / PIXEL));
            canvas.width = cols;
            canvas.height = rows;
            image = ctx.createImageData(cols, rows);
            // Fill alpha once; we only rewrite RGB each frame.
            const d = image.data;
            for (let i = 3; i < d.length; i += 4) d[i] = 255;
        };
        resize();
        window.addEventListener('resize', resize);

        const start = performance.now();

        const draw = (now: number) => {
            if (!image) return;
            const time = (now - start) / 1000;
            const px = pointer.current;
            const rip = ripples.current;
            const d = image.data;

            for (let gy = 0; gy < rows; gy++) {
                const v = gy / rows;
                const bayerRow = BAYER[gy & 3];
                const skyBias = (1 - v) * 0.4;
                for (let gx = 0; gx < cols; gx++) {
                    const u = gx / cols;

                    let value =
                        0.5 +
                        0.25 * Math.sin(u * 8 + time * 1.5) +
                        0.25 * Math.sin(v * 6 - time * 1.1) +
                        0.2 * Math.sin((u + v) * 10 + time * 2.0);

                    if (px.active) {
                        const dx = u - px.x;
                        const dy = v - px.y;
                        const dd = dx * dx + dy * dy;
                        if (dd < 0.25) value += (0.5 - Math.sqrt(dd)) * 0.9;
                    }

                    for (let i = 0; i < rip.length; i++) {
                        const r = rip[i];
                        const age = (now - r.t) / 1000;
                        const dx = u - r.x;
                        const dy = v - r.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < age * 1.2) {
                            value += Math.sin(dist * 30 - age * 12) * Math.max(0, 0.4 - age * 0.25);
                        }
                    }

                    value = value * 0.7 + skyBias;
                    if (value < 0) value = 0; else if (value > 1) value = 1;

                    const threshold = (bayerRow[gx & 3] + 0.5) / 16;
                    let band = Math.floor(value * (PALETTE.length - 1));
                    if (value * (PALETTE.length - 1) - band > threshold) band++;
                    if (band > PALETTE.length - 1) band = PALETTE.length - 1;

                    const c = PALETTE[band];
                    const o = (gy * cols + gx) * 4;
                    d[o] = c[0];
                    d[o + 1] = c[1];
                    d[o + 2] = c[2];
                }
            }
            ctx.putImageData(image, 0, 0);
        };

        const loop = (now: number) => {
            raf = requestAnimationFrame(loop);
            if (!visible) return;
            if (now - lastFrame < FRAME_MS) return; // throttle to ~30fps
            lastFrame = now;
            // ripples older than 1.6s no longer matter
            if (ripples.current.length) {
                ripples.current = ripples.current.filter((r) => now - r.t < 1600);
            }
            draw(now);
        };
        raf = requestAnimationFrame(loop);

        // Pause when the banner scrolls out of view.
        const io = new IntersectionObserver(
            (entries) => { visible = entries[0]?.isIntersecting ?? true; },
            { threshold: 0 }
        );
        io.observe(canvas);

        // Pause when the tab is hidden.
        const onVisibility = () => {
            if (document.hidden) visible = false;
        };
        document.addEventListener('visibilitychange', onVisibility);

        const toLocal = (clientX: number, clientY: number) => {
            const rect = canvas.getBoundingClientRect();
            return {
                x: (clientX - rect.left) / rect.width,
                y: (clientY - rect.top) / rect.height,
            };
        };
        const onMove = (e: MouseEvent) => {
            const p = toLocal(e.clientX, e.clientY);
            pointer.current = { x: p.x, y: p.y, active: true };
        };
        const onLeave = () => { pointer.current.active = false; };
        const onDown = (e: MouseEvent) => {
            const p = toLocal(e.clientX, e.clientY);
            ripples.current.push({ x: p.x, y: p.y, t: performance.now() });
        };
        const onTouch = (e: TouchEvent) => {
            const t = e.touches[0];
            if (!t) return;
            const p = toLocal(t.clientX, t.clientY);
            pointer.current = { x: p.x, y: p.y, active: true };
            ripples.current.push({ x: p.x, y: p.y, t: performance.now() });
        };

        canvas.addEventListener('mousemove', onMove);
        canvas.addEventListener('mouseleave', onLeave);
        canvas.addEventListener('mousedown', onDown);
        canvas.addEventListener('touchstart', onTouch, { passive: true });
        canvas.addEventListener('touchmove', onTouch, { passive: true });

        return () => {
            cancelAnimationFrame(raf);
            io.disconnect();
            document.removeEventListener('visibilitychange', onVisibility);
            window.removeEventListener('resize', resize);
            canvas.removeEventListener('mousemove', onMove);
            canvas.removeEventListener('mouseleave', onLeave);
            canvas.removeEventListener('mousedown', onDown);
            canvas.removeEventListener('touchstart', onTouch);
            canvas.removeEventListener('touchmove', onTouch);
        };
    }, []);

    return (
        <div className="dither-banner">
            <canvas ref={canvasRef} className="dither-canvas" />
            <div className="dither-overlay">
                <span className="dither-title">{title}</span>
            </div>
        </div>
    );
}
