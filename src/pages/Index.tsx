
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Avatar } from "@/components/Avatar";
import { ProjectCard } from "@/components/ProjectCard";
import { Code, Waves, Terminal, Github, Rss, BookText } from "lucide-react";
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

  const [searchQuery, setSearchQuery] = useState<string>('');

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
            src="https://avatars.githubusercontent.com/u/24691979?v=4" 
            alt="Profile picture" 
            className="w-60 h-60 border-4 border-secondary/30 border-opacity-50 rounded-full mb-4"
          />
          <div className="space-y-4">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              Hi, I&apos;m <span className="text-primary">Kremilly</span>! <span className="text-2xl animate-wave">👋</span>
            </h1>

            <div className="relative inline-block mb-2">
              <span className="text-sm bg-primary/20 text-primary px-3 py-1 rounded-full mr-2">Software Engineer</span>
              <span className="text-sm bg-primary/20 text-primary px-3 py-1 rounded-full">Low Level Engineer</span>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              I am a <span className="text-primary font-medium">software engineer</span> with a passion for building innovative solutions. I have experience in various programming languages and frameworks, and I love tackling complex challenges. I am always eager to learn new technologies and improve my skills.
            </p>

            <div className="flex items-center gap-4 mt-4">
              <a
                href="https://github.com/Kremilly"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary font-medium hover:text-primary/80"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="https://blog.kremilly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary font-medium hover:text-primary/80"
              >
                <Rss className="w-4 h-4" />
                Blog
              </a>
              <a
                href="https://docs.kremilly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary font-medium hover:text-primary/80"
              >
                <BookText className="w-4 h-4" />
                Docs
              </a>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="mb-16 relative">
          <h2 className="section-title">
            My projects <span className="text-primary ml-2">🖋️</span>
          </h2>
          
          <p className="mb-6 text-muted-foreground">
            I'm a backend developer with experience building high‑performance, scalable, and secure systems using <span className="text-primary font-medium">Rust</span>, <span className="text-primary font-medium">Python</span>, and <span className="text-primary font-medium">Go</span>. I have a strong understanding of concepts such as concurrency, performance optimization, and robust API design. I have experience with containerization technologies like <span className="text-primary font-medium">Docker</span>. I am passionate about writing clean, maintainable code and following best practices in software development.
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

            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search project..."
                className="w-full p-3 bg-secondary/10 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition duration-300"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {projects &&
              projects
                .filter((project) =>
                  project.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((project) => (
                  <ProjectCard
                    key={project.id}
                    title={project.name}
                    tags={project.tags}
                    languages={project.languages}
                    stars={project.stars}
                    forks={project.forks}
                    home={project.home}
                    logoType="terminal"
                    description={project.description}
                    readMoreUrl={project.url}
                  />
                ))}
          </div>
        </div>

        { /* Skills Section */ }
        <div className="mb-16 relative">
          <h2 className="section-title">
            Skills <span className="text-primary ml-2">🛠️</span>
          </h2>

          <p className="mb-6 text-muted-foreground">
            I have experience with a wide range of technologies and tools. Here are some of the skills I have acquired over the years:
          </p>

          <div className="flex flex-wrap gap-2">
            <span className="text-sm bg-primary/20 text-primary px-3 py-1 cursor-pointer rounded-full">Rust</span>
            <span className="text-sm bg-primary/20 text-primary px-3 py-1 cursor-pointer rounded-full">Python</span>
            <span className="text-sm bg-primary/20 text-primary px-3 py-1 cursor-pointer rounded-full">Go</span>
            <span className="text-sm bg-primary/20 text-primary px-3 py-1 cursor-pointer rounded-full">PHP</span>
            <span className="text-sm bg-primary/20 text-primary px-3 py-1 cursor-pointer rounded-full">MYSQL</span>
            <span className="text-sm bg-primary/20 text-primary px-3 py-1 cursor-pointer rounded-full">PostgreSQL</span>
            <span className="text-sm bg-primary/20 text-primary px-3 py-1 cursor-pointer rounded-full">JavaScript</span>
            <span className="text-sm bg-primary/20 text-primary px-3 py-1 cursor-pointer rounded-full">TypeScript</span>
            <span className="text-sm bg-primary/20 text-primary px-3 py-1 cursor-pointer rounded-full">Docker</span>
            <span className="text-sm bg-primary/20 text-primary px-3 py-1 cursor-pointer rounded-full">Redis</span>
            <span className="text-sm bg-primary/20 text-primary px-3 py-1 cursor-pointer rounded-full">Vue.js</span>
            <span className="text-sm bg-primary/20 text-primary px-3 py-1 cursor-pointer rounded-full">React</span>
          </div>
        </div>
      </div>

      {/* Decorative elements at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-primary/10 rounded-tl-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-full h-32 bg-secondary/10 rounded-tr-full blur-3xl" />
      
      {/* Footer Section */}
      <div className="bg-secondary/10 py-8 text-center text-muted-foreground relative z-10">
        <p className="text-sm">
          Made with <span className="text-primary animate-pulse">❤️</span> by Kremilly
        </p>
        <p className="text-sm mt-2">© Kremilly. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Index;
