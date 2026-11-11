import { useState } from 'react';
import {
  Folder,
  LayoutGrid,
  List,
  Search,
  ExternalLink,
  CheckCircle2,
  FolderGit2,
} from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import { PROJECTS } from '../../data/portfolioData';
import { Project } from '../../types';

export const FinderApp = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', 'Frontend', 'Full Stack', 'AI / Systems'];

  const filteredProjects = PROJECTS.filter((proj) => {
    const matchesCategory = activeCategory === 'All' || proj.category === activeCategory;
    const matchesSearch =
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full w-full bg-zinc-900/95 text-zinc-100 overflow-hidden select-text">
      {/* Finder Toolbar */}
      <div className="h-10 shrink-0 bg-zinc-950/70 border-b border-white/10 px-3 flex items-center justify-between select-none">
        {/* View Toggle */}
        <div className="flex items-center space-x-1 bg-white/5 rounded-lg p-0.5 border border-white/10">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1 rounded ${
              viewMode === 'grid' ? 'bg-white/15 text-white' : 'text-zinc-400 hover:text-white'
            }`}
            title="Grid View"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1 rounded ${
              viewMode === 'list' ? 'bg-white/15 text-white' : 'text-zinc-400 hover:text-white'
            }`}
            title="List View"
          >
            <List className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Path Indicator */}
        <div className="hidden sm:flex items-center space-x-1.5 text-xs text-zinc-400">
          <Folder className="w-3.5 h-3.5 text-blue-400" />
          <span>Macintosh HD</span>
          <span>›</span>
          <span className="text-white font-medium">{activeCategory} Projects</span>
        </div>

        {/* Search Bar */}
        <div className="relative w-44 sm:w-56">
          <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-7 pr-3 py-1 bg-white/5 hover:bg-white/10 focus:bg-white/10 text-xs rounded-lg border border-white/10 text-white placeholder-zinc-500 focus:outline-hidden focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Finder Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-44 shrink-0 bg-zinc-950/50 border-r border-white/10 p-2.5 flex flex-col justify-between select-none">
          <div className="space-y-4">
            <div>
              <div className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider px-2 mb-1">
                Categories
              </div>
              <div className="space-y-0.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left ${
                      activeCategory === cat
                        ? 'bg-blue-600/25 text-blue-300 font-semibold'
                        : 'text-zinc-300 hover:bg-white/5'
                    }`}
                  >
                    <Folder className={`w-3.5 h-3.5 ${activeCategory === cat ? 'text-blue-400' : 'text-blue-500/70'}`} />
                    <span>{cat}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider px-2 mb-1">
                Tags
              </div>
              <div className="flex flex-wrap gap-1 px-1">
                {['React', 'TypeScript', 'Python', 'Go'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="text-[10px] text-zinc-500 text-center py-1">
            {filteredProjects.length} {filteredProjects.length === 1 ? 'item' : 'items'}
          </div>
        </div>

        {/* Project Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-zinc-900/30">
          {filteredProjects.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-400">
              <FolderGit2 className="w-12 h-12 text-zinc-600 mb-2" />
              <p className="text-sm font-medium text-zinc-300">No projects found</p>
              <p className="text-xs text-zinc-500 mt-1">Try tweaking your search or filter</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProjects.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => setSelectedProject(proj)}
                  className="group rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/40 p-4 transition-all duration-200 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Project Header Gradient Banner */}
                    <div
                      className={`h-24 rounded-lg bg-gradient-to-tr ${proj.imageGradient} p-3 flex flex-col justify-between mb-3 shadow-md group-hover:scale-[1.01] transition-transform`}
                    >
                      <span className="self-end px-2 py-0.5 rounded-md bg-black/40 backdrop-blur-md text-[10px] font-semibold text-white">
                        {proj.category}
                      </span>
                      <h3 className="text-base font-bold text-white drop-shadow-sm">{proj.title}</h3>
                    </div>

                    <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed mb-3">
                      {proj.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {proj.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-zinc-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(proj);
                      }}
                      className="text-xs text-blue-400 hover:text-blue-300 font-medium"
                    >
                      View Details →
                    </button>

                    <div className="flex items-center space-x-2">
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1 rounded text-zinc-400 hover:text-white transition-colors"
                          title="Source Code"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1 rounded text-zinc-400 hover:text-white transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="divide-y divide-white/5">
              {filteredProjects.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => setSelectedProject(proj)}
                  className="py-2.5 px-3 rounded-lg hover:bg-white/5 flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-tr ${proj.imageGradient}`} />
                    <div>
                      <h4 className="text-xs font-semibold text-white">{proj.title}</h4>
                      <p className="text-[11px] text-zinc-400 line-clamp-1">{proj.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="text-[10px] text-zinc-400 font-mono hidden md:inline">
                      {proj.category}
                    </span>
                    <button className="text-xs text-blue-400 hover:text-blue-300">Details</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Project Details Modal Drawer */}
      {selectedProject && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-2xl bg-zinc-900 border border-white/20 p-6 shadow-2xl text-white space-y-4 animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs text-blue-400 font-semibold">{selectedProject.category}</span>
                <h2 className="text-xl font-bold text-white">{selectedProject.title}</h2>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-zinc-400 hover:text-white text-xs px-2 py-1 rounded bg-white/10"
              >
                Close
              </button>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed">{selectedProject.description}</p>

            {/* Highlights */}
            <div className="space-y-1.5 pt-1">
              <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                Key Highlights
              </h4>
              <div className="space-y-1">
                {selectedProject.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs text-zinc-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="space-y-1.5 pt-1">
              <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-md bg-white/10 text-zinc-200 border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex items-center space-x-3 pt-3 border-t border-white/10">
              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-medium text-white flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Launch Live Demo</span>
                </a>
              )}
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2 px-4 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-medium text-white flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
