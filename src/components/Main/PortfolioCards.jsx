import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, x: 50, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.25, 0.8, 0.25, 1],
    },
  }),
};

const PortfolioCards = ({ data }) => {
  return (
    <div className="w-full overflow-x-auto pb-5">
      <div className="flex gap-6 min-w-max">
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <motion.div
              key={item.id}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="relative w-[320px] h-[380px] bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden shadow-2xl group will-change-transform hover:border-neutral-700 transition-all duration-300 hover:shadow-3xl flex-shrink-0"
            >
              {/* Project Image */}
              <div className="relative h-[240px] overflow-hidden">
                {item.img && (
                  <div
                    className="h-full w-full bg-cover bg-center transform transition-transform duration-300"
                    style={{ backgroundImage: `url(${item.img})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent"></div>
                  </div>
                )}
              </div>

              {/* Project Details */}
              <div className="absolute bottom-0 w-full p-4 text-neutral-100 bg-neutral-900 bg-opacity-95 backdrop-blur-sm border-t border-neutral-800">
                {item.title && (
                  <h3 className="text-lg mb-1 text-white group-hover:text-neutral-300 transition-colors">
                    {item.title}
                  </h3>
                )}
                
                {item.description && (
                  <p className="text-sm text-neutral-300 mb-3 line-clamp-2">
                    {item.description}
                  </p>
                )}

                {item.technologies && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {item.technologies.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="bg-neutral-800 text-neutral-200 px-3 py-1 rounded-full text-xs border border-neutral-700"
                      >
                        {tech}
                      </span>
                    ))}
                    {item.technologies.length > 3 && (
                      <span className="bg-neutral-700 text-neutral-300 px-3 py-1 rounded-full text-xs">
                        +{item.technologies.length - 3}
                      </span>
                    )}
                  </div>
                )}

                <div className="flex justify-between items-center">
                  {item.demo && (
                    <a
                      href={item.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-1.5 rounded-md text-[13.5px] font-medium transition-colors"
                    >
                      <FaExternalLinkAlt className="text-[12.5px]" /> Live Preview
                    </a>
                  )}
                  {item.github && (
                    <a
                      href={item.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors text-[13.5px]"
                    >
                      <FaGithub className="text-[16.5px]" /> Source Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="w-full flex justify-center py-20">
            <h3 className="text-center text-neutral-400 text-lg">No projects found</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioCards;