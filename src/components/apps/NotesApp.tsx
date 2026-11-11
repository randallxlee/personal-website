import { useState } from 'react';
import { User, Sparkles, Briefcase, MapPin, Mail, Award, Compass, GraduationCap } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/Icons';
import { PERSONAL_INFO, EXPERIENCES, EDUCATION, SKILL_CATEGORIES, OUTSIDE_OF_WORK } from '../../data/portfolioData';

type NoteId = 'bio' | 'skills' | 'experience' | 'education' | 'outside';

export const NotesApp = ({ compact = false }: { compact?: boolean }) => {
  const [activeNote, setActiveNote] = useState<NoteId>('bio');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(!compact);

  const noteItems: Array<{ id: NoteId; label: string; icon: React.ReactNode }> = [
    { id: 'bio', label: 'About Me', icon: <User className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'education', label: 'Education', icon: <GraduationCap className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'skills', label: 'Skills & Stack', icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'outside', label: 'Outside of Work', icon: <Compass className="w-3.5 h-3.5 text-amber-400" /> },
  ];

  return (
    <div className={`flex h-full w-full bg-zinc-900/90 text-zinc-100 select-text overflow-hidden ${compact ? 'flex-col' : 'md:flex-row'}`}>
      {/* Sidebar Folders */}
      <div className={`${compact ? 'w-full border-b border-white/10' : 'md:w-48 md:border-r'} shrink-0 bg-zinc-950/60 border-white/10 p-2 flex flex-col justify-between select-none`}>
        <div>
          <div className="text-[11px] font-semibold text-white/40 uppercase tracking-wider px-2 py-1.5">
            Quick Notes
          </div>

          {compact ? (
            <div className="mt-1 rounded-xl border border-white/10 bg-white/5 overflow-hidden">
              <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="w-full flex items-center justify-between px-3 py-2 text-left text-xs font-medium text-zinc-100"
              >
                <span className="flex items-center gap-2">
                  {noteItems.find((item) => item.id === activeNote)?.icon}
                  <span>{noteItems.find((item) => item.id === activeNote)?.label}</span>
                </span>
                <span className="text-zinc-400">{isMenuOpen ? '−' : '+'}</span>
              </button>

              {isMenuOpen && (
                <nav className="border-t border-white/10 bg-zinc-950/30 p-1.5 space-y-0.5">
                  {noteItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveNote(item.id);
                        setIsMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left ${
                        activeNote === item.id
                          ? 'bg-amber-500/20 text-amber-300 font-semibold'
                          : 'text-zinc-300 hover:bg-white/5'
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  ))}
                </nav>
              )}
            </div>
          ) : (
            <nav className="space-y-0.5 mt-1">
              {noteItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveNote(item.id)}
                  className={`w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left ${
                    activeNote === item.id
                      ? 'bg-amber-500/20 text-amber-300 font-semibold'
                      : 'text-zinc-300 hover:bg-white/5'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          )}
        </div>

        {/* Note count footer */}
        <div className="text-[10px] text-zinc-500 px-2 py-1 text-center border-t border-white/5">
          5 Notes Available
        </div>
      </div>

      {/* Note Content Area */}
      <div className={`flex-1 overflow-y-auto bg-zinc-900/40 ${compact ? 'p-4' : 'p-6 md:p-8'}`}>
        {activeNote === 'bio' && (
          <div className={`${compact ? 'max-w-none' : 'max-w-xl'} space-y-4`}>
            <div className="border-b border-white/10 pb-3">
              <div className={`flex items-start justify-between gap-4 ${compact ? 'flex-col' : ''}`}>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-white mb-1">
                    {PERSONAL_INFO.name}
                  </h1>
                  <p className="text-sm text-amber-400 font-medium">{PERSONAL_INFO.title}</p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-400 mt-2">
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-red-400" />
                      <span>{PERSONAL_INFO.location}</span>
                    </span>
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center space-x-1 hover:text-white transition-colors">
                      <Mail className="w-3.5 h-3.5 text-blue-400" />
                      <span>{PERSONAL_INFO.email}</span>
                    </a>
                    {PERSONAL_INFO.github && (
                      <a
                        href={PERSONAL_INFO.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center space-x-1 hover:text-white transition-colors"
                      >
                        <GithubIcon className="w-3.5 h-3.5 text-zinc-300" />
                        <span>GitHub</span>
                      </a>
                    )}
                    {PERSONAL_INFO.linkedin && (
                      <a
                        href={PERSONAL_INFO.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center space-x-1 hover:text-white transition-colors"
                      >
                        <LinkedinIcon className="w-3.5 h-3.5 text-blue-400" />
                        <span>LinkedIn</span>
                      </a>
                    )}
                  </div>
                </div>

                {PERSONAL_INFO.profileImage && (
                  <img
                    src={PERSONAL_INFO.profileImage}
                    alt={PERSONAL_INFO.name}
                    className={`${compact ? 'h-16 w-16' : 'h-20 w-20'} rounded-full object-cover border border-white/10 bg-zinc-800 shadow-lg`}
                  />
                )}
              </div>
            </div>

            <div className="text-sm text-zinc-300 leading-relaxed space-y-3">
              {PERSONAL_INFO.bio.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            <div className="pt-2">
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 flex items-start space-x-2.5">
                <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Tip: Double-click desktop icons or use the bottom Dock to explore my projects in
                  <strong> Finder</strong> or run custom commands in <strong>Terminal</strong>!
                </span>
              </div>
            </div>
          </div>
        )}

        {activeNote === 'skills' && (
          <div className={`${compact ? 'max-w-none' : 'max-w-xl'} space-y-5`}>
            <div className="border-b border-white/10 pb-3">
              <h2 className="text-xl font-bold text-white mb-1">Skills & Technical Stack</h2>
              <p className="text-xs text-zinc-400">Core technologies and tools I work with daily.</p>
            </div>

            <div className="space-y-4">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.category} className="space-y-2">
                  <h3 className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                    {cat.category}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/15 text-xs text-zinc-200 border border-white/5 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeNote === 'experience' && (
          <div className={`${compact ? 'max-w-none' : 'max-w-xl'} space-y-5`}>
            <div className="border-b border-white/10 pb-3">
              <h2 className="text-xl font-bold text-white mb-1">Career Journey</h2>
              <p className="text-xs text-zinc-400">Previous roles and key milestones.</p>
            </div>

            <div className="space-y-6">
              {EXPERIENCES.map((exp) => (
                <div key={exp.company} className="relative pl-5 border-l border-amber-500/30 space-y-1.5">
                  <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-amber-400" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">{exp.role}</span>
                    <span className="text-xs text-amber-400/90 font-mono">{exp.period}</span>
                  </div>
                  <div className="text-xs text-zinc-400 font-medium">
                    {exp.company} • {exp.location}
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-zinc-300 mt-2">
                    {exp.description.map((bullet, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeNote === 'education' && (
          <div className={`${compact ? 'max-w-none' : 'max-w-xl'} space-y-5`}>
            <div className="border-b border-white/10 pb-3">
              <h2 className="text-xl font-bold text-white mb-1">Education</h2>
              <p className="text-xs text-zinc-400">Academic background and credentials.</p>
            </div>

            <div className="space-y-4">
              {EDUCATION.map((edu) => (
                <div key={`${edu.degree}-${edu.institution}`} className="rounded-xl border border-white/10 bg-white/5 p-3.5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-white">{edu.degree}</span>
                    <span className="text-[11px] text-amber-400/90 font-mono">{edu.period}</span>
                  </div>
                  <div className="mt-1 text-xs text-zinc-400">
                    {edu.institution} • {edu.location}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeNote === 'outside' && (
          <div className={`${compact ? 'max-w-none' : 'max-w-xl'} space-y-4`}>
            <div className="border-b border-white/10 pb-3">
              <h2 className="text-xl font-bold text-white mb-1">Outside of Work</h2>
              <p className="text-xs text-zinc-400">Passions, adventures, and life beyond the keyboard.</p>
            </div>

            <div className="space-y-4 text-sm text-zinc-300 leading-relaxed">
              {OUTSIDE_OF_WORK.map((item) => (
                <div key={item.title} className="overflow-hidden rounded-xl bg-white/5 border border-white/10">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="block max-w-full h-auto border-b border-white/10"
                    />
                  )}
                  <div className="p-3.5">
                    <h3 className="text-xs font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
