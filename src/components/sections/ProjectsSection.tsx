import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

type Project = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
};

const ProjectsSection = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  
  const projects: Project[] = [
    {
      id: 1,
      title: "Portfolio Website",
      description: "A minimalist portfolio showcasing my projects and skills, built with Next.js and TailwindCSS for a clean, responsive experience.",
      imageUrl: "/images/project-1.jpg",
      technologies: ["Next.js", "React", "TypeScript", "TailwindCSS"],
      liveUrl: "https://yoursite.com",
      githubUrl: "https://github.com/jadhavharshh/portfolio"
    },
    {
      id: 2,
      title: "E-Commerce Dashboard",
      description: "An admin dashboard for managing products, orders and customers with analytics visualization and comprehensive filtering options.",
      imageUrl: "/images/project-2.jpg",
      technologies: ["React", "Redux", "Node.js", "MongoDB"],
      liveUrl: "https://dashboard-demo.com",
      githubUrl: "https://github.com/jadhavharshh/dashboard"
    },
    {
      id: 3,
      title: "Social Media App",
      description: "A full-stack social platform with real-time messaging, post sharing, and user interactions using modern web technologies.",
      imageUrl: "/images/project-3.jpg",
      technologies: ["React", "Firebase", "Tailwind CSS", "TypeScript"],
      liveUrl: "https://socialapp-demo.com",
      githubUrl: "https://github.com/jadhavharshh/socialapp"
    },
    {
      id: 4,
      title: "AI Content Generator",
      description: "An AI-powered tool that generates high-quality content for blogs, social media, and marketing materials using advanced language models.",
      imageUrl: "/images/project-4.jpg",
      technologies: ["Python", "TensorFlow", "React", "FastAPI"],
      liveUrl: "https://ai-generator-demo.com",
      githubUrl: "https://github.com/jadhavharshh/ai-generator"
    },
  ];

  return (
    <section className="py-16">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Featured Projects</h2>
          <p className="text-sm text-muted-foreground">Showcasing my best work</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <motion.div 
            key={project.id}
            className="group relative h-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
            whileHover={{
              rotateY: 5,
              rotateX: -5,
              z: 10,
              transition: { duration: 0.3 }
            }}
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
          >
            <div className="bg-card/30 backdrop-blur-sm border border-border/40 rounded-lg overflow-hidden h-full flex flex-col shadow-lg"
                style={{ 
                  transform: 'translateZ(0)',
                  transformStyle: 'preserve-3d'
                }}>
              {/* Project Image with 3D effect */}
              <div className="relative aspect-video overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-background/50 to-transparent z-10"></div>
                
                <div className="relative h-full w-full overflow-hidden transition-transform duration-500 group-hover:scale-105"
                     style={{ transform: 'translateZ(20px)' }}>
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    Project Screenshot
                  </div>
                  {/* Uncomment when you have actual images */}
                  {/* <Image 
                    src={project.imageUrl} 
                    alt={project.title}
                    fill
                    className="object-cover"
                  /> */}
                </div>
                
                {/* Overlay buttons with 3D effect */}
                <motion.div 
                  className={`absolute inset-0 z-20 flex items-center justify-center opacity-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300 ${hoveredProject === project.id ? 'opacity-100' : ''}`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="flex gap-4">
                    <Link 
                      href={project.liveUrl} 
                      target="_blank"
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 transition-opacity transform hover:scale-105 hover:translate-z-10"
                      style={{ transform: 'translateZ(40px)' }}
                    >
                      View Project
                    </Link>
                    <Link 
                      href={project.githubUrl} 
                      target="_blank"
                      className="px-4 py-2 bg-white/10 text-foreground rounded-md text-sm font-medium hover:bg-white/20 transition-colors transform hover:scale-105 hover:translate-z-10"
                      style={{ transform: 'translateZ(40px)' }}
                    >
                      GitHub
                    </Link>
                  </div>
                </motion.div>
              </div>
              
              {/* Project Info with 3D effect */}
              <div className="p-6 flex flex-col flex-grow"
                   style={{ transform: 'translateZ(10px)', transformStyle: 'preserve-3d' }}>
                <h3 className="font-doto font-bold text-xl mb-2"
                    style={{ transform: 'translateZ(15px)' }}>{project.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm"
                   style={{ transform: 'translateZ(10px)' }}>{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mt-auto mb-4">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-2 py-0.5 bg-accent/50 text-accent-foreground rounded-full text-xs"
                      style={{ transform: 'translateZ(20px)' }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <Link
                    href={project.liveUrl}
                    target="_blank" 
                    className="group relative px-3 py-1.5 text-xs font-medium text-foreground bg-white/5 border border-transparent hover:border-white/20 hover:bg-white/10 rounded-md transform hover:-translate-y-0.5 transition-all duration-200 ease-out active:translate-y-0"
                    style={{ transform: 'translateZ(25px)' }}
                  >
                    <div className="flex items-center gap-1.5">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                      <span>Live Demo</span>
                    </div>
                  </Link>
                  <Link 
                    href={project.githubUrl}
                    target="_blank" 
                    className="group relative px-3 py-1.5 text-xs font-medium text-foreground bg-white/5 border border-transparent hover:border-white/20 hover:bg-white/10 rounded-md transform hover:-translate-y-0.5 transition-all duration-200 ease-out active:translate-y-0"
                    style={{ transform: 'translateZ(25px)' }}
                  >
                    <div className="flex items-center gap-1.5">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      <span>View Code</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* 3D shadow effect */}
            <div className="absolute -bottom-2 left-2 right-2 h-[10px] bg-black/20 blur-md rounded-full opacity-0 group-hover:opacity-70 transition-opacity duration-300"
                 style={{ transform: 'translateZ(-20px)' }}>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;