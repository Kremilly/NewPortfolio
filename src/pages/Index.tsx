import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Avatar } from "@/components/Avatar";
import { ProjectCard } from "@/components/ProjectCard";
import { Code, Waves, Terminal, Github, Rss, BookText, Linkedin } from "lucide-react";
import { fetchProjects } from "@/services/projectService";
import { Project } from "@/types/project";
import { Skeleton } from "@/components/ui/skeleton";
import { useSmoothScroll } from "@/hooks/use-mobile";

const Index = () => {
  const { 
    data: projects, 
    isLoading, 
    error, 
    refetch,
    isFetching,
    isStale
  } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    staleTime: 1000 * 60 * 30, // 30 minutos - dados considerados frescos
    gcTime: 1000 * 60 * 60 * 24, // 24 horas - tempo de garbage collection
    refetchOnWindowFocus: false, // Não refetch quando a janela ganha foco
    refetchOnReconnect: true, // Refetch quando reconecta
    retry: 3, // Tentar 3 vezes em caso de erro
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Backoff exponencial
  });

  // Usar o hook de scroll suave
  useSmoothScroll();

  // Efeito de parallax sutil
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax');
      
      parallaxElements.forEach((element) => {
        const speed = element.getAttribute('data-speed') || '0.5';
        const yPos = -(scrolled * parseFloat(speed));
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background decorative elements with parallax */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="parallax absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" data-speed="0.3" />
        <div className="parallax absolute top-1/3 right-20 w-[500px] h-[500px] bg-accent/15 rounded-full blur-[100px]" data-speed="0.2" />
        <div className="parallax absolute bottom-40 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[130px]" data-speed="0.4" />
        <div className="parallax absolute -bottom-20 -right-20 w-96 h-96 bg-accent/20 rounded-full blur-[100px]" data-speed="0.15" />
      </div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />
      
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

          <div className="relative group">
            <div className="absolute inset-0 bg-primary/30 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500" />
            <Avatar 
              src="https://avatars.githubusercontent.com/u/24691979?v=4" 
              alt="Profile picture" 
              className="w-60 h-60 border-4 border-primary/30 rounded-full mb-4 relative z-10 transition-all duration-500 group-hover:scale-105 group-hover:border-primary/50"
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold flex items-center gap-3 mb-4">
              Hi, I&apos;m <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">Kremilly</span>! <span className="text-3xl animate-wave">👋</span>
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-sm bg-gradient-to-r from-primary/20 to-primary/10 text-primary px-4 py-2 rounded-full border border-primary/30 font-medium">Software Engineer</span>
              <span className="text-sm bg-gradient-to-r from-primary/20 to-primary/10 text-primary px-4 py-2 rounded-full border border-primary/30 font-medium">Low Level Engineer</span>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              I am a <span className="text-primary font-medium">software engineer</span> with a passion for building innovative solutions. I have experience in various programming languages and frameworks, and I love tackling complex challenges. I am always eager to learn new technologies and improve my skills.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-6">
              <a
                href="https://github.com/Kremilly"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/30 text-primary font-medium hover:border-primary/60 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-105"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="https://blog.kremilly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/30 text-primary font-medium hover:border-primary/60 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-105"
              >
                <Rss className="w-4 h-4" />
                Blog
              </a>
              <a
                href="https://www.linkedin.com/in/cesarcorreadasilva/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/30 text-primary font-medium hover:border-primary/60 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-105"
              >
                <Linkedin className="w-4 h-4" />
                Linkedin
              </a>
              <a
                href="https://docs.kremilly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/30 text-primary font-medium hover:border-primary/60 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-105"
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

            <div className="relative mb-8">
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full p-4 pl-12 bg-card/50 backdrop-blur-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 hover:border-primary/50"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Terminal className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>

            {projects &&
              projects
                .filter((project) =>
                  project.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((project, index) => (
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
                    index={index}
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

          <div className="flex flex-wrap gap-3">
            <span className="skill-tag text-primary">Rust</span>
            <span className="skill-tag text-primary">Python</span>
            <span className="skill-tag text-primary">Go</span>
            <span className="skill-tag text-primary">PHP</span>
            <span className="skill-tag text-primary">MySQL</span>
            <span className="skill-tag text-primary">PostgreSQL</span>
            <span className="skill-tag text-primary">JavaScript</span>
            <span className="skill-tag text-primary">TypeScript</span>
            <span className="skill-tag text-primary">Docker</span>
            <span className="skill-tag text-primary">Redis</span>
            <span className="skill-tag text-primary">Vue.js</span>
            <span className="skill-tag text-primary">React</span>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="relative z-10 mt-20 border-t border-border/50">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          <div className="text-center space-y-4">
            <div className="flex justify-center gap-6 mb-6">
              <a href="https://github.com/Kremilly" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://blog.kremilly.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                <Rss className="w-5 h-5" />
              </a>
              <a href="https://docs.kremilly.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                <BookText className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              Made with <span className="text-primary inline-block animate-pulse">❤️</span> by Kremilly
            </p>
            <p className="text-xs text-muted-foreground/70">
              © {new Date().getFullYear()} Kremilly. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
