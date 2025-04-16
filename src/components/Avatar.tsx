
import { cn } from "@/lib/utils";

interface AvatarProps {
  src: string;
  alt: string;
  className?: string;
}

export function Avatar({ src, alt, className }: AvatarProps) {
  return (
    <div 
      className={cn(
        "overflow-hidden rounded-md border-2 border-muted bg-secondary flex-shrink-0", 
        className
      )}
    >
      <img 
        src={src} 
        alt={alt} 
        className="object-cover w-full h-full aspect-square" 
      />
    </div>
  );
}
