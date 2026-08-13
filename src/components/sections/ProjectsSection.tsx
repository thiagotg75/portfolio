"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, Star } from "lucide-react";
import { API_URL } from "@/lib/utils";
import type { Project } from "@/types";

const FALLBACK_PROJECTS: Project[] = [
  {
    id: 1,
    title: "E-Commerce Full-Stack",
    description: "Plataforma de e-commerce completa com carrinho, pagamentos Stripe e painel admin. Frontend em Next.js 14 com App Router, backend em FastAPI com PostgreSQL.",
    tech: ["Next.js", "FastAPI", "PostgreSQL", "Stripe", "Docker"],
    github_url: "https://github.com/thiagotg75/ecommerce.git",
    live_url: "https://github.com/thiagotg75/ecommerce.git",
    featured: true,
    created_at: "2024-01-01",
  },
  {
    id: 2,
    title: "Task Manager com IA",
    description: "Gerenciador de tarefas inteligente que usa IA para priorizar e sugerir prazos. Integração com OpenAI API e sistema de notificações em tempo real.",
    tech: ["React", "Python", "OpenAI", "WebSockets", "Redis"],
    github_url: "https://github.com/thiagotg75/Task-manege-AI.git",
    featured: true,
    created_at: "2026-08-13",
  },
  {
    id: 3,
    title: "Dashboard Analytics",
    description: "Dashboard de analytics em tempo real com gráficos interativos, filtros avançados e exportação de relatórios em PDF.",
    tech: ["Next.js", "TypeScript", "Recharts", "FastAPI"],
    github_url: "https://github.com/thiagotg75/Dashboard-Analytics.git",
    live_url: "https://dashboard-demo.vercel.app",
    featured: false,
    created_at: "2024-03-01",
  },
  {
    id: 4,
    title: "API de Autenticação",
    description: "Sistema completo de autenticação com JWT, OAuth2 (Google/GitHub), 2FA, refresh tokens e documentação Swagger automática.",
    tech: ["FastAPI", "SQLAlchemy", "PostgreSQL", "JWT"],
    github_url: "https://github.com/seuusername/auth-api",
    featured: false,
    created_at: "2024-04-01",
  },
  {
    id: 5,
    title: "Chat em Tempo Real",
    description: "Aplicação de chat com WebSockets, salas privadas, emojis, upload de arquivos e histórico persistido no banco de dados.",
    tech: ["React", "Socket.io", "Node.js", "MongoDB"],
    github_url: "https://github.com/seuusername/realtime-chat",
    featured: false,
    created_at: "2024-05-01",
  },
  {
    id: 6,
    title: "CLI Dev Tools",
    description: "Conjunto de ferramentas de linha de comando para automação de workflows de desenvolvimento: scaffolding, deploy, e gestão de ambientes.",
    tech: ["Python", "Click", "Docker", "Bash"],
    github_url: "https://github.com/seuusername/dev-cli",
    featured: false,
    created_at: "2024-06-01",
  },
];

const TECH_COLORS: Record<string, string> = {
  "Next.js": "bg-white/10 text-white",
  React: "bg-blue-500/20 text-blue-300",
  TypeScript: "bg-blue-600/20 text-blue-400",
  Python: "bg-yellow-500/20 text-yellow-300",
  FastAPI: "bg-green-500/20 text-green-300",
  PostgreSQL: "bg-cyan-500/20 text-cyan-300",
  Docker: "bg-sky-500/20 text-sky-300",
  Redis: "bg-red-500/20 text-red-300",
  "Node.js": "bg-green-600/20 text-green-400",
};

function ProjectCard({ project, featured }: { project: Project; featured?: boolean }) {
  return (
    <div
      className={`group rounded-xl border border-border bg-bg-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-accent-purple/30 hover:shadow-lg hover:shadow-accent-purple/10 ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            {featured && (
              <span className="px-2 py-0.5 rounded-md bg-accent-purple/20 text-accent-purple-light text-xs font-mono flex items-center gap-1">
                <Star className="w-3 h-3" />
                destaque
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-text-secondary hover:text-accent-cyan hover:border-accent-cyan/50 transition-all duration-200"
                aria-label="Ver demo"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-text-secondary hover:text-accent-purple hover:border-accent-purple/50 transition-all duration-200"
              aria-label="Ver código"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-accent-purple-light transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className={`px-2 py-1 rounded-md text-xs font-mono ${
                TECH_COLORS[tech] || "bg-border text-text-muted"
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "featured">("all");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_URL}/api/projects`);
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
        } else {
          setProjects(FALLBACK_PROJECTS);
        }
      } catch {
        setProjects(FALLBACK_PROJECTS);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".animate-on-scroll").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const filtered =
    filter === "featured" ? projects.filter((p) => p.featured) : projects;

  return (
    <section id="projects" ref={ref} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="animate-on-scroll mb-8">
          <span className="font-mono text-accent-cyan text-sm">// projetos</span>
          <h2 className="text-4xl font-bold mt-2">
            Meus <span className="text-gradient">Trabalhos Publicos</span>
          </h2>
        </div>

        <div className="animate-on-scroll flex items-center gap-2 mb-10">
          {(["all", "featured"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                filter === f
                  ? "bg-accent-purple text-white"
                  : "border border-border text-text-secondary hover:text-text-primary hover:border-accent-purple/30"
              }`}
            >
              {f === "all" ? "Todos" : "Destaques"}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-64 rounded-xl bg-bg-card border border-border animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                featured={project.featured && filter === "featured"}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
