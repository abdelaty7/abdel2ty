  import React from 'react';
  import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
  import { motion } from 'framer-motion';

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -15, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.25, 0.8, 0.25, 1], // smooth bezier
      },
    }),
  };

  const PortfolioCards = ({ data }) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-5 sm:pb-8 md:pb-10 justify-items-center">
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <motion.div
              key={item.id}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="relative w-full max-w-sm h-[325px] sm:h-[280px] md:h-[220px] bg-white rounded-sm sm:rounded overflow-hidden shadow-md sm:shadow-lg md:shadow-lg group will-change-transform"
            >
              {/* Project Image */}
              <div className="relative h-full">
                {item.img && (
                  <div
                    className="h-[210px] sm:h-[170px] md:h-[220px] w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.img})` }}
                  ></div>
                )}

                {/* Details on hover */}
                <div className="absolute bottom-0 w-full py-4 px-3 sm:p-3 md:p-4 text-gray-800 bg-white
                  translate-y-0 sm:translate-y-full 
                  group-hover:translate-y-0 
                  transition-all duration-300 
                  sm:group-hover:shadow-lg">
                  {item.title && (
                    <h3 className="text-[13px] sm:text-sm md:text-sm font-semibold mb-1">{item.title}</h3>
                  )}
                  {item.description && (
                    <p className="text-xs sm:text-xs text-gray-600 mb-2 line-clamp-2 sm:line-clamp-3">
                      {item.description}
                    </p>
                  )}

                  {item.technologies && (
                    <div className="text-xs sm:text-xs font-medium text-gray-500 mb-2 sm:mb-3 flex flex-wrap gap-1">
                      {item.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="bg-gray-200 px-2 py-[2px] rounded-sm text-[10px] sm:text-[10.5px]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex font-semibold justify-between text-xs sm:text-sx mt-auto">
                    {item.demo && (
                      <a
                        href={item.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-500 hover:underline"
                      >
                        <FaExternalLinkAlt className="text-xs sm:text-sm" /> Demo
                      </a>
                    )}
                    {item.github && (
                      <a
                        href={item.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-gray-700 hover:underline"
                      >
                        <FaGithub className="text-xs sm:text-sm" /> GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <h3 className="text-center text-gray-500 col-span-full py-10">No projects found</h3>
        )}
      </div>
    );
  };

  export default PortfolioCards;