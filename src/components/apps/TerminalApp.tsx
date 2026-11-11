import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { useOSStore } from '../../store/useOSStore';
import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES } from '../../data/portfolioData';
import { AppId } from '../../types';

interface HistoryItem {
  command: string;
  output: string | React.ReactNode;
}

export const TerminalApp = () => {
  const { openApp, toggleTheme } = useOSStore();
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: 'neofetch',
      output: (
        <div className="font-mono text-xs text-zinc-300 space-y-1">
          <div className="text-emerald-400 font-bold">randall@macbook-pro</div>
          <div className="text-zinc-500">----------------------</div>
          <div><span className="text-amber-400">OS:</span> macOS Sequoia 15.0 (Web Edition)</div>
          <div><span className="text-amber-400">Host:</span> MacBook Pro (16-inch, 2024)</div>
          <div><span className="text-amber-400">Kernel:</span> React 19 + TypeScript 5.7</div>
          <div><span className="text-amber-400">Uptime:</span> 100% active</div>
          <div><span className="text-amber-400">Shell:</span> zsh 5.9 (x86_64-apple-darwin24.0)</div>
          <div><span className="text-amber-400">Role:</span> {PERSONAL_INFO.title}</div>
          <div className="pt-2 text-zinc-400">
            Type <span className="text-emerald-400 font-bold">'help'</span> for a list of available commands.
          </div>
        </div>
      ),
    },
  ]);

  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>(['neofetch']);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const trimmed = inputVal.trim();
      processCommand(trimmed);
      if (trimmed) {
        setCommandHistory((prev) => [...prev, trimmed]);
        setHistoryIndex(-1);
      }
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIdx = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInputVal(commandHistory[nextIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= commandHistory.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      }
    }
  };

  const processCommand = (cmd: string) => {
    const parts = cmd.trim().split(' ');
    const mainCmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').toLowerCase();

    let output: string | React.ReactNode = '';

    switch (mainCmd) {
      case '':
        output = '';
        break;

      case 'help':
        output = (
          <div className="space-y-1 text-xs font-mono">
            <div className="text-zinc-400">Available commands:</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1 text-zinc-300">
              <div><span className="text-emerald-400">bio</span> : About me overview</div>
              <div><span className="text-emerald-400">projects</span> : List portfolio projects</div>
              <div><span className="text-emerald-400">skills</span> : Show technical stack</div>
              <div><span className="text-emerald-400">contact</span> : Get contact details</div>
              <div><span className="text-emerald-400">open &lt;app&gt;</span> : Launch app</div>
              <div><span className="text-emerald-400">neofetch</span> : System information</div>
              <div><span className="text-emerald-400">theme</span> : Switch dark/light</div>
              <div><span className="text-emerald-400">date</span> : Print current date</div>
              <div><span className="text-emerald-400">clear</span> : Clear screen</div>
            </div>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'bio':
      case 'about':
        output = (
          <div className="text-xs text-zinc-300 leading-relaxed max-w-lg space-y-1.5">
            <p className="font-semibold text-white">{PERSONAL_INFO.name} — {PERSONAL_INFO.title}</p>
            {PERSONAL_INFO.bio.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        );
        break;

      case 'projects':
      case 'ls':
        output = (
          <div className="space-y-2 text-xs font-mono">
            <div className="text-zinc-400">Portfolio Projects:</div>
            {PROJECTS.map((p) => (
              <div key={p.id} className="space-y-0.5">
                <span className="text-blue-400 font-bold">{p.title}</span>{' '}
                <span className="text-zinc-500">[{p.category}]</span>
                <p className="text-zinc-300 pl-2">{p.description}</p>
                <p className="text-zinc-500 pl-2">Stack: {p.tags.join(', ')}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-2 text-xs font-mono">
            {SKILL_CATEGORIES.map((cat) => (
              <div key={cat.category}>
                <span className="text-amber-400 font-semibold">{cat.category}: </span>
                <span className="text-zinc-300">{cat.skills.join(', ')}</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="space-y-1 text-xs font-mono">
            <div>Email: <span className="text-blue-400">{PERSONAL_INFO.email}</span></div>
            <div>GitHub: <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-blue-400 underline">{PERSONAL_INFO.github}</a></div>
            <div>LinkedIn: <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-blue-400 underline">{PERSONAL_INFO.linkedin}</a></div>
          </div>
        );
        break;

      case 'date':
        output = new Date().toString();
        break;

      case 'whoami':
        output = `${PERSONAL_INFO.name.toLowerCase().replace(/\s+/g, '')} (uid=501, gid=20(staff))`;
        break;

      case 'theme':
        toggleTheme();
        output = 'Switched desktop appearance theme.';
        break;

      case 'open':
        const appNames: Record<string, AppId> = {
          finder: 'finder',
          projects: 'finder',
          notes: 'notes',
          about: 'notes',
          preview: 'preview',
          resume: 'preview',
          photos: 'photos',
          gallery: 'photos',
          mail: 'mail',
          contact: 'mail',
          settings: 'settings',
        };
        if (arg && appNames[arg]) {
          openApp(appNames[arg]);
          output = `Opening ${arg}...`;
        } else {
          output = `Usage: open [finder | notes | preview | photos | mail | settings]`;
        }
        break;

      case 'sudo':
        output = 'Permission denied: Nice try! You are not in the sudoers file.';
        break;

      default:
        output = `zsh: command not found: ${mainCmd}. Type 'help' for available commands.`;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="flex-1 h-full w-full bg-zinc-950 p-4 font-mono text-xs overflow-y-auto cursor-text select-text"
    >
      <div className="space-y-3">
        {history.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center space-x-2 text-zinc-400">
              <span className="text-emerald-400 font-semibold">randall@macbook-pro</span>
              <span className="text-zinc-600">:</span>
              <span className="text-blue-400 font-semibold">~</span>
              <span className="text-zinc-500">%</span>
              <span className="text-zinc-100">{item.command}</span>
            </div>
            {item.output && <div className="pl-2 pt-0.5">{item.output}</div>}
          </div>
        ))}
      </div>

      {/* Active Prompt */}
      <div className="flex items-center space-x-2 text-zinc-400 mt-2">
        <span className="text-emerald-400 font-semibold">randall@macbook-pro</span>
        <span className="text-zinc-600">:</span>
        <span className="text-blue-400 font-semibold">~</span>
        <span className="text-zinc-500">%</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          className="flex-1 bg-transparent text-zinc-100 outline-hidden font-mono text-xs caret-emerald-400"
        />
      </div>

      <div ref={bottomRef} />
    </div>
  );
};
