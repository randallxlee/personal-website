import { X, Code2, Cpu, HardDrive, Monitor, Layers } from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const AboutThisMacModal = () => {
  const { isAboutModalOpen, closeAboutModal } = useOSStore();

  if (!isAboutModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-2xl bg-zinc-900/95 backdrop-blur-2xl border border-white/20 shadow-2xl text-white overflow-hidden"
      >
        {/* Header with Traffic light close */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
          <div className="flex items-center space-x-2">
            <button
              onClick={closeAboutModal}
              className="w-3 h-3 rounded-full bg-red-500 hover:opacity-80 transition-opacity flex items-center justify-center group"
            >
              <X className="w-2 h-2 text-black/70 opacity-0 group-hover:opacity-100" />
            </button>
            <span className="w-3 h-3 rounded-full bg-amber-500/40" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/40" />
          </div>
          <span className="text-xs font-medium text-white/70">About This Mac</span>
          <div className="w-12" />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col items-center text-center">
          {/* macOS Badge / Icon */}
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-0.5 shadow-xl mb-4 flex items-center justify-center">
            <div className="w-full h-full rounded-2xl bg-black/40 backdrop-blur-md flex items-center justify-center text-4xl">
              
            </div>
          </div>

          <h2 className="text-xl font-bold tracking-tight text-white mb-0.5">{PERSONAL_INFO.name}</h2>
          <p className="text-xs text-blue-400 font-medium mb-4">{PERSONAL_INFO.title}</p>

          <div className="w-full rounded-xl bg-white/5 border border-white/10 p-3 space-y-2 text-left text-xs mb-5">
            <div className="flex items-center justify-between text-white/70">
              <span className="flex items-center space-x-1.5">
                <Layers className="w-3.5 h-3.5 text-purple-400" />
                <span>OS Version</span>
              </span>
              <span className="text-white font-medium">macOS Sequoia (Web 15.0)</span>
            </div>

            <div className="flex items-center justify-between text-white/70">
              <span className="flex items-center space-x-1.5">
                <Cpu className="w-3.5 h-3.5 text-blue-400" />
                <span>Engine</span>
              </span>
              <span className="text-white font-medium">React 19 + TypeScript</span>
            </div>

            <div className="flex items-center justify-between text-white/70">
              <span className="flex items-center space-x-1.5">
                <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
                <span>Styling</span>
              </span>
              <span className="text-white font-medium">Tailwind CSS v4</span>
            </div>

            <div className="flex items-center justify-between text-white/70">
              <span className="flex items-center space-x-1.5">
                <Monitor className="w-3.5 h-3.5 text-amber-400" />
                <span>Status</span>
              </span>
              <span className="text-white font-medium">{PERSONAL_INFO.status}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 w-full">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors flex items-center justify-center space-x-1.5"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>View GitHub</span>
            </a>
            <button
              onClick={closeAboutModal}
              className="py-2 px-4 rounded-lg bg-white/10 hover:bg-white/15 text-white/90 text-xs font-medium transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
