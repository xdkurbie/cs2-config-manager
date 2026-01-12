export interface CS2Config {
  id: string;
  name: string;
  isPreset: boolean;
  author?: string;
  createdAt: number;
  updatedAt: number;
  
  video: VideoSettings;
  audio: AudioSettings;
  gameplay: GameplaySettings;
  crosshair: CrosshairSettings;
  viewmodel: ViewModelSettings;
  network: NetworkSettings;
  hud: HUDSettings;
  radar: RadarSettings;
  
  rawConfig: string;
}

export interface VideoSettings {
  resolution: string;
  aspectRatio: string;
  fullscreen: boolean;
  vsync: boolean;
  graphicsQuality: string;
  displayMode: string;
  fpsMax: number;
  brightness: number;
  gamma: number;
}

export interface AudioSettings {
  masterVolume: number;
  musicVolume: number;
  volume: number;
  voiceEnable: boolean;
  voiceScale: number;
  sndHeadphonePanExponent: number;
  sndMixAhead: number;
}

export interface GameplaySettings {
  sensitivity: string;
  mYaw: number;
  mCustomaccel: number;
  mCustomaccelScale: number;
  mCustomaccelMax: number;
  binds: Record<string, string>;
  zoomSensitivity: number;
}

export interface CrosshairSettings {
  style: number;
  size: number;
  thickness: number;
  gap: number;
  outline: number;
  outlineThickness: number;
  colorR: number;
  colorG: number;
  colorB: number;
  alpha: number;
  dot: number;
  dotSize: number;
  tStyle: number;
  gapUseweaponvalue: boolean;
  useAlpha: boolean;
  splitDistanceRatio: number;
  splitDistancRatioOuter: number;
}

export interface ViewModelSettings {
  fov: number;
  offsetX: number;
  offsetY: number;
  offsetZ: number;
  pitch: number;
  yaw: number;
  roll: number;
  recoil: number;
}

export interface NetworkSettings {
  rate: number;
  clCmdrate: number;
  clUpdaterate: number;
  clInterp: number;
  clInterpRatio: number;
  clLagcompensation: boolean;
  netUdpClientMaxReliablePayloadSize: number;
}

export interface HUDSettings {
  hudScaling: number;
  hudShowtargetid: boolean;
  hudFadeRemovedistance: number;
  clHudColor: number;
  clHudBackgroundAlpha: number;
  clHudPlayerCountPos: number;
  clHudPlayerCountShowcount: boolean;
}

export interface RadarSettings {
  clRadarScale: number;
  clRadarRotate: boolean;
  clRadarSquareWithScoreboard: boolean;
  clRadarAlwaysCentered: boolean;
  clRadarIconScaleMin: number;
  clRadarRadarOpacity: number;
  clRadarHudHeightPct: number;
  clRadarHudWidthPct: number;
}

export interface CaseItem {
  id: string;
  name: string;
  rarity: 'blue' | 'purple' | 'pink' | 'red' | 'gold';
  image: string;
  wear?: 'Factory New' | 'Minimal Wear' | 'Field-Tested' | 'Well-Worn' | 'Battle-Scarred';
  value?: number;
}

export interface Case {
  id: string;
  name: string;
  items: CaseItem[];
  price: number;
  image: string;
}

export interface Inventory {
  items: (CaseItem & { id: string; acquiredAt: number })[];
  totalValue: number;
}

export const CROSSHAIR_STYLES = [
  { id: 0, name: 'Default' },
  { id: 1, name: 'Classic' },
  { id: 2, name: 'Classic Static' },
  { id: 3, name: 'Classic Dynamic' },
  { id: 4, name: 'Cross' },
  { id: 5, name: 'T-shape' },
];

export const RARITY_COLORS = {
  blue: '#4b69ff',
  purple: '#8847ff',
  pink: '#d32ce6',
  red: '#eb4b4b',
  gold: '#e4ae39',
};
