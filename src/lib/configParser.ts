import { CS2Config } from '../types/config';
import { DEFAULT_CONFIG } from './cs2Settings';

export function parseConfigFile(content: string): Partial<CS2Config> {
  const lines = content.split('\n');
  const config: any = {
    ...DEFAULT_CONFIG,
    video: { ...DEFAULT_CONFIG.video },
    audio: { ...DEFAULT_CONFIG.audio },
    gameplay: { ...DEFAULT_CONFIG.gameplay },
    crosshair: { ...DEFAULT_CONFIG.crosshair },
    viewmodel: { ...DEFAULT_CONFIG.viewmodel },
    network: { ...DEFAULT_CONFIG.network },
    hud: { ...DEFAULT_CONFIG.hud },
    radar: { ...DEFAULT_CONFIG.radar },
    binds: {},
  };

  lines.forEach(line => {
    line = line.trim();
    if (!line || line.startsWith('//') || line.startsWith('echo')) return;

    const match = line.match(/^(\w+)\s+(.+)$/);
    if (match) {
      const [, command, value] = match;
      
      // Video settings
      if (command === 'mat_powersavingsmode') {
        config.video.vsync = value === '0';
      } else if (command === 'fps_max') {
        config.video.fpsMax = parseInt(value) || 0;
      }

      // Audio settings
      if (command === 'volume') {
        config.audio.volume = parseFloat(value) || 0.5;
      } else if (command === 'snd_musicvolume') {
        config.audio.musicVolume = parseFloat(value) || 0.1;
      } else if (command === 'voice_enable') {
        config.audio.voiceEnable = value === '1';
      } else if (command === 'voice_scale') {
        config.audio.voiceScale = parseFloat(value) || 0.5;
      }

      // Gameplay settings
      if (command === 'sensitivity') {
        config.gameplay.sensitivity = value;
      } else if (command === 'm_yaw') {
        config.gameplay.mYaw = parseFloat(value) || 0.022;
      } else if (command === 'm_customaccel') {
        config.gameplay.mCustomaccel = parseInt(value) || 0;
      } else if (command === 'zoom_sensitivity_ratio_mouse') {
        config.gameplay.zoomSensitivity = parseFloat(value) || 1.0;
      } else if (command === 'bind') {
        const bindMatch = value.match(/^"([^"]+)"\s+"([^"]+)"$/);
        if (bindMatch) {
          config.gameplay.binds[bindMatch[1]] = bindMatch[2];
        }
      }

      // Crosshair settings
      if (command === 'cl_crosshairstyle') {
        config.crosshair.style = parseInt(value) || 4;
      } else if (command === 'cl_crosshairsize') {
        config.crosshair.size = parseFloat(value) || 2;
      } else if (command === 'cl_crosshairthickness') {
        config.crosshair.thickness = parseFloat(value) || 0;
      } else if (command === 'cl_crosshairgap') {
        config.crosshair.gap = parseFloat(value) || -2;
      } else if (command === 'cl_crosshair_drawoutline') {
        config.crosshair.outline = parseInt(value) || 1;
      } else if (command === 'cl_crosshair_outlinethickness') {
        config.crosshair.outlineThickness = parseFloat(value) || 1;
      } else if (command === 'cl_crosshaircolor_r') {
        config.crosshair.colorR = parseInt(value) || 50;
      } else if (command === 'cl_crosshaircolor_g') {
        config.crosshair.colorG = parseInt(value) || 250;
      } else if (command === 'cl_crosshaircolor_b') {
        config.crosshair.colorB = parseInt(value) || 50;
      } else if (command === 'cl_crosshairalpha') {
        config.crosshair.alpha = parseInt(value) || 255;
      } else if (command === 'cl_crosshairdot') {
        config.crosshair.dot = parseInt(value) || 1;
      } else if (command === 'cl_crosshairdotsize') {
        config.crosshair.dotSize = parseFloat(value) || 1;
      } else if (command === 'cl_crosshair_t') {
        config.crosshair.tStyle = parseInt(value) || 0;
      }

      // ViewModel settings
      if (command === 'viewmodel_fov') {
        config.viewmodel.fov = parseInt(value) || 68;
      } else if (command === 'viewmodel_offset_x') {
        config.viewmodel.offsetX = parseFloat(value) || 2.5;
      } else if (command === 'viewmodel_offset_y') {
        config.viewmodel.offsetY = parseFloat(value) || 0;
      } else if (command === 'viewmodel_offset_z') {
        config.viewmodel.offsetZ = parseFloat(value) || -1.5;
      } else if (command === 'viewmodel_presetpos') {
        config.viewmodel.pitch = 0;
        config.viewmodel.yaw = 0;
        config.viewmodel.roll = 0;
      }

      // Network settings
      if (command === 'rate') {
        config.network.rate = parseInt(value) || 786432;
      } else if (command === 'cl_cmdrate') {
        config.network.clCmdrate = parseInt(value) || 64;
      } else if (command === 'cl_updaterate') {
        config.network.clUpdaterate = parseInt(value) || 64;
      } else if (command === 'cl_interp') {
        config.network.clInterp = parseFloat(value) || 0.015625;
      } else if (command === 'cl_interp_ratio') {
        config.network.clInterpRatio = parseInt(value) || 2;
      } else if (command === 'cl_lagcompensation') {
        config.network.clLagcompensation = value === '1';
      }

      // HUD settings
      if (command === 'hud_scaling') {
        config.hud.hudScaling = parseFloat(value) || 0.85;
      } else if (command === 'hud_showtargetid') {
        config.hud.hudShowtargetid = value === '1';
      } else if (command === 'cl_hud_color') {
        config.hud.clHudColor = parseInt(value) || 7;
      } else if (command === 'cl_hud_background_alpha') {
        config.hud.clHudBackgroundAlpha = parseFloat(value) || 0.5;
      }

      // Radar settings
      if (command === 'cl_radar_scale') {
        config.radar.clRadarScale = parseFloat(value) || 0.7;
      } else if (command === 'cl_radar_rotate') {
        config.radar.clRadarRotate = value === '1';
      } else if (command === 'cl_radar_square_with_scoreboard') {
        config.radar.clRadarSquareWithScoreboard = value === '1';
      } else if (command === 'cl_radar_always_centered') {
        config.radar.clRadarAlwaysCentered = value === '1';
      }
    }
  });

  config.rawConfig = content;
  return config;
}

