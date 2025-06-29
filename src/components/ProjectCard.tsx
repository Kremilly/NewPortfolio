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
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
      <div className="absolute -left-12 -bottom-12 h-32 w-32 rounded-full bg-primary/5 blur-2xl" />
      
      <div className="relative z-10">
        <div className="flex items-start gap-4 mb-3">
          <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-secondary rounded-lg border border-primary/20">
            {renderIcon()}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white">{title}</h3>

            <div className="relative inline-block mt-2 mb-2">
              <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full mr-2">
                {stars} stars
              </span>
              <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full mr-2">{forks} forks</span>

              <span className="text-xs mr-2"> </span>

              {languages && languages.map((language, index) => (
                <span key={index} className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full mr-2">
                  {language}
                </span>
              ))}
            </div>

            <p className="text-sm text-muted-foreground mt-2 whitespace-pre-line">{description}</p>
          </div>
        </div>

        {tags && (
          <div className="flex flex-wrap gap-2 mt-3 justify-end">
            {tags.map((tag, index) => (
              <span key={index} className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}

        {readMoreUrl && (
          <a 
            href={readMoreUrl} 
            className="link-with-arrow mt-3 text-sm group-hover:text-primary transition-colors"
          >
            View on GitHub
          </a>
        )}

        {home && (
            <a 
              href={home} 
              className="ml-3 link-with-arrow mt-3 text-sm group-hover:text-primary transition-colors"
            >
              Homepage
            </a>
          )}
      </div>
    </div>
  );
}
