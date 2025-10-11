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
    <div className="space-y-6">
      {education.map((edu, index) => (
        <div key={index} className="flex justify-between gap-8">
          <div className="flex-1">
            <h3 className="text-sm font-medium mb-1">{edu.degree} · {edu.institution}</h3>
            <p className="text-sm text-muted-foreground">{edu.field}</p>
          </div>
          <div className="text-sm text-muted-foreground whitespace-nowrap text-right">{edu.period}</div>
        </div>
      ))}
    </div>
  );
};

export default EducationSection;