export function generateConfigFile(config: CS2Config): string {
  const lines: string[] = [];
  
  lines.push('// CS2 Config Export');
  lines.push(`// Generated by CS2 Config Manager`);
  lines.push(`// Date: ${new Date().toISOString()}`);
  lines.push('');

  lines.push('// Video Settings');
  lines.push(`fps_max ${config.video.fpsMax}`);
  lines.push('');

  lines.push('// Audio Settings');
  lines.push(`volume ${config.audio.volume}`);
  lines.push(`snd_musicvolume ${config.audio.musicVolume}`);
  lines.push(`voice_enable ${config.audio.voiceEnable ? '1' : '0'}`);
  lines.push(`voice_scale ${config.audio.voiceScale}`);
  lines.push('');

  lines.push('// Gameplay Settings');
  lines.push(`sensitivity "${config.gameplay.sensitivity}"`);
  lines.push(`m_yaw ${config.gameplay.mYaw}`);
  lines.push(`m_customaccel ${config.gameplay.mCustomaccel}`);
  lines.push(`zoom_sensitivity_ratio_mouse ${config.gameplay.zoomSensitivity}`);
  lines.push('');

  lines.push('// Key Binds');
  Object.entries(config.gameplay.binds).forEach(([key, value]) => {
    lines.push(`bind "${key}" "${value}"`);
  });
  lines.push('');

  lines.push('// Crosshair Settings');
  lines.push(`cl_crosshairstyle ${config.crosshair.style}`);
  lines.push(`cl_crosshairsize ${config.crosshair.size}`);
  lines.push(`cl_crosshairthickness ${config.crosshair.thickness}`);
  lines.push(`cl_crosshairgap ${config.crosshair.gap}`);
  lines.push(`cl_crosshair_drawoutline ${config.crosshair.outline}`);
  lines.push(`cl_crosshair_outlinethickness ${config.crosshair.outlineThickness}`);
  lines.push(`cl_crosshaircolor_r ${config.crosshair.colorR}`);
  lines.push(`cl_crosshaircolor_g ${config.crosshair.colorG}`);
  lines.push(`cl_crosshaircolor_b ${config.crosshair.colorB}`);
  lines.push(`cl_crosshairalpha ${config.crosshair.alpha}`);
  lines.push(`cl_crosshairdot ${config.crosshair.dot}`);
  lines.push(`cl_crosshairdotsize ${config.crosshair.dotSize}`);
  lines.push(`cl_crosshair_t ${config.crosshair.tStyle}`);
  lines.push('');

  lines.push('// ViewModel Settings');
  lines.push(`viewmodel_fov ${config.viewmodel.fov}`);
  lines.push(`viewmodel_offset_x ${config.viewmodel.offsetX}`);
  lines.push(`viewmodel_offset_y ${config.viewmodel.offsetY}`);
  lines.push(`viewmodel_offset_z ${config.viewmodel.offsetZ}`);
  lines.push('');

  lines.push('// Network Settings');
  lines.push(`rate ${config.network.rate}`);
  lines.push(`cl_cmdrate ${config.network.clCmdrate}`);
  lines.push(`cl_updaterate ${config.network.clUpdaterate}`);
  lines.push(`cl_interp ${config.network.clInterp}`);
  lines.push(`cl_interp_ratio ${config.network.clInterpRatio}`);
  lines.push(`cl_lagcompensation ${config.network.clLagcompensation ? '1' : '0'}`);
  lines.push('');

  lines.push('// HUD Settings');
  lines.push(`hud_scaling ${config.hud.hudScaling}`);
  lines.push(`hud_showtargetid ${config.hud.hudShowtargetid ? '1' : '0'}`);
  lines.push(`cl_hud_color ${config.hud.clHudColor}`);
  lines.push(`cl_hud_background_alpha ${config.hud.clHudBackgroundAlpha}`);
  lines.push('');

  lines.push('// Radar Settings');
  lines.push(`cl_radar_scale ${config.radar.clRadarScale}`);
  lines.push(`cl_radar_rotate ${config.radar.clRadarRotate ? '1' : '0'}`);
  lines.push(`cl_radar_square_with_scoreboard ${config.radar.clRadarSquareWithScoreboard ? '1' : '0'}`);
  lines.push(`cl_radar_always_centered ${config.radar.clRadarAlwaysCentered ? '1' : '0'}`);
  lines.push('');

  return lines.join('\n');
}

export function validateConfig(content: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('echo')) return;

    const match = trimmed.match(/^(\w+)\s+(.+)$/);
    if (!match) {
      errors.push(`Line ${index + 1}: Invalid syntax`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function formatConfig(content: string): string {
  const lines = content.split('\n');
  const formattedLines: string[] = [];

  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('echo')) {
      formattedLines.push(trimmed);
      return;
    }

    const match = trimmed.match(/^(\w+)\s+(.+)$/);
    if (match) {
      const [, command, value] = match;
      formattedLines.push(`${command} ${value}`);
    } else {
      formattedLines.push(trimmed);
    }
  });

  return formattedLines.join('\n');
}
