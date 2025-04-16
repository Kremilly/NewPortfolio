
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface CompoundLinkProps {
  name: string;
  href: string;
  icon?: string;
  className?: string;
}

export function CompoundLink({ name, href, icon, className }: CompoundLinkProps) {
  return (
    <a 
      href={href}
      className={cn(
        "flex items-center gap-2 p-2 rounded transition-colors hover:bg-secondary group",
        className
      )}
    >
      <div className="w-6 h-6 bg-secondary rounded flex items-center justify-center text-xs">
        {icon || "⚗️"}
      </div>
      <span className="text-muted-foreground group-hover:text-foreground transition-colors">
        {name}
      </span>
      <ArrowUpRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
  );
}
