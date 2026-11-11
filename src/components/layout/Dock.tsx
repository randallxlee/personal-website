import { useState } from 'react';
import {
  MacNotesIcon,
  MacPreviewIcon,
  MacTerminalIcon,
  MacMailIcon,
  MacSettingsIcon,
  MacTrashIcon,
  MacPhotosIcon,
} from '../common/MacIcons';
import { useOSStore } from '../../store/useOSStore';
import { AppId } from '../../types';

interface DockItem {
  id: AppId | 'trash';
  name: string;
  component: React.ComponentType<{ className?: string }>;
}

const DOCK_ITEMS: DockItem[] = [
  {
    id: 'notes',
    name: 'Notes (About Me)',
    component: MacNotesIcon,
  },
  {
    id: 'preview',
    name: 'Preview (Resume)',
    component: MacPreviewIcon,
  },
  {
    id: 'photos',
    name: 'Photos (Life & Travel)',
    component: MacPhotosIcon,
  },
  {
    id: 'terminal',
    name: 'Terminal',
    component: MacTerminalIcon,
  },
  {
    id: 'mail',
    name: 'Mail (Contact)',
    component: MacMailIcon,
  },
  {
    id: 'settings',
    name: 'System Settings',
    component: MacSettingsIcon,
  },
];

export const Dock = () => {
  const { windows, activeApp, openApp, minimizeApp, focusApp } = useOSStore();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleDockClick = (id: AppId | 'trash') => {
    if (id === 'trash') {
      // Easter egg: minimize all open windows
      (Object.keys(windows) as AppId[]).forEach((appId) => {
        if (windows[appId].isOpen && !windows[appId].isMinimized) {
          minimizeApp(appId);
        }
      });
      return;
    }

    const app = windows[id];
    if (!app.isOpen) {
      openApp(id);
    } else if (app.isMinimized) {
      focusApp(id);
    } else if (activeApp === id) {
      minimizeApp(id);
    } else {
      focusApp(id);
    }
  };

  const getScale = (index: number) => {
    if (hoveredIndex === null) return 'scale-100';
    const dist = Math.abs(hoveredIndex - index);
    if (dist === 0) return 'scale-135 -translate-y-2.5';
    if (dist === 1) return 'scale-118 -translate-y-1.5';
    return 'scale-100';
  };

  return (
    <div className="fixed bottom-3 inset-x-0 z-40 flex justify-center pointer-events-none px-4">
      <nav
        onMouseLeave={() => setHoveredIndex(null)}
        className="pointer-events-auto flex items-end space-x-2 px-3 py-2 rounded-2xl bg-white/20 dark:bg-black/30 backdrop-blur-3xl border border-white/25 dark:border-white/10 shadow-2xl transition-all"
        aria-label="Application Dock"
      >
        {DOCK_ITEMS.map((item, index) => {
          const appId = item.id as AppId;
          const isOpen = windows[appId]?.isOpen;
          const isFocused = activeApp === appId && isOpen && !windows[appId]?.isMinimized;
          const IconComponent = item.component;

          return (
            <div key={item.id} className="relative flex flex-col items-center group">
              {/* Tooltip */}
              <div className="absolute -top-11 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 px-2.5 py-1 rounded-md bg-zinc-900/90 text-white text-[11px] font-medium backdrop-blur-md border border-white/10 whitespace-nowrap shadow-xl">
                {item.name}
              </div>

              {/* Dock Icon Button */}
              <button
                onClick={() => handleDockClick(item.id)}
                onMouseEnter={() => setHoveredIndex(index)}
                className={`relative w-12 h-12 transition-all duration-200 transform origin-bottom active:scale-95 cursor-default ${getScale(
                  index
                )}`}
                aria-label={item.name}
              >
                <IconComponent className="w-12 h-12 drop-shadow-md hover:drop-shadow-xl transition-all" />
              </button>

              {/* Running Dot Indicator */}
              <div className="h-1 flex items-center justify-center mt-0.5">
                {isOpen && (
                  <span
                    className={`w-1 h-1 rounded-full transition-all ${
                      isFocused ? 'bg-white scale-125 ring-1 ring-white/50' : 'bg-white/50'
                    }`}
                  />
                )}
              </div>
            </div>
          );
        })}

        {/* Divider */}
        <div className="w-px h-10 bg-white/20 self-center mx-1" />

        {/* Trash */}
        <div className="relative flex flex-col items-center group">
          <div className="absolute -top-11 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 px-2.5 py-1 rounded-md bg-zinc-900/90 text-white text-[11px] font-medium backdrop-blur-md border border-white/10 whitespace-nowrap shadow-xl">
            Trash (Minimize All)
          </div>
          <button
            onClick={() => handleDockClick('trash')}
            onMouseEnter={() => setHoveredIndex(DOCK_ITEMS.length)}
            className={`relative w-12 h-12 transition-all duration-200 transform origin-bottom active:scale-95 cursor-default ${getScale(
              DOCK_ITEMS.length
            )}`}
            aria-label="Trash"
          >
            <MacTrashIcon className="w-12 h-12 drop-shadow-md hover:drop-shadow-xl transition-all" />
          </button>
          <div className="h-1 mt-0.5" />
        </div>
      </nav>
    </div>
  );
};
