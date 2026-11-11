import { create } from 'zustand';
import { AppId, WindowPosition, WindowSize, WindowState } from '../types';

interface OSStore {
  windows: Record<AppId, WindowState>;
  activeApp: AppId | null;
  topZIndex: number;
  wallpaperId: string;
  theme: 'dark' | 'light';
  soundEnabled: boolean;
  isControlCenterOpen: boolean;
  isAppleMenuOpen: boolean;
  isAboutModalOpen: boolean;

  // Window actions
  openApp: (id: AppId) => void;
  closeApp: (id: AppId) => void;
  minimizeApp: (id: AppId) => void;
  toggleMaximizeApp: (id: AppId) => void;
  focusApp: (id: AppId) => void;
  updatePosition: (id: AppId, position: WindowPosition) => void;
  updateSize: (id: AppId, size: WindowSize) => void;

  // Shell actions
  setWallpaper: (id: string) => void;
  toggleTheme: () => void;
  toggleControlCenter: (open?: boolean) => void;
  toggleAppleMenu: (open?: boolean) => void;
  openAboutModal: () => void;
  closeAboutModal: () => void;
  closeAllPopups: () => void;
}

const DEFAULT_WINDOWS: Record<AppId, WindowState> = {
  notes: {
    id: 'notes',
    title: 'Notes — About Me',
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 80, y: 70 },
    size: { width: 720, height: 490 },
    minSize: { width: 450, height: 350 },
  },
  finder: {
    id: 'finder',
    title: 'Finder — Projects',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 9,
    position: { x: 140, y: 100 },
    size: { width: 780, height: 510 },
    minSize: { width: 480, height: 360 },
  },
  preview: {
    id: 'preview',
    title: 'Preview — Resume.pdf',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 8,
    position: { x: 200, y: 80 },
    size: { width: 700, height: 560 },
    minSize: { width: 480, height: 400 },
  },
  terminal: {
    id: 'terminal',
    title: 'Terminal — zsh',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 7,
    position: { x: 160, y: 120 },
    size: { width: 660, height: 420 },
    minSize: { width: 420, height: 280 },
  },
  mail: {
    id: 'mail',
    title: 'Mail — Contact',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 6,
    position: { x: 240, y: 110 },
    size: { width: 580, height: 480 },
    minSize: { width: 400, height: 360 },
  },
  settings: {
    id: 'settings',
    title: 'System Settings',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 5,
    position: { x: 280, y: 130 },
    size: { width: 560, height: 420 },
    minSize: { width: 420, height: 340 },
  },
  photos: {
    id: 'photos',
    title: 'Photos',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 6,
    position: { x: 200, y: 90 },
    size: { width: 820, height: 540 },
    minSize: { width: 480, height: 380 },
  },
};

export const useOSStore = create<OSStore>((set, get) => ({
  windows: DEFAULT_WINDOWS,
  activeApp: 'notes',
  topZIndex: 11,
  wallpaperId: 'sonoma-graphic',
  theme: 'dark',
  soundEnabled: true,
  isControlCenterOpen: false,
  isAppleMenuOpen: false,
  isAboutModalOpen: false,

  openApp: (id: AppId) => {
    const { windows, topZIndex } = get();
    const current = windows[id];
    const newZIndex = topZIndex + 1;

    set({
      windows: {
        ...windows,
        [id]: {
          ...current,
          isOpen: true,
          isMinimized: false,
          zIndex: newZIndex,
        },
      },
      activeApp: id,
      topZIndex: newZIndex,
      isAppleMenuOpen: false,
      isControlCenterOpen: false,
    });
  },

  closeApp: (id: AppId) => {
    const { windows, activeApp } = get();
    const nextWindows = {
      ...windows,
      [id]: { ...windows[id], isOpen: false, isMinimized: false },
    };

    // Find the next highest z-index open window to focus
    let nextActive: AppId | null = null;
    let maxZ = -1;
    (Object.keys(nextWindows) as AppId[]).forEach((appKey) => {
      if (nextWindows[appKey].isOpen && !nextWindows[appKey].isMinimized && nextWindows[appKey].zIndex > maxZ) {
        maxZ = nextWindows[appKey].zIndex;
        nextActive = appKey;
      }
    });

    set({
      windows: nextWindows,
      activeApp: activeApp === id ? nextActive : activeApp,
    });
  },

  minimizeApp: (id: AppId) => {
    const { windows, activeApp } = get();
    const nextWindows = {
      ...windows,
      [id]: { ...windows[id], isMinimized: true },
    };

    let nextActive: AppId | null = null;
    let maxZ = -1;
    (Object.keys(nextWindows) as AppId[]).forEach((appKey) => {
      if (nextWindows[appKey].isOpen && !nextWindows[appKey].isMinimized && nextWindows[appKey].zIndex > maxZ) {
        maxZ = nextWindows[appKey].zIndex;
        nextActive = appKey;
      }
    });

    set({
      windows: nextWindows,
      activeApp: activeApp === id ? nextActive : activeApp,
    });
  },

  toggleMaximizeApp: (id: AppId) => {
    const { windows } = get();
    const current = windows[id];
    set({
      windows: {
        ...windows,
        [id]: { ...current, isMaximized: !current.isMaximized },
      },
    });
  },

  focusApp: (id: AppId) => {
    const { windows, topZIndex, activeApp } = get();
    if (activeApp === id && !windows[id].isMinimized) return;

    const newZIndex = topZIndex + 1;
    set({
      windows: {
        ...windows,
        [id]: {
          ...windows[id],
          isOpen: true,
          isMinimized: false,
          zIndex: newZIndex,
        },
      },
      activeApp: id,
      topZIndex: newZIndex,
      isAppleMenuOpen: false,
      isControlCenterOpen: false,
    });
  },

  updatePosition: (id: AppId, position: WindowPosition) => {
    const { windows } = get();
    set({
      windows: {
        ...windows,
        [id]: { ...windows[id], position },
      },
    });
  },

  updateSize: (id: AppId, size: WindowSize) => {
    const { windows } = get();
    set({
      windows: {
        ...windows,
        [id]: { ...windows[id], size },
      },
    });
  },

  setWallpaper: (id: string) => set({ wallpaperId: id }),

  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),

  toggleControlCenter: (open?: boolean) =>
    set((state) => ({
      isControlCenterOpen: open !== undefined ? open : !state.isControlCenterOpen,
      isAppleMenuOpen: false,
    })),

  toggleAppleMenu: (open?: boolean) =>
    set((state) => ({
      isAppleMenuOpen: open !== undefined ? open : !state.isAppleMenuOpen,
      isControlCenterOpen: false,
    })),

  openAboutModal: () => set({ isAboutModalOpen: true, isAppleMenuOpen: false }),
  closeAboutModal: () => set({ isAboutModalOpen: false }),

  closeAllPopups: () => set({ isAppleMenuOpen: false, isControlCenterOpen: false }),
}));
