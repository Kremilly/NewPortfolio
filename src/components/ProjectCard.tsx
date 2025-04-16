
import { ExternalLink, Code, Waves, Terminal } from "lucide-react";
import { Lambda } from "./Lambda";

interface ProjectCardProps {
  title: string;
  logoType?: 'lambda' | 'code' | 'terminal' | 'waves';
  description: string;
  readMoreUrl?: string;
}

export function ProjectCard({ title, logoType, description, readMoreUrl }: ProjectCardProps) {
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
      default:
        return <Lambda className="text-primary" />;
    }
  };

  return (
    <div className="project-card group">
      <div className="flex items-start gap-4 mb-3">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-secondary rounded">
          {renderIcon()}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-sm text-muted-foreground mt-2 whitespace-pre-line">{description}</p>
        </div>
      </div>
      
      {readMoreUrl && (
        <a href={readMoreUrl} className="link-with-arrow mt-3 text-sm">
          Read more
        </a>
      )}
    </div>
  );
}
