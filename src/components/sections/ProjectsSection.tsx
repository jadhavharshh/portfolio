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
        <section>
            <h2 className="text-2xl font-bold mb-8">Projects</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        <div className="border border-border rounded-lg overflow-hidden h-full flex flex-col hover:border-foreground/20 transition-colors">
                            {/* Project Info */}
                            <div className="p-5 flex flex-col flex-grow">
                                <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{project.description}</p>

                                {/* Tech tags */}
                                <div className="flex flex-wrap gap-1.5 mt-auto mb-4">
                                    {project.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2 py-0.5 bg-secondary text-foreground rounded text-xs"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
<div className="flex gap-2">
    <Link
        href={project.liveUrl}
        target="_blank"
        className="flex-1 text-center px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity"
    >
        Live Demo
    </Link>
    <Link
        href={project.githubUrl}
        target="_blank"
        className="flex-1 text-center px-3 py-1.5 text-xs font-medium border border-border text-foreground rounded hover:bg-secondary transition-colors"
    >
        View Code
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