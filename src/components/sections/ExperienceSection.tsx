import React from 'react';
import { motion } from 'framer-motion';

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
    <div className="space-y-6">
      {experiences.map((exp, index) => (
        <div key={index} className="flex justify-between gap-8">
          <div className="flex-1">
            <h3 className="text-sm font-medium mb-1">{exp.position} · {exp.company}</h3>
            <p className="text-sm text-muted-foreground">{exp.description}</p>
          </div>
          <div className="text-sm text-muted-foreground whitespace-nowrap text-right">{exp.period}</div>
        </div>
      ))}
    </div>
  );
};

export default ExperienceSection;