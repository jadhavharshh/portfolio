import React from 'react';

type EducationItem = {
  institution: string;
  degree: string;
  period: string;
  field: string;
};

const EducationSection = () => {
  const education: EducationItem[] = [
    {
      institution: "Mumbai University",
      degree: "Bachelor's Degree",
      period: "2021 - 2025",
      field: "Information Technology"
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-3">
      {education.map((edu, index) => (
        <div key={index} className="flex flex-col gap-3 border border-dashed rounded-sm p-4 bg-muted/20">
          <div className="flex flex-col gap-1">
            <h3 className="jetbrains-mono text-sm font-medium tracking-tight">{edu.degree}</h3>
            <p className="jetbrains-mono text-xs text-muted-foreground tracking-tight">{edu.institution}</p>
          </div>
          <p className="jetbrains-mono text-xs text-muted-foreground tracking-tight">{edu.field}</p>
          <div className="jetbrains-mono text-xs text-muted-foreground tracking-tight">{edu.period}</div>
        </div>
      ))}
    </div>
  );
};

export default EducationSection;
