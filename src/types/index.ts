export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  github_url: string;
  live_url?: string;
  featured: boolean;
  image_url?: string;
  created_at: string;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number;
  icon?: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
