
import { ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  logo?: React.ReactNode;
  description: string;
  readMoreUrl?: string;
}

export function ProjectCard({ title, logo, description, readMoreUrl }: ProjectCardProps) {
  return (
    <div className="project-card group">
      <div className="flex items-start gap-4 mb-3">
        {logo && (
          <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-secondary rounded">
            {logo}
          </div>
        )}
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
