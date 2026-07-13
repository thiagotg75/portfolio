import { Github, Linkedin, Mail, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-secondary">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-mono font-bold text-text-primary mb-1">
              dev<span className="text-accent-purple">.</span>portfolio
            </p>
            <p className="text-sm text-text-muted">
              Construído com Next.js, TypeScript & Tailwind CSS
            </p>
          </div>

          <div className="flex items-center gap-4">
            {[
              {
                icon: Github,
                href: "https://github.com/seuusername",
                label: "GitHub",
              },
              {
                icon: Linkedin,
                href: "https://linkedin.com/in/seuusername",
                label: "LinkedIn",
              },
              {
                icon: Mail,
                href: "mailto:seu@email.com",
                label: "Email",
              },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-text-secondary hover:text-accent-purple hover:border-accent-purple transition-all duration-200"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-sm text-text-muted flex items-center justify-center gap-1">
            Feito com{" "}
            <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" /> por{" "}
            <span className="text-accent-purple font-medium">Seu Nome</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
