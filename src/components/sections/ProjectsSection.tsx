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
            title: "ConnectX",
            description: "Full-stack learning management system with AI-powered features and real-time collaboration.",
            imageUrl: "/images/project-1.jpg",
            technologies: ["React", "Node.js", "Python", "MongoDB"],
            liveUrl: "https://connect-x-povk.vercel.app/",
            githubUrl: "https://github.com/jadhavharshh/ConnectX"
        },
        {
            id: 2,
            title: "Perpetual Trading Platform",
            description: "SEI blockchain perpetual trading platform with real-time charts and wallet integration.",
            imageUrl: "/images/project-2.jpg",
            technologies: ["Next.js", "TypeScript", "SEI", "WebSocket"],
            liveUrl: "https://perpetual-demo.com",
            githubUrl: "https://github.com/jadhavharshh/perpetual"
        },
        {
            id: 3,
            title: "GameSideVault",
            description: "Secure crypto wallet infrastructure with multi-chain support and automated fund management.",
            imageUrl: "/images/project-3.jpg",
            technologies: ["Node.js", "HashiCorp Vault", "Ethereum", "Bitcoin"],
            liveUrl: "https://gamesidevault-demo.com",
            githubUrl: "https://github.com/jadhavharshh/gamesidevault"
        },
        {
            id: 4,
            title: "NextStep",
            description: "AI-powered career guidance platform for students with personalized recommendations.",
            imageUrl: "/images/project-4.jpg",
            technologies: ["Next.js", "Express", "PostgreSQL", "Python"],
            liveUrl: "https://nextstep-demo.com",
            githubUrl: "https://github.com/jadhavharshh/nextstep"
        },
    ];

    return (
        <section>
            <h2 className="text-2xl font-bold mb-8">Projects</h2>

            <div className="space-y-6">
                {projects.map((project) => (
                    <div key={project.id} className="flex justify-between gap-8 pb-6 border-b border-border last:border-b-0">
                        <div className="flex-1">
                            <h3 className="text-sm font-medium mb-2">{project.title}</h3>
                            <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                            <div className="flex items-center gap-3 text-xs">
                                <Link
                                    href={project.githubUrl}
                                    target="_blank"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    GitHub →
                                </Link>
                                <Link
                                    href={project.liveUrl}
                                    target="_blank"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Live →
                                </Link>
                            </div>
                        </div>
                        <div className="text-sm text-muted-foreground whitespace-nowrap text-right">
                            {project.technologies.slice(0, 2).join(", ")}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProjectsSection;