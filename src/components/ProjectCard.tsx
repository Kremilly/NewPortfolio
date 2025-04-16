
import { ExternalLink, Code, Waves, Terminal } from "lucide-react";
import { Lambda } from "./Lambda";

interface ProjectCardProps {
  title: string;
  logoType?: 'lambda' | 'code' | 'terminal' | 'waves' | 'external';
  tags?: string[];
  stars?: number,
  description: string;
  readMoreUrl?: string;
}

export function ProjectCard({ title, logoType, tags, stars, description, readMoreUrl }: ProjectCardProps) {
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
    <div className="project-card group relative overflow-hidden">
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
      <div className="absolute -left-12 -bottom-12 h-32 w-32 rounded-full bg-primary/5 blur-2xl" />
      
      <div className="relative z-10">
        <div className="flex items-start gap-4 mb-3">
          <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-secondary rounded-lg border border-primary/20">
            {renderIcon()}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white">{title}</h3>

            {stars && (
              <div className="relative inline-block mt-2 mb-2">
                <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full mr-2">{stars} stars</span>
              </div>
            )}

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
            View on GitHub {stars}
          </a>
        )}
      </div>
    </div>
  );
}
