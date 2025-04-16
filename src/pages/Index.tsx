
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Avatar } from "@/components/Avatar";
import { ProjectCard } from "@/components/ProjectCard";
import { CompoundLink } from "@/components/CompoundLink";
import { Code, Waves, Terminal } from "lucide-react";
import { fetchProjects } from "@/services/projectService";
import { Project } from "@/types/project";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects
  });

  // Componente para mostrar durante o carregamento
  const ProjectSkeleton = () => (
    <div className="flex items-start gap-4 mb-6">
      <Skeleton className="h-10 w-10 rounded" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto max-w-4xl px-4 py-16">
        {/* Header/Profile Section */}
        <div className="profile-section">
          <Avatar 
            src="/lovable-uploads/179624b5-c391-414e-a999-973b8cf14274.png" 
            alt="Profile picture" 
            className="w-60 h-60"
          />
          <div className="space-y-4">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              Hi, I&apos;m Gabi! <span className="text-2xl animate-wave">👋</span>
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              My name is Gabrielle and I am a 19-year-old software engineer with a 
              passion for functional programming and the Kotlin programming language.
              In my free time, I enjoy playing Minecraft and working on projects
              related to compilers. I am excited to share my skills and experience
              with others in the field.
            </p>
          </div>
        </div>

        {/* Projects Section */}
        <div className="mb-16">
          <h2 className="section-title">
            My projects <span className="text-primary ml-2">🖋️</span>
          </h2>
          
          <p className="mb-6 text-muted-foreground">
            I&apos;m passionate about compilers, type theory, the Minecraft protocol,
            and <span className="text-primary font-medium">Hindley Milner!</span> These topics perfectly blend my love for
            programming and problem-solving. Compilers transform code into machine
            code, while Hindley Milner adds elegance and safety to the process.
            Tinkering with the Minecraft protocol to optimize and customize
            gameplay is a joy. I love pushing the boundaries of programming and
            seeking new challenges!
          </p>

          <div className="space-y-6">
            {isLoading && (
              <>
                <ProjectSkeleton />
                <ProjectSkeleton />
                <ProjectSkeleton />
              </>
            )}
            
            {error && (
              <div className="p-4 bg-red-900/20 border border-red-900 rounded text-red-400">
                Error loading projects. Please try again later.
              </div>
            )}
            
            {projects && projects.map((project) => (
              <ProjectCard 
                key={project.id}
                title={project.title}
                logoType={project.logoType}
                description={project.description}
                readMoreUrl={project.readMoreUrl}
              />
            ))}
          </div>
        </div>
        
        {/* Meet the other compounds section */}
        <div>
          <h2 className="section-title">
            Meet the other compounds! <span className="text-primary ml-2">🧪</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <CompoundLink 
              name="aripiprazole" 
              href="#aripiprazole" 
              icon="🧠"
            />
            <CompoundLink 
              name="atomoxetine" 
              href="#atomoxetine" 
              icon="⚛️"
            />
            <CompoundLink 
              name="oestradiol" 
              href="#oestradiol" 
              icon="🌈"
            />
            <CompoundLink 
              name="paroxetine" 
              href="#paroxetine" 
              icon="🧬"
            />
          </div>
        </div>
        
        {/* Footer */}
        <footer className="mt-20 pt-6 border-t border-muted text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Gabrielle • Software Engineer • Compiler Enthusiast</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
