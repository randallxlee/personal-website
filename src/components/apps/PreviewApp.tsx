import { useEffect, useState } from 'react';
import { Download, Printer, ZoomIn, ZoomOut, FileText } from 'lucide-react';

export const PreviewApp = () => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isMobile, setIsMobile] = useState(false);
  const pdfUrl = '/resume.pdf';

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePrint = () => {
    const printWindow = window.open(pdfUrl, '_blank', 'noopener,noreferrer');
    if (printWindow) {
      printWindow.focus();
      setTimeout(() => {
        try {
          printWindow.print();
        } catch {
          // No-op: browser may block the print call for some PDF viewers.
        }
      }, 250);
      return;
    }

    window.print();
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = pdfUrl;
    a.download = 'Resume.pdf';
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.click();
  };

  return (
    <div className="flex flex-col h-full w-full bg-zinc-950 text-zinc-100 overflow-hidden select-text">
      {/* Preview Toolbar */}
      <div className="h-10 shrink-0 bg-zinc-900 border-b border-white/10 px-3 flex items-center justify-between select-none">
        <div className="flex items-center space-x-2 text-xs text-zinc-300">
          <FileText className="w-3.5 h-3.5 text-blue-400" />
          <span className="font-medium">Resume — Randall Lee.pdf</span>
        </div>

        {/* Zoom & Action Controls */}
        <div className="flex items-center space-x-2">
          {!isMobile && (
            <div className="flex items-center space-x-1 bg-white/5 rounded-lg p-0.5 border border-white/10">
              <button
                onClick={() => setZoomLevel((z) => Math.max(75, z - 10))}
                className="p-1 rounded text-zinc-400 hover:text-white transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-mono text-zinc-300 px-1">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(125, z + 10))}
                className="p-1 rounded text-zinc-400 hover:text-white transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <button
            onClick={handlePrint}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white border border-white/10 transition-colors"
            title="Print Resume"
          >
            <Printer className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-medium text-white transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Document Viewport */}
      <div className="flex-1 overflow-hidden p-4 md:p-8 bg-zinc-950/90">
        <div className="relative h-full w-full flex justify-center items-start">
          <iframe
            key={pdfUrl}
            src={pdfUrl}
            title="Resume PDF"
            className="rounded-lg border border-white/10 bg-white shadow-2xl"
            style={{
              width: isMobile ? '100%' : `${zoomLevel}%`,
              maxWidth: '100%',
              height: '100%',
              minHeight: 'calc(100vh - 200px)',
            }}
          />
        </div>
      </div>

      {/* The rest of the component is intentionally replaced by the live PDF viewer */}
    </div>
  );
};
