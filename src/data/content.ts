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
  likes: string;
  year: string;
  thumbnail?: string;
  color: string;
  description?: string;
  videoUrl?: string;
}

interface ProjectsFile {
  projects: Project[];
}

export const site: SiteContent = siteData as SiteContent;
export const projects: Project[] = (projectsData as ProjectsFile).projects;

export const workStatLine = `${site.stats.videos} videos · ${site.stats.views} views · ${site.stats.likes} likes · ${site.workTagline}`;