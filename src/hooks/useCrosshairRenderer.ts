import { useEffect, useRef, useState } from 'react';
import { CrosshairSettings } from '../types/config';
import { renderCrosshair } from '../lib/crosshairRenderer';

export function useCrosshairRenderer(settings: CrosshairSettings, enabled: boolean = true) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      renderCrosshair(
        ctx,
        settings,
        rect.width / 2,
        rect.height / 2
      );
    };

    resize();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [settings, enabled]);

  return { canvasRef, containerRef };
}
