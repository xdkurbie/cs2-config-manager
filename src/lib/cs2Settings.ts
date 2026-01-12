import { CS2Config } from '../types/config';

export const DEFAULT_CONFIG: CS2Config = {
  id: '',
  name: '',
  isPreset: false,
  createdAt: Date.now(),
  updatedAt: Date.now(),
  
  video: {
    resolution: '1920x1080',
    aspectRatio: '16:9',
    fullscreen: true,
    vsync: false,
    graphicsQuality: 'High',
    displayMode: 'fullscreen',
    fpsMax: 0,
    brightness: 2.0,
    gamma: 2.2,
  },
  
  audio: {
    masterVolume: 1.0,
    musicVolume: 0.1,
    volume: 0.5,
    voiceEnable: true,
    voiceScale: 0.5,
    sndHeadphonePanExponent: 2.0,
    sndMixAhead: 0.05,
  },
  
  gameplay: {
    sensitivity: '0.9',
    mYaw: 0.022,
    mCustomaccel: 0,
    mCustomaccelScale: 0.04,
    mCustomaccelMax: 0,
    binds: {},
    zoomSensitivity: 1.0,
  },
  
  crosshair: {
    style: 4,
    size: 2,
    thickness: 0,
    gap: -2,
    outline: 1,
    outlineThickness: 1,
    colorR: 50,
    colorG: 250,
    colorB: 50,
    alpha: 255,
    dot: 1,
    dotSize: 1,
    tStyle: 0,
    gapUseweaponvalue: false,
    useAlpha: true,
    splitDistanceRatio: 0,
    splitDistancRatioOuter: 0,
  },
  
  viewmodel: {
    fov: 68,
    offsetX: 2.5,
    offsetY: 0,
    offsetZ: -1.5,
    pitch: 0,
    yaw: 0,
    roll: 0,
    recoil: 0,
  },
  
  network: {
    rate: 786432,
    clCmdrate: 64,
    clUpdaterate: 64,
    clInterp: 0.015625,
    clInterpRatio: 2,
    clLagcompensation: true,
    netUdpClientMaxReliablePayloadSize: 1200,
  },
  
  hud: {
    hudScaling: 0.85,
    hudShowtargetid: true,
    hudFadeRemovedistance: 2000,
    clHudColor: 7,
    clHudBackgroundAlpha: 0.5,
    clHudPlayerCountPos: 1,
    clHudPlayerCountShowcount: true,
  },
  
  radar: {
    clRadarScale: 0.7,
    clRadarRotate: true,
    clRadarSquareWithScoreboard: false,
    clRadarAlwaysCentered: true,
    clRadarIconScaleMin: 0.6,
    clRadarRadarOpacity: 0.8,
    clRadarHudHeightPct: 0.6,
    clRadarHudWidthPct: 0.6,
  },
  
  rawConfig: '',
};

export const RESOLUTIONS = [
  '1920x1080',
  '2560x1440',
  '3840x2160',
  '1280x1024',
  '1280x960',
  '1440x900',
  '1680x1050',
  '1600x900',
];

export const ASPECT_RATIOS = [
  '16:9',
  '16:10',
  '4:3',
  '21:9',
];

export const GRAPHICS_QUALITIES = [
  'Low',
  'Medium',
  'High',
  'Ultra',
];

export const DISPLAY_MODES = [
  'fullscreen',
  'windowed',
  'windowed fullscreen',
];

export const CROSSHAIR_COLORS = [
  { name: 'Green', r: 50, g: 250, b: 50 },
  { name: 'Yellow', r: 250, g: 250, b: 50 },
  { name: 'Red', r: 50, g: 50, b: 250 },
  { name: 'Blue', r: 50, g: 50, b: 250 },
  { name: 'Cyan', r: 50, g: 250, b: 250 },
  { name: 'Pink', r: 250, g: 50, b: 250 },
  { name: 'White', r: 250, g: 250, b: 250 },
  { name: 'Custom', r: 0, g: 0, b: 0 },
];
