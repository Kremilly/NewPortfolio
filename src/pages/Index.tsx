
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
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto max-w-4xl px-4 py-16 relative z-10">
        {/* Header/Profile Section */}
        <div className="profile-section relative">
          <div className="absolute -z-10 top-0 right-0 w-full h-full">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 800 400"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-5"
            >
              <path
                d="M0,192L48,170.7C96,149,192,107,288,112C384,117,480,171,576,197.3C672,224,768,224,864,197.3C960,171,1056,117,1152,117.3C1248,117,1344,171,1392,197.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                fill="hsl(var(--primary) / 0.2)"
              ></path>
            </svg>
          </div>
          <Avatar 
            src="/lovable-uploads/179624b5-c391-414e-a999-973b8cf14274.png" 
            alt="Profile picture" 
            className="w-60 h-60 border-4 border-secondary/30"
          />
          <div className="space-y-4">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              Hi, I&apos;m Gabi! <span className="text-2xl animate-wave">👋</span>
            </h1>
            <div className="relative inline-block mb-2">
              <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full">
                Software Engineer
              </span>
            </div>
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
        <div className="mb-16 relative">
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
        <div className="relative">
          <div className="absolute -z-10 bottom-0 left-0 w-full h-full opacity-10">
            <svg
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <path
                fill="hsl(var(--primary))"
                d="M41.3,-69.7C53.6,-63.3,63.8,-52.3,70.1,-39.3C76.4,-26.3,78.8,-11.3,77.2,3C75.7,17.3,70.2,30.9,61.7,42.3C53.2,53.7,41.6,62.9,28.7,67.8C15.8,72.8,1.6,73.5,-12.4,71.3C-26.5,69.2,-40.3,64.2,-51.6,55.4C-63,46.6,-71.8,34,-75.8,19.8C-79.9,5.7,-79.1,-10,-73.7,-23.1C-68.3,-36.3,-58.2,-46.8,-46.1,-53.1C-34,-59.5,-19.9,-61.7,-4.9,-64.3C10.1,-66.9,29,-76,41.3,-69.7Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>
          
          <h2 className="section-title">
            Meet the other compounds! <span className="text-primary ml-2">🧪</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <CompoundLink 
              name="aripiprazole" 
              href="#aripiprazole" 
              icon="🧠"
              className="backdrop-blur-sm bg-secondary/30 hover:bg-secondary/50"
            />
            <CompoundLink 
              name="atomoxetine" 
              href="#atomoxetine" 
              icon="⚛️"
              className="backdrop-blur-sm bg-secondary/30 hover:bg-secondary/50"
            />
            <CompoundLink 
              name="oestradiol" 
              href="#oestradiol" 
              icon="🌈"
              className="backdrop-blur-sm bg-secondary/30 hover:bg-secondary/50"
            />
            <CompoundLink 
              name="paroxetine" 
              href="#paroxetine" 
              icon="🧬"
              className="backdrop-blur-sm bg-secondary/30 hover:bg-secondary/50"
            />
          </div>
        </div>
        
        {/* Footer */}
        <footer className="mt-20 pt-6 border-t border-muted text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Gabrielle • Software Engineer • Compiler Enthusiast</p>
          <div className="mt-2 text-xs opacity-60">
            <span className="inline-block px-2">Kotlin</span>•
            <span className="inline-block px-2">Compilers</span>•
            <span className="inline-block px-2">Type Theory</span>•
            <span className="inline-block px-2">Minecraft</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
