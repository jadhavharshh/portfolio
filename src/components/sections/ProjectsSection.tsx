import Link from "next/link";

type Project = {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    liveUrl: string;
    githubUrl: string;
};

const ProjectsSection = () => {
    const projects: Project[] = [
        {
            id: 1,
            title: "ConnectX",
            description: "Full-stack learning management system with AI-powered features and real-time collaboration.",
            technologies: ["React", "Node.js", "Python", "MongoDB"],
            liveUrl: "https://connect-x-povk.vercel.app/",
            githubUrl: "https://github.com/jadhavharshh/ConnectX"
        },
        {
            id: 2,
            title: "Perpetual Trading Platform",
            description: "SEI blockchain perpetual trading platform with real-time charts and wallet integration.",
            technologies: ["Next.js", "TypeScript", "SEI", "WebSocket"],
            liveUrl: "https://perpetual-demo.com",
            githubUrl: "https://github.com/jadhavharshh/perpetual"
        },
        {
            id: 3,
            title: "GameSideVault",
            description: "Secure crypto wallet infrastructure with multi-chain support and automated fund management.",
            technologies: ["Node.js", "HashiCorp Vault", "Ethereum", "Bitcoin"],
            liveUrl: "https://gamesidevault-demo.com",
            githubUrl: "https://github.com/jadhavharshh/gamesidevault"
        },
        {
            id: 4,
            title: "NextStep",
            description: "AI-powered career guidance platform for students with personalized recommendations.",
            technologies: ["Next.js", "Express", "PostgreSQL", "Python"],
            liveUrl: "https://nextstep-demo.com",
            githubUrl: "https://github.com/jadhavharshh/nextstep"
        },
    ];

    return (
        <section className="flex flex-col gap-6">
            <h2 className="jetbrains-mono text-sm font-medium tracking-tight">Projects</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projects.map((project) => (
                    <div key={project.id} className="flex flex-col gap-3 border border-dashed rounded-sm p-4 bg-muted/20 hover:bg-muted/30 transition-colors">
                        <div className="flex flex-col gap-1">
                            <h3 className="jetbrains-mono text-sm font-medium tracking-tight">{project.title}</h3>
                            <p className="jetbrains-mono text-xs text-muted-foreground tracking-tight">{project.description}</p>
                        </div>
                        <div className="flex flex-wrap gap-1">
                            {project.technologies.slice(0, 3).map((tech) => (
                                <span key={tech} className="jetbrains-mono text-[10px] text-muted-foreground bg-muted/30 px-2 py-0.5 rounded-sm">
                                    {tech}
                                </span>
                            ))}
                        </div>
                        <div className="flex items-center gap-3 pt-2 border-t border-dashed">
                            <Link
                                href={project.githubUrl}
                                target="_blank"
                                className="jetbrains-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
                            >
                                GitHub →
                            </Link>
                            <Link
                                href={project.liveUrl}
                                target="_blank"
                                className="jetbrains-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Live →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProjectsSection;