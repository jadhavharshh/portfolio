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
    <div className="my-12">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground">Work Experience</h2>
        <p className="text-sm text-muted-foreground">My professional journey</p>
      </div>
      
      <div className="relative">
        {/* Timeline line with perfect alignment */}
        <div className="absolute left-[6px] top-0 bottom-0 w-[1px] bg-border opacity-40"></div>
        
        <div className="space-y-8 relative">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              className="relative pl-10"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-primary"></div>
              
              <div className="bg-card/10 p-3 rounded-md border border-border/30 hover:border-border/50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1">
                  <h3 className="font-doto font-medium text-base">{exp.position}</h3>
                  <span className="text-xs text-muted-foreground mt-1 sm:mt-0 sm:ml-2 bg-background/30 px-2 py-0.5 rounded-full">{exp.period}</span>
                </div>
                
                <div className="text-primary text-sm mb-2">{exp.company}</div>
                
                <p className="text-sm text-muted-foreground mb-2">{exp.description}</p>
                
                <div className="flex flex-wrap gap-1.5">
                  {exp.technologies.map((tech, i) => (
                    <span 
                      key={i} 
                      className="px-1.5 py-0.5 text-xs bg-accent/40 text-accent-foreground rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;