// Portfolio.jsx
import React from 'react';
import { motion } from 'framer-motion';
import PortfolioCards from './PortfolioCards';

const projectData = [
  {
    id: 1,
    img: '/port.jpeg',
    title: 'Previous Portfolio',
    description: 'The first full-stack website I have done in an internship "Pathline Academy"',
    technologies: ['React', 'Tailwind', 'Node.js', 'Express', 'MongoDB'],
    demo: 'https://muhammad-essam.vercel.app/',
    github: 'https://github.com/lil-de7k/portfolio-client'
  },
];

// Animation variants for the background circles
const circleVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

// Animation variants for the main content
const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

const titleVariants = {
  initial: { y: -30, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

const underlineVariants = {
  initial: { width: 0, opacity: 0 },
  animate: {
    width: '3rem',
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: 0.3,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

const cardsVariants = {
  initial: { y: 50, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: 0.5,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

const Portfolio = () => {
  return (
    <div className='relative h-auto bg-neutral-800 overflow-hidden flex justify-center' id="projects">
      {/* Animated background circles */}
      <motion.div 
        className='absolute -right-35 -top-20 w-90 h-90 sm:w-125 sm:h-125 bg-neutral-700/50 rounded-full'
        variants={circleVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
      />
      <motion.div 
        className='absolute -left-35 -bottom-40 w-90 h-90 sm:w-125 sm:h-125 bg-neutral-700/50 rounded-full'
        variants={circleVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
      />

      {/* Main content container */}
      <motion.div 
        className='py-15 sm:py-20 flex flex-col items-center w-full z-10'
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Animated title */}
        <motion.p 
          className='text-white text-[30px] mb-0.5 font text-center px-4'
          variants={titleVariants}
        >
          Projects
        </motion.p>

        {/* Animated underline */}
        <motion.div 
          className='h-1 bg-neutral-600 mb-4 rounded-full'
          variants={underlineVariants}
        />

        {/* Animated cards container */}
        <motion.div 
          className='w-full max-w-7xl px-5 sm:px-6 lg:px-8 mt-3'
          variants={cardsVariants}
        >
          <PortfolioCards data={projectData} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Portfolio;