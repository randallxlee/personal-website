import { ReactNode, useRef, useState, useEffect } from 'react';
import { X, Minus, Maximize2 } from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';
import { AppId } from '../../types';

interface WindowFrameProps {
  id: AppId;
  title: string;
  children: ReactNode;
  icon?: ReactNode;
}

export const WindowFrame = ({ id, title, children, icon }: WindowFrameProps) => {
  const {
    windows,
    activeApp,
    closeApp,
    minimizeApp,
    toggleMaximizeApp,
    focusApp,
    updatePosition,
    updateSize,
  } = useOSStore();

  const win = windows[id];
  const isFocused = activeApp === id;

  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const dragRef = useRef<{ startX: number; startY: number; initX: number; initY: number }>({
    startX: 0,
    startY: 0,
    initX: 0,
    initY: 0,
  });

  const resizeRef = useRef<{
    startX: number;
    startY: number;
    initW: number;
    initH: number;
  }>({
    startX: 0,
    startY: 0,
    initW: 0,
    initH: 0,
  });

  // Responsive check
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Drag listeners
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;

      const newX = Math.max(0, Math.min(window.innerWidth - 100, dragRef.current.initX + dx));
      const newY = Math.max(28, Math.min(window.innerHeight - 80, dragRef.current.initY + dy));

      updatePosition(id, { x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, id, updatePosition]);

  // Resize listeners
  useEffect(() => {
    const handleResizeMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const dw = e.clientX - resizeRef.current.startX;
      const dh = e.clientY - resizeRef.current.startY;

      const minW = win.minSize?.width || 380;
      const minH = win.minSize?.height || 260;

      const newW = Math.max(minW, Math.min(window.innerWidth - win.position.x - 20, resizeRef.current.initW + dw));
      const newH = Math.max(minH, Math.min(window.innerHeight - win.position.y - 70, resizeRef.current.initH + dh));

      updateSize(id, { width: newW, height: newH });
    };

    const handleResizeUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      window.addEventListener('mousemove', handleResizeMove);
      window.addEventListener('mouseup', handleResizeUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleResizeMove);
      window.removeEventListener('mouseup', handleResizeUp);
    };
  }, [isResizing, id, win, updateSize]);

  if (!win || !win.isOpen || win.isMinimized) {
    return null;
  }

  const handleTitleBarMouseDown = (e: React.MouseEvent) => {
    if (win.isMaximized || isMobile) return;
    if ((e.target as HTMLElement).closest('button')) return;

    focusApp(id);
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initX: win.position.x,
      initY: win.position.y,
    };
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    focusApp(id);
    setIsResizing(true);
    resizeRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initW: win.size.width,
      initH: win.size.height,
    };
  };

  // Window geometry
  const windowStyles = isMobile
    ? {
        top: '28px',
        left: '0px',
        width: '100vw',
        height: 'calc(100vh - 28px - 72px)',
        zIndex: win.zIndex,
      }
    : win.isMaximized
    ? {
        top: '28px',
        left: '0px',
        width: '100vw',
        height: 'calc(100vh - 28px - 72px)',
        zIndex: win.zIndex,
      }
    : {
        top: `${win.position.y}px`,
        left: `${win.position.x}px`,
        width: `${win.size.width}px`,
        height: `${win.size.height}px`,
        zIndex: win.zIndex,
      };

  return (
    <div
      style={windowStyles}
      onMouseDown={() => focusApp(id)}
      className={`fixed flex flex-col rounded-xl overflow-hidden backdrop-blur-2xl transition-shadow duration-200 ${
        isFocused
          ? 'shadow-2xl ring-1 ring-white/20'
          : 'shadow-lg ring-1 ring-white/10 opacity-95'
      } ${
        id === 'terminal'
          ? 'bg-zinc-950/95 text-zinc-100'
          : 'bg-zinc-900/90 text-zinc-100'
      }`}
    >
      {/* macOS Window Title Bar */}
      <div
        onMouseDown={handleTitleBarMouseDown}
        onDoubleClick={() => !isMobile && toggleMaximizeApp(id)}
        className={`h-9 shrink-0 flex items-center justify-between px-3 border-b select-none transition-colors cursor-default ${
          isFocused ? 'border-white/15 bg-white/10' : 'border-white/10 bg-white/5 text-white/50'
        }`}
      >
        {/* Traffic Lights Controls */}
        <div className="flex items-center space-x-2 w-16 group">
          {/* Close */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeApp(id);
            }}
            className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
            aria-label="Close"
          >
            <X className="w-2 h-2 text-black/80 opacity-0 group-hover:opacity-100" />
          </button>

          {/* Minimize */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              minimizeApp(id);
            }}
            className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
            aria-label="Minimize"
          >
            <Minus className="w-2 h-2 text-black/80 opacity-0 group-hover:opacity-100" />
          </button>

          {/* Maximize */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMaximizeApp(id);
            }}
            className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
            aria-label="Maximize"
          >
            <Maximize2 className="w-1.5 h-1.5 text-black/80 opacity-0 group-hover:opacity-100" />
          </button>
        </div>

        {/* Centered Title */}
        <div className="flex items-center space-x-1.5 text-xs font-semibold tracking-tight text-white/90 truncate max-w-[60%]">
          {icon && <span className="opacity-80">{icon}</span>}
          <span className="truncate">{title}</span>
        </div>

        {/* Right Balancer */}
        <div className="w-16" />
      </div>

      {/* Window Body */}
      <div className="flex-1 overflow-auto relative flex flex-col">
        {children}
      </div>

      {/* Resize Handle (Bottom Right) */}
      {!win.isMaximized && !isMobile && (
        <div
          onMouseDown={handleResizeMouseDown}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-20 flex items-end justify-end p-0.5 opacity-40 hover:opacity-100"
          title="Resize window"
        >
          <svg className="w-2.5 h-2.5 text-white/50" viewBox="0 0 10 10">
            <line x1="10" y1="2" x2="2" y2="10" stroke="currentColor" strokeWidth="1.5" />
            <line x1="10" y1="6" x2="6" y2="10" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      )}
    </div>
  );
};
