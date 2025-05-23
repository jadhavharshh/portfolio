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
      company: "Tech Solutions Inc.",
      position: "Senior Web Developer",
      period: "Jan 2023 - Present",
      description: "Led development of multiple client projects, optimizing performance and implementing best practices. Mentored junior developers and introduced modern development workflows.",
      technologies: ["React", "Next.js", "TypeScript", "TailwindCSS"]
    },
    {
      company: "Digital Innovations",
      position: "Frontend Developer",
      period: "Mar 2021 - Dec 2022",
      description: "Developed responsive web applications with focus on UI/UX. Collaborated with designers to implement pixel-perfect interfaces and improved load times by 40%.",
      technologies: ["JavaScript", "React", "CSS", "Figma"]
    },
    {
      company: "WebCraft Agency",
      position: "Junior Developer",
      period: "Jun 2019 - Feb 2021",
      description: "Built and maintained websites for clients across various industries. Participated in code reviews and implemented responsive designs for mobile-first experiences.",
      technologies: ["HTML", "CSS", "JavaScript", "WordPress"]
    },
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
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {/* Timeline node with perfect alignment */}
              {index === 0 ? (
                <motion.div 
                  className="absolute left-0 top-[6px] w-3 h-3 rounded-full bg-primary transform translate-x-[0.5px]"
                  animate={{ 
                    boxShadow: ['0 0 0px var(--primary)', '0 0 8px var(--primary)', '0 0 0px var(--primary)']
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    repeatType: "loop" 
                  }}
                />
              ) : (
                <div 
                  className="absolute left-0 top-[6px] w-3 h-3 rounded-full bg-primary/60 transform translate-x-[0.5px]"
                />
              )}
              
              {/* Minimal card with less padding */}
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