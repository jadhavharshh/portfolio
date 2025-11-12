import React from 'react';

type ExperienceItem = {
  company: string;
  position: string;
  period: string;
  description: string;
  technologies: string[];
};

const ExperienceSection = () => {
  const experiences: ExperienceItem[] = [
    {
      company: "Freelance",
      position: "Full Stack Developer",
      period: "Mar 2023 - Present",
      description: "Building AI-powered web applications and scalable solutions.",
      technologies: ["React", "Node.js", "MongoDB", "Express", "AI Integration", "Next.js", "TypeScript"]
    },
    {
      company: "CSRBOX",
      position: "IBM SkillsBuild Summer Intern",
      period: "Jun 2024 - Aug 2024",
      description: "Front-end development with focus on accessibility and UI/UX.",
      technologies: ["HTML", "CSS", "JavaScript", "React", "UI/UX", "Project Management"]
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {experiences.map((exp, index) => (
        <div key={index} className="flex flex-col gap-3 border border-dashed rounded-sm p-4 bg-muted/20">
          <div className="flex flex-col gap-1">
            <h3 className="jetbrains-mono text-sm font-medium tracking-tight">{exp.position}</h3>
            <p className="jetbrains-mono text-xs text-muted-foreground tracking-tight">{exp.company}</p>
          </div>
          <p className="jetbrains-mono text-xs text-muted-foreground tracking-tight">{exp.description}</p>
          <div className="jetbrains-mono text-xs text-muted-foreground tracking-tight">{exp.period}</div>
        </div>
      ))}
    </div>
  );
};

export default ExperienceSection;