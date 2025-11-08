import { ExternalLink, Code, Waves, Terminal, Star } from "lucide-react";
import { Lambda } from "./Lambda";
import { useEffect, useRef, useState } from "react";

interface ProjectCardProps {
  title: string;
  logoType?: 'lambda' | 'code' | 'terminal' | 'waves' | 'external';
  tags?: string[];
  languages?: string[];
  stars?: number,
  forks?: number;
  description: string;
  readMoreUrl?: string;
  home: string;
  index?: number;
}

export function ProjectCard({ title, logoType, tags, languages, stars, forks, description, readMoreUrl, home, index = 0 }: ProjectCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, index * 150);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [index]);

  const renderIcon = () => {
    switch (logoType) {
      case 'lambda':
        return <Lambda className="text-primary" />;
      case 'code':
        return <Code className="text-primary" />;
      case 'terminal':
        return <Terminal className="text-primary" />;
      case 'waves':
        return <Waves className="text-primary" />;
      case 'external':
        return <ExternalLink className="text-primary" />;
      default:
        return <Lambda className="text-primary" />;
    }
  };

  return (
    <div 
      ref={cardRef}
      className={`project-card group relative overflow-hidden transition-all duration-700 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/20 blur-3xl group-hover:bg-primary/30 transition-all duration-500" />
      <div className="absolute -left-16 -bottom-16 h-40 w-40 rounded-full bg-accent/10 blur-3xl group-hover:bg-accent/20 transition-all duration-500" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="flex items-start gap-5 mb-4">
          <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl border border-primary/30 group-hover:border-primary/60 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
            {renderIcon()}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">{title}</h3>

            <div className="flex flex-wrap gap-2 mt-3 mb-3">
              <span className="text-xs bg-gradient-to-r from-primary/20 to-primary/10 text-primary px-3 py-1.5 rounded-full border border-primary/20 font-medium flex items-center gap-1">
                <Star className="w-3 h-3" /> {stars}
              </span>
              <span className="text-xs bg-gradient-to-r from-primary/20 to-primary/10 text-primary px-3 py-1.5 rounded-full border border-primary/20 font-medium">
                {forks} forks
              </span>

              {languages && languages.map((language, index) => (
                <span key={index} className="text-xs bg-gradient-to-r from-accent/20 to-accent/10 text-accent px-3 py-1.5 rounded-full border border-accent/20 font-medium">
                  {language}
                </span>
              ))}
            </div>

            <p className="text-sm text-muted-foreground mt-2 whitespace-pre-line">{description}</p>
          </div>
        </div>

        {tags && (
          <div className="flex flex-wrap gap-2 mt-4 justify-end">
            {tags.map((tag, index) => (
              <span key={index} className="text-xs text-primary bg-gradient-to-r from-primary/15 to-primary/5 px-3 py-1.5 rounded-full border border-primary/20 font-medium hover:border-primary/40 transition-colors duration-300">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-4 mt-5 pt-4 border-t border-border/50">
          {readMoreUrl && (
            <a 
              href={readMoreUrl} 
              className="link-with-arrow text-sm"
            >
              View on GitHub
            </a>
          )}

          {home && (
            <a 
              href={home} 
              className="link-with-arrow text-sm"
            >
              Homepage
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
