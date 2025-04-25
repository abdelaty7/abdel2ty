import React, { useEffect, useState } from "react";

const SkillBar = ({ skill, percentage }) => {
  const [width, setWidth] = useState("0%");

  useEffect(() => {
    // Small delay for smooth animation
    const timer = setTimeout(() => {
      setWidth(`${percentage}%`);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="mb-2 sm:mb-3 md:mb-4 flex items-center justify-between">
      <div className="font-semibold text-xs sm:text-sm md:text-xs w-17 sm:w-24 md:w-17">{skill}</div>
      <div className="flex-1 bg-gray-400/60 h-1 sm:h-1.5 md:h-1.5 relative overflow-hidden mx-2 sm:mx-3">
        <div
          className="h-full bg-blue-900 transition-all duration-1000 ease-in-out"
          style={{ width }}
        ></div>
      </div>
      <span className="text-xs sm:text-sm md:text-xs font-semibold w-5 text-right">{percentage}%</span>
    </div>
  );
};

const SkillsBar = () => {
  const skills = [
    { skill: "HTML", percentage: 99 },
    { skill: "CSS", percentage: 98 },
    { skill: "Tailwind", percentage: 98 },
    { skill: "JS - TS", percentage: 83 },
    { skill: "React.js", percentage: 89 },
    { skill: "Node.js", percentage: 10 },
    { skill: "Express", percentage: 10 },
    { skill: "MongoDB", percentage: 10 },
    { skill: "postgreSQL", percentage: 10 },
  ];

  return (
    <div className="w-full">
      {skills.map((item, index) => (
        <SkillBar key={index} skill={item.skill} percentage={item.percentage} />
      ))}
    </div>
  );
};

export default SkillsBar;