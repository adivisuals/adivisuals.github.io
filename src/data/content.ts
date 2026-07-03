import siteData from "@/content/site.json";
import projectsData from "@/content/projects.json";

export interface SiteStats {
  videos: string;
  views: string;
  likes: string;
}

export interface SocialLinks {
  youtube: string;
  instagram: string;
  x: string;
}

export interface ContactInfo {
  email: string;
  availability: boolean;
}

export interface SiteContent {
  stats: SiteStats;
  workTagline: string;
  heroTagline: string;
  social: SocialLinks;
  contact: ContactInfo;
}

export interface Project {
  title: string;
  category: string;
  style: string;
  duration: string;
  views: string;
  year: string;
  /** Hex color used for the thumbnail gradient, e.g. #1a1206 */
  color: string;
  /** Optional link to the actual video (YouTube, etc.). Empty = no link. */
  videoUrl?: string;
}

interface ProjectsFile {
  projects: Project[];
}

/**
 * Single source of truth for editable site content.
 * These JSON files are managed through the Decap CMS admin panel (/admin)
 * and are bundled into the app at build time.
 */
export const site: SiteContent = siteData as SiteContent;
export const projects: Project[] = (projectsData as ProjectsFile).projects;

/** Work-page stat line, e.g. "7 videos · 52.77K views · Always giving 100%" */
export const workStatLine = `${site.stats.videos} videos · ${site.stats.views} views · ${site.workTagline}`;
