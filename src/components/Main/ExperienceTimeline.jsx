import React from 'react';

const ExperienceTimeline = () => {
  const experiences = [
    {
      title: "Getting Started with Web Development",
      year: "Sep 2024 - Dec 2024",
      description: "Started learning web development alongside my enrollment at Modern Academy in El-Maadi, Computer Science department. Focused on building a solid foundation in HTML and CSS while managing university studies during the first semester."
    },
    {
      title: "Progressing in JavaScript and React.js",
      year: "Jan 2025 - Mar 2025",
      description: "After completing the basics, I shifted my focus to JavaScript and gradually moved into React.js. By March, I had a good grasp of core JavaScript concepts and started building small interactive components using React."
    },
    {
      title: "Entering the Backend World",
      year: "Apr 2025",
      description: "In April, I began exploring backend development. Although still in the early stages, I started understanding how frontend and backend connect and began experimenting with full stack project structures."
    },
    {
      title: "Building Full Stack Projects",
      year: "May 2025 - Present",
      description: "Started building full stack projects combining frontend and backend skills. Developed complete web applications such as my portfolio, and began applying my knowledge in real-world scenarios while continuing to enhance both frontend and backend capabilities."
    }    
  ];

  return (
    <div className="relative">
      {/* Vertical timeline line for both mobile and desktop */}
      <div className="absolute w-0.5 bg-blue-900 h-full left-2 sm:left-6 md:left-2 top-0"></div>

      {experiences.map((exp, index) => (
        <div key={index} className="flex flex-row mb-3 md:mb-3.5 relative pl-8 sm:pl-16 md:pl-9">
          {/* Circle marker */}
          <div className="absolute left-2.5 sm:left-2 top-4 sm:top-10 flex w-4 h-4 sm:w-10 sm:h-10 md:w-4.5 md:h-4.5 items-center justify-center border-2 border-blue-900 bg-gray-50 text-white rounded-full text-xs sm:text-sm md:text-base font-medium z-10 -translate-x-2">
          </div>

          {/* Content card */}
          <div className="bg-white p-3 sm:p-4 md:p-3.5 rounded-xs sm:rounded shadow-md w-full z-10">
            <h3 className="text-[13.5px] sm:text-base md:text-sm font-medium">{exp.title}</h3>
            <span className="text-gray-400 font-medium text-xs sm:text-xs block mt-2 mb-1">{exp.year}</span>
            <p className="text-gray-600 text-xs sm:text-sm md:text-[13px]">{exp.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExperienceTimeline;