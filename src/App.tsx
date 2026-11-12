import { useEffect, useState } from 'react';
import { MenuBar } from './components/layout/MenuBar';
import { Desktop } from './components/layout/Desktop';
import { Dock } from './components/layout/Dock';
import { ControlCenter } from './components/layout/ControlCenter';
import { AboutThisMacModal } from './components/apps/AboutThisMacModal';
import { WindowFrame } from './components/window/WindowFrame';

// macOS Authentic Icons
import {
  MacNotesIcon,
  MacPreviewIcon,
  MacTerminalIcon,
  MacMailIcon,
  MacSettingsIcon,
  MacPhotosIcon,
} from './components/common/MacIcons';

// Applications
import { NotesApp } from './components/apps/NotesApp';
import { PreviewApp } from './components/apps/PreviewApp';
import { TerminalApp } from './components/apps/TerminalApp';
import { MailApp } from './components/apps/MailApp';
import { SettingsApp } from './components/apps/SettingsApp';
import { PhotosApp } from './components/apps/PhotosApp';

type MobileTab = 'notes' | 'resume' | 'photos' | 'contact';

export default function App() {
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  const [mobileTab, setMobileTab] = useState<MobileTab>('notes');
  const [mobileTime, setMobileTime] = useState(() =>
    new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Los_Angeles',
      hour: 'numeric',
      minute: '2-digit',
      hour12: false,
    }).format(new Date())
  );

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    const updateTime = () => {
      setMobileTime(
        new Intl.DateTimeFormat('en-US', {
          timeZone: 'America/Los_Angeles',
          hour: 'numeric',
          minute: '2-digit',
          hour12: false,
        }).format(new Date())
      );
    };

    handleResize();
    updateTime();
    window.addEventListener('resize', handleResize);
    const timeInterval = window.setInterval(updateTime, 30000);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.clearInterval(timeInterval);
    };
  }, []);

  const isCompactViewport = viewportWidth < 1100;

  const mobileTabs: Array<{ id: MobileTab; label: string }> = [
    { id: 'notes', label: 'About' },
    { id: 'resume', label: 'Resume' },
    { id: 'photos', label: 'Photos' },
    { id: 'contact', label: 'Contact' },
  ];

  if (isCompactViewport) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#111827] p-2 sm:p-4">
        <div className="relative h-[calc(100vh-16px)] w-full max-w-[430px] overflow-hidden rounded-[2.5rem] border border-white/15 bg-[#0f172a] shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
          <div className="absolute inset-x-0 top-0 z-20 flex h-10 items-center justify-center bg-black/10 backdrop-blur-sm">
            <div className="h-1.5 w-24 rounded-full bg-white/80" />
          </div>

          <div className="flex h-full flex-col pt-10">
            <div className="flex items-center justify-between border-b border-white/10 bg-zinc-950/70 px-4 py-2 text-[10px] text-zinc-300">
              <span>{mobileTime}</span>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/40" />
              </div>
            </div>

            <div className="border-b border-white/10 bg-zinc-950/50 px-3 py-2">
              <div className="flex gap-2 overflow-x-auto pb-1">
                {mobileTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setMobileTab(tab.id)}
                    className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors ${
                      mobileTab === tab.id
                        ? 'bg-amber-400 text-zinc-950'
                        : 'bg-white/5 text-zinc-200 hover:bg-white/10'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-hidden bg-zinc-900/80">
              {mobileTab === 'notes' && <NotesApp compact />}
              {mobileTab === 'resume' && <PreviewApp />}
              {mobileTab === 'photos' && <PhotosApp compact />}
              {mobileTab === 'contact' && <MailApp />}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden font-sans">
      {/* Top Menu Bar */}
      <MenuBar />

      {/* Control Center Flyout */}
      <ControlCenter />

      {/* About This Mac Modal */}
      <AboutThisMacModal />

      {/* Desktop Surface & Wallpapers */}
      <Desktop />

      {/* macOS Windows Layer with Authentic Icons */}
      <WindowFrame id="notes" title="Notes — About Me" icon={<MacNotesIcon className="w-4 h-4 inline-block align-middle" />}>
        <NotesApp compact={isCompactViewport} />
      </WindowFrame>

      <WindowFrame id="preview" title="Preview — Resume.pdf" icon={<MacPreviewIcon className="w-4 h-4 inline-block align-middle" />}>
        <PreviewApp />
      </WindowFrame>

      <WindowFrame id="photos" title="Photos — Memories" icon={<MacPhotosIcon className="w-4 h-4 inline-block align-middle" />}>
        <PhotosApp compact={isCompactViewport} />
      </WindowFrame>

      <WindowFrame id="terminal" title="Terminal — zsh" icon={<MacTerminalIcon className="w-4 h-4 inline-block align-middle" />}>
        <TerminalApp />
      </WindowFrame>

      <WindowFrame id="mail" title="Mail — Contact" icon={<MacMailIcon className="w-4 h-4 inline-block align-middle" />}>
        <MailApp />
      </WindowFrame>

      <WindowFrame id="settings" title="System Settings" icon={<MacSettingsIcon className="w-4 h-4 inline-block align-middle" />}>
        <SettingsApp />
      </WindowFrame>

      {/* Bottom Floating Dock */}
      <Dock />
    </div>
  );
}
