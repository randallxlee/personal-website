import { useState, FormEvent } from 'react';
import { Send, CheckCircle, Copy, Check, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const MailApp = () => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!senderEmail || !message) return;

    // Simulate sending message
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setSenderName('');
      setSenderEmail('');
      setSubject('');
      setMessage('');
    }, 4000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full w-full bg-zinc-900 text-zinc-100 overflow-hidden select-text">
      {/* Mail Toolbar */}
      <div className="h-10 shrink-0 bg-zinc-950/70 border-b border-white/10 px-4 flex items-center justify-between select-none">
        <span className="text-xs font-semibold text-zinc-300">New Message</span>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopyEmail}
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-xs text-zinc-300 border border-white/10 transition-colors"
            title="Copy email to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Email'}</span>
          </button>

          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-xs text-zinc-300 border border-white/10 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Default Client</span>
          </a>
        </div>
      </div>

      {/* Compose Form */}
      {isSent ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3 animate-in fade-in duration-200">
          <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">Message Sent!</h3>
          <p className="text-xs text-zinc-400 max-w-xs">
            Thanks for reaching out! I'll get back to you as soon as possible.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
          {/* Header Fields */}
          <div className="divide-y divide-white/10 bg-zinc-950/30 text-xs">
            <div className="flex items-center px-4 py-2 space-x-3">
              <span className="text-zinc-500 w-16">To:</span>
              <span className="text-blue-400 font-medium">
                {PERSONAL_INFO.name} &lt;{PERSONAL_INFO.email}&gt;
              </span>
            </div>

            <div className="flex items-center px-4 py-2 space-x-3">
              <label htmlFor="senderName" className="text-zinc-500 w-16">Your Name:</label>
              <input
                id="senderName"
                type="text"
                placeholder="Jane Doe"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-zinc-600 focus:outline-hidden"
              />
            </div>

            <div className="flex items-center px-4 py-2 space-x-3">
              <label htmlFor="senderEmail" className="text-zinc-500 w-16">Your Email:</label>
              <input
                id="senderEmail"
                type="email"
                required
                placeholder="jane@example.com"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-zinc-600 focus:outline-hidden"
              />
            </div>

            <div className="flex items-center px-4 py-2 space-x-3">
              <label htmlFor="subject" className="text-zinc-500 w-16">Subject:</label>
              <input
                id="subject"
                type="text"
                required
                placeholder="Collaboration opportunity / Hello"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-zinc-600 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Message Body */}
          <div className="flex-1 p-4 flex flex-col">
            <textarea
              required
              rows={6}
              placeholder="Write your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 w-full bg-transparent text-sm text-zinc-200 placeholder-zinc-600 resize-none focus:outline-hidden leading-relaxed"
            />
          </div>

          {/* Send Bar */}
          <div className="p-3 bg-zinc-950/60 border-t border-white/10 flex items-center justify-between">
            <div className="text-[11px] text-zinc-500">
              Also reachable via{' '}
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-blue-400 underline">
                LinkedIn
              </a>
            </div>

            <button
              type="submit"
              className="flex items-center space-x-1.5 px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white shadow-md transition-all active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Email</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
