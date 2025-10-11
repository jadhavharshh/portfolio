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
      description: "Developed AI-powered web applications, automating workflows and boosting operational efficiency. Engineered scalable solutions including chatbot management systems and automated video generators, resulting in a 20% increase in client revenue and 30% reduction in load times.",
      technologies: ["React", "Node.js", "MongoDB", "Express", "AI Integration", "Next.js", "TypeScript"]
    },
    {
      company: "CSRBOX",
      position: "IBM SkillsBuild Summer Intern",
      period: "Jun 2024 - Aug 2024",
      description: "Completed a 6-week program focusing on front-end development, culminating in a capstone project that improved user interface accessibility by 25%. Collaborated on real-world projects with on-time delivery of all milestones.",
      technologies: ["HTML", "CSS", "JavaScript", "React", "UI/UX", "Project Management"]
    }
  ];

  return (
    <div className="space-y-6">
      {experiences.map((exp, index) => (
        <motion.div 
          key={index}
          className="border-l-2 border-border pl-6 pb-6 last:pb-0"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 gap-2">
            <h3 className="text-lg font-semibold">{exp.position}</h3>
            <span className="text-xs text-muted-foreground">{exp.period}</span>
          </div>
          
          <div className="text-sm text-muted-foreground mb-2">{exp.company}</div>
          
          <p className="text-sm text-muted-foreground/80 mb-3 leading-relaxed">{exp.description}</p>
          
          <div className="flex flex-wrap gap-1.5">
            {exp.technologies.map((tech, i) => (
              <span 
                key={i} 
                className="px-2 py-0.5 text-xs bg-secondary text-foreground rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ExperienceSection;