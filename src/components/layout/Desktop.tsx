import { useState } from 'react';
import { Terminal, Image as ImageIcon } from 'lucide-react';
import {
  MacNotesIcon,
  MacPreviewIcon,
  MacTerminalIcon,
  MacMailIcon,
  MacHardDriveIcon,
  MacPhotosIcon,
} from '../common/MacIcons';
import { useOSStore } from '../../store/useOSStore';
import { WALLPAPERS } from '../../data/portfolioData';
import { AppId } from '../../types';

interface DesktopShortcut {
  id: AppId;
  label: string;
  component: React.ComponentType<{ className?: string }>;
}

const DESKTOP_SHORTCUTS: DesktopShortcut[] = [
  {
    id: 'notes',
    label: 'About Me',
    component: MacNotesIcon,
  },
  {
    id: 'preview',
    label: 'Resume.pdf',
    component: MacPreviewIcon,
  },
  {
    id: 'photos',
    label: 'Photos',
    component: MacPhotosIcon,
  },
  {
    id: 'terminal',
    label: 'Terminal',
    component: MacTerminalIcon,
  },
  {
    id: 'mail',
    label: 'Contact Me',
    component: MacMailIcon,
  },
];

export const Desktop = () => {
  const {
    wallpaperId,
    openApp,
    closeAllPopups,
    openAboutModal,
  } = useOSStore();

  const [selectedIcon, setSelectedIcon] = useState<AppId | 'hd' | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  const activeWallpaper = WALLPAPERS.find((w) => w.id === wallpaperId) || WALLPAPERS[0];

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleDesktopClick = () => {
    setSelectedIcon(null);
    setContextMenu(null);
    closeAllPopups();
  };

  return (
    <main
      onClick={handleDesktopClick}
      onContextMenu={handleContextMenu}
      style={{ background: activeWallpaper.style }}
      className="relative h-screen w-screen overflow-hidden select-none transition-all duration-700"
    >
      {/* Desktop Icons (Top-Right / Traditional macOS layout) */}
      <div className="absolute right-4 top-10 flex flex-col space-y-3 z-10">
        {/* Macintosh HD Icon */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            setSelectedIcon('hd');
          }}
          onDoubleClick={(e) => {
            e.stopPropagation();
            openApp('finder');
          }}
          className={`flex flex-col items-center justify-center p-2 rounded-xl w-22 cursor-default group transition-colors ${
            selectedIcon === 'hd' ? 'bg-white/20 ring-1 ring-white/30' : 'hover:bg-white/10'
          }`}
        >
          <MacHardDriveIcon className="w-13 h-13 mb-1 filter drop-shadow-md group-hover:drop-shadow-xl transition-all" />
          <span className="text-[11px] font-medium text-white text-center drop-shadow-md px-1.5 py-0.5 rounded-sm line-clamp-1 bg-black/20">
            Macintosh HD
          </span>
        </div>

        {DESKTOP_SHORTCUTS.map((item) => {
          const IconComponent = item.component;
          const isSelected = selectedIcon === item.id;

          return (
            <div
              key={item.id}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIcon(item.id);
              }}
              onDoubleClick={(e) => {
                e.stopPropagation();
                openApp(item.id);
              }}
              className={`flex flex-col items-center justify-center p-2 rounded-xl w-22 cursor-default group transition-colors ${
                isSelected ? 'bg-white/20 ring-1 ring-white/30' : 'hover:bg-white/10'
              }`}
            >
              <IconComponent className="w-13 h-13 mb-1 filter drop-shadow-md group-hover:drop-shadow-xl transition-all" />
              <span className="text-[11px] font-medium text-white text-center drop-shadow-md px-1.5 py-0.5 rounded-sm line-clamp-1 bg-black/20">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Right-Click Context Menu */}
      {contextMenu && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
          className="fixed z-50 w-52 py-1.5 rounded-xl bg-zinc-900/90 backdrop-blur-2xl text-zinc-200 border border-white/15 shadow-2xl text-xs"
        >
          <button
            onClick={() => {
              openAboutModal();
              setContextMenu(null);
            }}
            className="w-full text-left px-3.5 py-1.5 hover:bg-blue-600 hover:text-white transition-colors cursor-default"
          >
            About This Mac
          </button>
          <div className="h-px bg-white/10 my-1 mx-2" />
          <button
            onClick={() => {
              openApp('settings');
              setContextMenu(null);
            }}
            className="w-full text-left px-3.5 py-1.5 hover:bg-blue-600 hover:text-white transition-colors cursor-default flex items-center space-x-2"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Change Wallpaper...</span>
          </button>
          <button
            onClick={() => {
              openApp('terminal');
              setContextMenu(null);
            }}
            className="w-full text-left px-3.5 py-1.5 hover:bg-blue-600 hover:text-white transition-colors cursor-default flex items-center space-x-2"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Open in Terminal</span>
          </button>
        </div>
      )}
    </main>
  );
};
