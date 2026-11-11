import { useState } from 'react';
import { Image, Moon, Sun, Info, Check } from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';
import { WALLPAPERS, PERSONAL_INFO } from '../../data/portfolioData';

type Tab = 'wallpaper' | 'appearance' | 'about';

export const SettingsApp = () => {
  const [activeTab, setActiveTab] = useState<Tab>('wallpaper');
  const { wallpaperId, setWallpaper, theme, toggleTheme, soundEnabled } = useOSStore();

  return (
    <div className="flex h-full w-full bg-zinc-900 text-zinc-100 overflow-hidden select-text">
      {/* Settings Sidebar */}
      <div className="w-48 shrink-0 bg-zinc-950/60 border-r border-white/10 p-2.5 flex flex-col justify-between select-none">
        <div className="space-y-1">
          <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider px-2 py-1">
            Settings
          </div>

          <button
            onClick={() => setActiveTab('wallpaper')}
            className={`w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left ${
              activeTab === 'wallpaper' ? 'bg-blue-600 text-white' : 'text-zinc-300 hover:bg-white/5'
            }`}
          >
            <Image className="w-3.5 h-3.5" />
            <span>Wallpaper</span>
          </button>

          <button
            onClick={() => setActiveTab('appearance')}
            className={`w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left ${
              activeTab === 'appearance' ? 'bg-blue-600 text-white' : 'text-zinc-300 hover:bg-white/5'
            }`}
          >
            {theme === 'dark' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
            <span>Appearance</span>
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left ${
              activeTab === 'about' ? 'bg-blue-600 text-white' : 'text-zinc-300 hover:bg-white/5'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>About Website</span>
          </button>
        </div>

        <div className="text-[10px] text-zinc-500 text-center py-1">macOS Sequoia Web</div>
      </div>

      {/* Settings Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-zinc-900/40">
        {activeTab === 'wallpaper' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-bold text-white">Desktop Wallpaper</h2>
              <p className="text-xs text-zinc-400">Choose a background gradient for your desktop space.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {WALLPAPERS.map((wp) => (
                <div
                  key={wp.id}
                  onClick={() => setWallpaper(wp.id)}
                  className={`group relative rounded-xl p-1 border cursor-pointer transition-all ${
                    wallpaperId === wp.id
                      ? 'border-blue-500 ring-2 ring-blue-500/40'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <div
                    className={`h-24 rounded-lg bg-gradient-to-tr ${wp.thumbnail} flex items-end p-2`}
                  >
                    {wallpaperId === wp.id && (
                      <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                  <div className="text-xs font-medium text-zinc-200 mt-1.5 px-1 truncate">
                    {wp.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'appearance' && (
          <div className="space-y-6 max-w-md">
            <div>
              <h2 className="text-base font-bold text-white">Appearance & Display</h2>
              <p className="text-xs text-zinc-400">Customize the UI color mode and audio behaviors.</p>
            </div>

            {/* Dark / Light Toggle */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-semibold text-white">Theme Mode</h3>
                  <p className="text-[11px] text-zinc-400">Currently active: {theme} mode</p>
                </div>
                <button
                  onClick={toggleTheme}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-medium text-white transition-colors"
                >
                  Switch to {theme === 'dark' ? 'Light' : 'Dark'}
                </button>
              </div>
            </div>

            {/* Sound Toggle */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-semibold text-white">UI Sound Cues</h3>
                <p className="text-[11px] text-zinc-400">Sound effects on interactions</p>
              </div>
              <button
                onClick={() => useOSStore.setState({ soundEnabled: !soundEnabled })}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-colors ${
                  soundEnabled ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-zinc-700 hover:bg-zinc-600'
                }`}
              >
                {soundEnabled ? 'Enabled' : 'Muted'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="space-y-4 max-w-md text-xs text-zinc-300 leading-relaxed">
            <div>
              <h2 className="text-base font-bold text-white">About This Portfolio</h2>
              <p className="text-zinc-400">Handcrafted web desktop experience.</p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <p>
                Built by <strong>{PERSONAL_INFO.name}</strong> as an interactive showcase of personal work,
                inspired by the sleek, intuitive aesthetic of Apple macOS.
              </p>
              <div className="pt-2 border-t border-white/10 space-y-1 font-mono text-[11px] text-zinc-400">
                <div>Framework: React 19 + TypeScript + Vite 6</div>
                <div>Styling: Tailwind CSS v4</div>
                <div>State Engine: Zustand Store</div>
                <div>Deployment: Static SPA</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
