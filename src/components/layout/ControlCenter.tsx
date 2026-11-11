import { Moon, Sun, Volume2, VolumeX, Image as ImageIcon, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/Icons';
import { useOSStore } from '../../store/useOSStore';
import { WALLPAPERS, PERSONAL_INFO } from '../../data/portfolioData';

export const ControlCenter = () => {
  const {
    isControlCenterOpen,
    theme,
    toggleTheme,
    soundEnabled,
    wallpaperId,
    setWallpaper,
    openApp,
    closeAllPopups,
  } = useOSStore();

  if (!isControlCenterOpen) return null;

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute right-3 top-8 w-80 p-3 rounded-2xl bg-zinc-900/85 backdrop-blur-3xl text-white border border-white/15 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150"
    >
      <div className="text-xs font-semibold text-white/50 px-1 mb-2">Control Center</div>

      {/* Top 2x2 Grid */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        {/* Theme Card */}
        <button
          onClick={toggleTheme}
          className="flex flex-col items-start p-2.5 rounded-xl bg-white/10 hover:bg-white/15 transition-all text-left"
        >
          <div className="p-2 rounded-full bg-blue-500 text-white mb-2 shadow-sm">
            {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </div>
          <span className="text-xs font-medium text-white">Appearance</span>
          <span className="text-[10px] text-white/60 capitalize">{theme} Mode</span>
        </button>

        {/* Sound Card */}
        <button
          onClick={() => {
            useOSStore.setState({ soundEnabled: !soundEnabled });
          }}
          className="flex flex-col items-start p-2.5 rounded-xl bg-white/10 hover:bg-white/15 transition-all text-left"
        >
          <div className="p-2 rounded-full bg-amber-500 text-white mb-2 shadow-sm">
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </div>
          <span className="text-xs font-medium text-white">Sound Effects</span>
          <span className="text-[10px] text-white/60">{soundEnabled ? 'Enabled' : 'Muted'}</span>
        </button>
      </div>

      {/* Quick Wallpaper Switcher */}
      <div className="p-2.5 rounded-xl bg-white/10 mb-3">
        <div className="flex items-center space-x-1.5 text-xs font-medium text-white mb-2">
          <ImageIcon className="w-3.5 h-3.5 text-purple-400" />
          <span>Wallpaper</span>
        </div>
        <div className="grid grid-cols-5 gap-1.5">
          {WALLPAPERS.map((wp) => (
            <button
              key={wp.id}
              onClick={() => setWallpaper(wp.id)}
              className={`h-7 rounded-md transition-transform bg-gradient-to-br ${wp.thumbnail} ${
                wallpaperId === wp.id ? 'ring-2 ring-white scale-105' : 'opacity-70 hover:opacity-100'
              }`}
              title={wp.name}
            />
          ))}
        </div>
      </div>

      {/* Quick Portfolio Links */}
      <div className="grid grid-cols-3 gap-2">
        <a
          href={PERSONAL_INFO.github}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-white/10 hover:bg-white/15 transition-colors text-white text-center"
        >
          <GithubIcon className="w-4 h-4 mb-1" />
          <span className="text-[10px] font-medium">GitHub</span>
        </a>

        <a
          href={PERSONAL_INFO.linkedin}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-white/10 hover:bg-white/15 transition-colors text-white text-center"
        >
          <LinkedinIcon className="w-4 h-4 mb-1 text-blue-400" />
          <span className="text-[10px] font-medium">LinkedIn</span>
        </a>

        <button
          onClick={() => {
            openApp('mail');
            closeAllPopups();
          }}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-white/10 hover:bg-white/15 transition-colors text-white text-center"
        >
          <Mail className="w-4 h-4 mb-1 text-emerald-400" />
          <span className="text-[10px] font-medium">Message</span>
        </button>
      </div>
    </div>
  );
};
