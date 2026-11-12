import { useState, useEffect } from 'react';
import { Wifi, SlidersHorizontal, BatteryCharging } from 'lucide-react';
import {
  MacNotesIcon,
  MacTerminalIcon,
  MacSettingsIcon,
  MacPhotosIcon,
} from '../common/MacIcons';
import { useOSStore } from '../../store/useOSStore';
import { AppId } from '../../types';

const APP_NAMES: Record<AppId, string> = {
  finder: 'Finder',
  notes: 'Notes',
  preview: 'Preview',
  terminal: 'Terminal',
  mail: 'Mail',
  settings: 'System Settings',
  photos: 'Photos',
};

export const MenuBar = () => {
  const {
    activeApp,
    isAppleMenuOpen,
    toggleAppleMenu,
    toggleControlCenter,
    openAboutModal,
    openApp,
    closeAllPopups,
  } = useOSStore();

  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'America/Los_Angeles',
      };
      setTimeString(now.toLocaleDateString('en-US', options).replace(/,/g, ''));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentAppName = activeApp ? APP_NAMES[activeApp] : 'Finder';

  return (
    <header className="relative z-50 h-7 w-full flex items-center justify-between px-3 text-[13px] font-medium bg-black/40 backdrop-blur-2xl text-white/90 border-b border-white/10 shadow-xs select-none">
      {/* Left side: Apple Menu & App Items */}
      <div className="flex items-center space-x-3.5">
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleAppleMenu();
            }}
            className="px-1.5 py-0.5 rounded hover:bg-white/15 transition-colors cursor-default text-[15px] leading-none"
            aria-label="Apple Menu"
          >
            
          </button>

          {/* Apple Dropdown Menu */}
          {isAppleMenuOpen && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute left-0 top-7 w-56 py-1.5 rounded-lg bg-zinc-900/90 backdrop-blur-3xl text-zinc-200 border border-white/15 shadow-2xl text-[13px] z-50 animate-in fade-in zoom-in-95 duration-100"
            >
              <button
                onClick={() => openAboutModal()}
                className="w-full text-left px-3.5 py-1 hover:bg-blue-600 hover:text-white transition-colors cursor-default"
              >
                About This Mac
              </button>
              <div className="h-px bg-white/10 my-1 mx-2" />
              <button
                onClick={() => {
                  openApp('settings');
                  closeAllPopups();
                }}
                className="w-full text-left px-3.5 py-1.5 hover:bg-blue-600 hover:text-white transition-colors cursor-default flex items-center space-x-2"
              >
                <MacSettingsIcon className="w-4 h-4 shrink-0" />
                <span>System Settings...</span>
              </button>
              <div className="h-px bg-white/10 my-1 mx-2" />
              <button
                onClick={() => {
                  openApp('notes');
                  closeAllPopups();
                }}
                className="w-full text-left px-3.5 py-1.5 hover:bg-blue-600 hover:text-white transition-colors cursor-default flex items-center space-x-2"
              >
                <MacNotesIcon className="w-4 h-4 shrink-0" />
                <span>Open Portfolio Notes</span>
              </button>
              <button
                onClick={() => {
                  openApp('photos');
                  closeAllPopups();
                }}
                className="w-full text-left px-3.5 py-1.5 hover:bg-blue-600 hover:text-white transition-colors cursor-default flex items-center space-x-2"
              >
                <MacPhotosIcon className="w-4 h-4 shrink-0" />
                <span>Browse Personal Photos</span>
              </button>
              <button
                onClick={() => {
                  openApp('terminal');
                  closeAllPopups();
                }}
                className="w-full text-left px-3.5 py-1.5 hover:bg-blue-600 hover:text-white transition-colors cursor-default flex items-center space-x-2"
              >
                <MacTerminalIcon className="w-4 h-4 shrink-0" />
                <span>Open Terminal</span>
              </button>
              <div className="h-px bg-white/10 my-1 mx-2" />
              <button
                onClick={() => window.location.reload()}
                className="w-full text-left px-3.5 py-1 hover:bg-blue-600 hover:text-white transition-colors cursor-default"
              >
                Restart...
              </button>
            </div>
          )}
        </div>

        {/* Current Active App Name */}
        <span className="font-semibold text-white tracking-tight">{currentAppName}</span>

        {/* Standard Menu Items */}
        <div className="hidden sm:flex items-center space-x-3.5 text-white/80">
          <button
            onClick={() => openApp('notes')}
            className="hover:text-white transition-colors cursor-default"
          >
            Edit
          </button>
          <button
            onClick={() => openApp('preview')}
            className="hover:text-white transition-colors cursor-default"
          >
            View
          </button>
          <button
            onClick={() => openApp('terminal')}
            className="hover:text-white transition-colors cursor-default"
          >
            Window
          </button>
          <button
            onClick={() => openApp('mail')}
            className="hover:text-white transition-colors cursor-default"
          >
            Help
          </button>
        </div>
      </div>

      {/* Right side: Status Tray & Clock */}
      <div className="flex items-center space-x-3 text-white/90">
        <div className="hidden md:flex items-center space-x-2 text-white/80">
          <BatteryCharging className="w-4 h-4 text-emerald-400" />
          <span className="text-xs">100%</span>
        </div>

        <Wifi className="w-3.5 h-3.5 text-white/85" />

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleControlCenter();
          }}
          className="p-1 rounded hover:bg-white/15 transition-colors cursor-default"
          title="Control Center"
          aria-label="Control Center"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
        </button>

        <span className="text-xs text-white/95 font-medium pl-1">{timeString}</span>
      </div>
    </header>
  );
};
