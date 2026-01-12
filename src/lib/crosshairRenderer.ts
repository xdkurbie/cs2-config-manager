import { CrosshairSettings } from '../types/config';

export function renderCrosshair(ctx: CanvasRenderingContext2D, settings: CrosshairSettings, centerX: number, centerY: number): void {
  const { style, size, thickness, gap, outline, outlineThickness, colorR, colorG, colorB, alpha, dot, dotSize, tStyle } = settings;
  
  const gapValue = settings.gapUseweaponvalue ? 0 : gap;
  const sizeValue = Math.max(0.5, size);
  const thicknessValue = Math.max(0.5, thickness);
  
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  const color = `rgba(${colorR}, ${colorG}, ${colorB}, ${alpha / 255})`;
  const outlineColor = `rgba(0, 0, 0, ${alpha / 255})`;

  ctx.lineCap = 'butt';
  ctx.lineJoin = 'miter';

  function drawLine(x1: number, y1: number, x2: number, y2: number): void {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  function drawRect(x: number, y: number, width: number, height: number): void {
    ctx.fillRect(x, y, width, height);
  }

  switch (style) {
    case 0: 
    case 1: 
    case 2: 
    case 3: 
      const isStatic = style === 2;
      const isDynamic = style === 3;
      const isClassic = style === 1;
      
      if (outline > 0) {
        ctx.strokeStyle = outlineColor;
        ctx.lineWidth = thicknessValue + outlineThickness * 2;
        
        const outlineGap = gapValue > 0 ? gapValue : 0;
        
        if (tStyle === 0) {
          drawLine(centerX - outlineGap - sizeValue, centerY, centerX - outlineGap, centerY);
          drawLine(centerX + outlineGap, centerY, centerX + outlineGap + sizeValue, centerY);
          drawLine(centerX, centerY - outlineGap - sizeValue, centerX, centerY - outlineGap);
          drawLine(centerX, centerY + outlineGap, centerX, centerY + outlineGap + sizeValue);
        } else {
          drawLine(centerX - outlineGap - sizeValue, centerY, centerX - outlineGap, centerY);
          drawLine(centerX + outlineGap, centerY, centerX + outlineGap + sizeValue, centerY);
          drawLine(centerX, centerY - outlineGap - sizeValue, centerX, centerY - outlineGap);
        }
      }
      
      ctx.strokeStyle = color;
      ctx.lineWidth = thicknessValue;
      
      const currentGap = gapValue > 0 ? gapValue : 0;
      
      if (tStyle === 0) {
        drawLine(centerX - currentGap - sizeValue, centerY, centerX - currentGap, centerY);
        drawLine(centerX + currentGap, centerY, centerX + currentGap + sizeValue, centerY);
        drawLine(centerX, centerY - currentGap - sizeValue, centerX, centerY - currentGap);
        drawLine(centerX, centerY + currentGap, centerX, centerY + currentGap + sizeValue);
      } else {
        drawLine(centerX - currentGap - sizeValue, centerY, centerX - currentGap, centerY);
        drawLine(centerX + currentGap, centerY, centerX + currentGap + sizeValue, centerY);
        drawLine(centerX, centerY - currentGap - sizeValue, centerX, centerY - currentGap);
      }
      break;

    case 4: 
      if (outline > 0) {
        ctx.strokeStyle = outlineColor;
        ctx.lineWidth = thicknessValue + outlineThickness * 2;
        
        const outlineGap = gapValue > 0 ? gapValue : 0;
        
        drawLine(centerX - outlineGap - sizeValue, centerY, centerX - outlineGap, centerY);
        drawLine(centerX + outlineGap, centerY, centerX + outlineGap + sizeValue, centerY);
        drawLine(centerX, centerY - outlineGap - sizeValue, centerX, centerY - outlineGap);
        drawLine(centerX, centerY + outlineGap, centerX, centerY + outlineGap + sizeValue);
      }
      
      ctx.strokeStyle = color;
      ctx.lineWidth = thicknessValue;
      
      const crosshairGap = gapValue > 0 ? gapValue : 0;
      
      drawLine(centerX - crosshairGap - sizeValue, centerY, centerX - crosshairGap, centerY);
      drawLine(centerX + crosshairGap, centerY, centerX + crosshairGap + sizeValue, centerY);
      drawLine(centerX, centerY - crosshairGap - sizeValue, centerX, centerY - crosshairGap);
      drawLine(centerX, centerY + crosshairGap, centerX, centerY + crosshairGap + sizeValue);
      break;

    case 5: 
      if (outline > 0) {
        ctx.fillStyle = outlineColor;
        ctx.fillRect(
          centerX - sizeValue / 2 - outlineThickness,
          centerY - thicknessValue / 2 - outlineThickness,
          sizeValue + outlineThickness * 2,
          thicknessValue + outlineThickness * 2
        );
      }
      
      ctx.fillStyle = color;
      ctx.fillRect(
        centerX - sizeValue / 2,
        centerY - thicknessValue / 2,
        sizeValue,
        thicknessValue
      );
      break;
  }

  if (dot > 0 && style !== 5) {
    const dotSizeValue = Math.max(0.5, dotSize);
    
    if (outline > 0) {
      ctx.fillStyle = outlineColor;
      ctx.fillRect(
        centerX - dotSizeValue / 2 - outlineThickness,
        centerY - dotSizeValue / 2 - outlineThickness,
        dotSizeValue + outlineThickness * 2,
        dotSizeValue + outlineThickness * 2
      );
    }
    
    ctx.fillStyle = color;
    ctx.fillRect(
      centerX - dotSizeValue / 2,
      centerY - dotSizeValue / 2,
      dotSizeValue,
      dotSizeValue
    );
  }
}

export function generateCrosshairCode(settings: CrosshairSettings): string {
  const code = [
    `cl_crosshairstyle ${settings.style}`,
    `cl_crosshairsize ${settings.size}`,
    `cl_crosshairthickness ${settings.thickness}`,
    `cl_crosshairgap ${settings.gap}`,
    `cl_crosshair_drawoutline ${settings.outline}`,
    `cl_crosshair_outlinethickness ${settings.outlineThickness}`,
    `cl_crosshaircolor_r ${settings.colorR}`,
    `cl_crosshaircolor_g ${settings.colorG}`,
    `cl_crosshaircolor_b ${settings.colorB}`,
    `cl_crosshairalpha ${settings.alpha}`,
    `cl_crosshairdot ${settings.dot}`,
    `cl_crosshairdotsize ${settings.dotSize}`,
    `cl_crosshair_t ${settings.tStyle}`,
  ].join('\n');

  return btoa(code);
}

export function parseCrosshairCode(code: string): Partial<CrosshairSettings> {
  try {
    const decoded = atob(code);
    const lines = decoded.split('\n');
    const settings: any = {};

    lines.forEach(line => {
      const match = line.match(/^(\w+)\s+(.+)$/);
      if (match) {
        const [, key, value] = match;
        settings[key] = isNaN(Number(value)) ? value : Number(value);
      }
    });

    return {
      style: settings.cl_crosshairstyle || 4,
      size: settings.cl_crosshairsize || 2,
      thickness: settings.cl_crosshairthickness || 0,
      gap: settings.cl_crosshairgap || -2,
      outline: settings.cl_crosshair_drawoutline || 1,
      outlineThickness: settings.cl_crosshair_outlinethickness || 1,
      colorR: settings.cl_crosshaircolor_r || 50,
      colorG: settings.cl_crosshaircolor_g || 250,
      colorB: settings.cl_crosshaircolor_b || 50,
      alpha: settings.cl_crosshairalpha || 255,
      dot: settings.cl_crosshairdot || 1,
      dotSize: settings.cl_crosshairdotsize || 1,
      tStyle: settings.cl_crosshair_t || 0,
    };
  } catch {
    return {};
  }
}
