export type AppId = 'finder' | 'notes' | 'preview' | 'terminal' | 'mail' | 'settings' | 'photos';

export interface WindowPosition {
  x: number;
  y: number;
}

export interface WindowSize {
  width: number;
  height: number;
}

export interface WindowState {
  id: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: WindowPosition;
  size: WindowSize;
  minSize?: WindowSize;
}

export interface AppMetadata {
  id: AppId;
  name: string;
  icon: string;
  defaultTitle: string;
  defaultSize: WindowSize;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'Full Stack' | 'Frontend' | 'AI / Systems' | 'Mobile';
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  highlights: string[];
  imageGradient?: string;
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string[];
  skills: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location?: string;
  period: string;
  honors?: string;
}

export interface OutsideWorkItem {
  title: string;
  description: string;
  image?: string;
}

export type PhilosophyItem = OutsideWorkItem;

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface PhotoItem {
  id: string;
  url: string;
  title: string;
  caption: string;
  album?: string;
  location: string;
  date: string;
  favorite?: boolean;
}
