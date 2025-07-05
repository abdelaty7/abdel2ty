import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Enhanced animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const titleVariants = {
  hidden: { y: -50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.8, 0.25, 1],
    },
  },
};

const underlineVariants = {
  hidden: { width: 0, opacity: 0 },
  visible: {
    width: '3.5rem',
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: 0.3,
      ease: [0.25, 0.8, 0.25, 1],
    },
  },
};

const timelineVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.8, 0.25, 1],
    },
  },
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50, 
    scale: 0.95,
    rotateX: 10,
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      delay: i * 0.2 + 0.5,
      duration: 0.8,
      ease: [0.25, 0.8, 0.25, 1],
    },
  }),
  hover: {
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const circleVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i) => ({
    scale: 1,
    opacity: 1,
    transition: {
      delay: i * 0.2 + 0.8,
      duration: 0.6,
      ease: [0.25, 0.8, 0.25, 1],
    },
  }),
};

const shrapnelContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const shrapnelVariants = {
  hidden: { opacity: 0, scale: 0, rotate: 0 },
  visible: (i) => ({
    opacity: 0.3,
    scale: 1,
    rotate: 360,
    transition: {
      delay: i * 0.02,
      duration: 1.5,
      ease: "easeOut",
    },
  }),
};

const experiences = [
  {
    id: 1,
    title: 'Self-Taught Full-Stack Development',
    duration: 'Aug 2024 - Apr 2025',
    description: `Started my journey in software development from scratch while studying at Modern Academy in Maadi, majoring in Computer Science. I independently learned HTML, CSS, JavaScript, and React without any paid courses, and then explored backend technologies like Node.js, Express.js, and MongoDB. During this time, I joined an internship at Pathline Academy, where I was selected as one of the top 3 trainees of the month. This internship was a major milestone for me, and you can find it reposted on my LinkedIn profile.`,
  },
  {
    id: 2,
    title: 'Intern at Pathline Academy',
    duration: 'Apr 2025 - May 2025',
    description: `Despite having limited experience at the time, I took on the challenge of building a full-stack web project as required by the internship. I relied heavily on self-learning and sharpened my research skills to overcome technical challenges. Although my design skills were still developing, I managed to stand out and was honored as one of the top 3 interns. This experience taught me the invaluable skill of self-driven learning and problem-solving — achievements that go beyond technical output. The project I submitted during this internship remains featured in my current portfolio as my first real milestone in tech.`,
  },
  {
    id: 3,
    title: 'Mandoob. E-commerce Project',
    duration: 'Jun 2025 - Present',
    description: `Currently working on a large-scale e-commerce project modeled after platforms like Amazon. The system includes real online payment gateways, user registration/login/logout, account creation, product reviews, and multilingual support (Arabic & English). It also features an admin dashboard and a dedicated blog section — essentially three integrated systems in one project. I'm carefully focusing on creating a highly polished UI and applying advanced backend knowledge I'm learning in parallel. Although my main direction is AI and Machine Learning, I believe this complex project will add great value to my skill set in terms of project architecture, critical thinking, and large-scale application development.`,
  },
];

const Experience = () => {
  const [shrapnelPieces, setShrapnelPieces] = useState([]);

  useEffect(() => {
    // Generate shrapnel pieces with wind-like flow
    const pieces = [];
    for (let i = 0; i < 20; i++) {
      const xBias = Math.random() * 100;
      
      pieces.push({
        id: i,
        x: xBias,
        y: Math.random() * 100,
        rotation: Math.random() * 360,
        scale: 0.3 + Math.random() * 0.6,
        duration: 8 + Math.random() * 6,
        delay: 0,
        type: Math.floor(Math.random() * 8),
        windX: 0.8 + Math.random() * 0.4,
        windY: -0.3 + Math.random() * 0.6,
        amplitude: 20 + Math.random() * 35,
        waveOffset: Math.random() * Math.PI * 2,
        rotationSpeed: 0.3 + Math.random() * 0.7,
        baseOpacity: 0.2 + Math.random() * 0.2, // Individual base opacity for each piece
      });
    }
    setShrapnelPieces(pieces);
  }, []);

  const ShrapnelPiece = ({ piece, index }) => {
    const shrapnelShapes = [
      <svg width="16" height="32" viewBox="0 0 16 32" className="drop-shadow-lg">
        <path
          d="M8 2L14 10L12 18L8 30L4 18L2 10L8 2Z"
          fill="url(#metalGradient1)"
          stroke="#555"
          strokeWidth="0.5"
        />
      </svg>,
      <svg width="20" height="28" viewBox="0 0 20 28" className="drop-shadow-lg">
        <path
          d="M3 26L8 2L12 8L10 14L15 18L13 24L8 22L5 26L3 26Z"
          fill="url(#metalGradient2)"
          stroke="#555"
          strokeWidth="0.5"
        />
      </svg>,
      <svg width="24" height="20" viewBox="0 0 24 20" className="drop-shadow-lg">
        <path
          d="M2 18L22 2L20 8L16 6L12 12L8 16L4 18L2 18Z"
          fill="url(#metalGradient3)"
          stroke="#555"
          strokeWidth="0.5"
        />
      </svg>,
      <svg width="14" height="36" viewBox="0 0 14 36" className="drop-shadow-lg">
        <path
          d="M7 2L11 12L9 20L7 34L5 20L3 12L7 2Z"
          fill="url(#metalGradient4)"
          stroke="#555"
          strokeWidth="0.5"
        />
      </svg>,
      <svg width="28" height="16" viewBox="0 0 28 16" className="drop-shadow-lg">
        <path
          d="M2 8L26 2L24 8L26 14L2 8Z"
          fill="url(#metalGradient1)"
          stroke="#555"
          strokeWidth="0.5"
        />
      </svg>,
      <svg width="18" height="26" viewBox="0 0 18 26" className="drop-shadow-lg">
        <path
          d="M3 24L9 2L11 6L13 4L15 8L14 12L16 16L14 20L12 18L10 22L8 20L6 24L3 24Z"
          fill="url(#metalGradient2)"
          stroke="#555"
          strokeWidth="0.5"
        />
      </svg>,
      <svg width="22" height="22" viewBox="0 0 22 22" className="drop-shadow-lg">
        <path
          d="M11 2L19 7L17 11L19 15L11 20L3 15L5 11L3 7L11 2Z"
          fill="url(#metalGradient3)"
          stroke="#555"
          strokeWidth="0.5"
        />
      </svg>,
      <svg width="16" height="30" viewBox="0 0 16 30" className="drop-shadow-lg">
        <path
          d="M8 2L12 8L10 12L14 16L12 20L8 28L4 20L2 16L6 12L4 8L8 2Z"
          fill="url(#metalGradient4)"
          stroke="#555"
          strokeWidth="0.5"
        />
      </svg>
    ];

    return (
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: `${piece.x}%`,
          top: `${piece.y}%`,
          transform: `rotate(${piece.rotation}deg) scale(${piece.scale})`,
          opacity: piece.baseOpacity,
        }}
        variants={shrapnelVariants}
        custom={index}
        animate={{
          x: [0, piece.windX * 50],
          y: [0, piece.windY * 30],
          rotate: [0, 90],
        }}
        transition={{
          duration: piece.duration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        {shrapnelShapes[piece.type]}
      </motion.div>
    );
  };

  return (
    <div className='relative bg-neutral-950 flex justify-center py-15 sm:py-16 md:py-20 overflow-hidden' id="experience">
      {/* SVG Gradients for metallic effect */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="metalGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="25%" stopColor="#e2e8f0" />
            <stop offset="50%" stopColor="#94a3b8" />
            <stop offset="75%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
          <linearGradient id="metalGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f1f5f9" />
            <stop offset="30%" stopColor="#cbd5e1" />
            <stop offset="70%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <linearGradient id="metalGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="40%" stopColor="#94a3b8" />
            <stop offset="80%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
          <linearGradient id="metalGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="35%" stopColor="#cbd5e1" />
            <stop offset="70%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
        </defs>
      </svg>

      {/* Animated flying shrapnel pieces */}
      <motion.div
        className="absolute inset-0"
        variants={shrapnelContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {shrapnelPieces.map((piece, index) => (
          <ShrapnelPiece key={piece.id} piece={piece} index={index} />
        ))}
      </motion.div>

      <motion.div 
        className='w-full max-w-6xl px-5 sm:px-6 relative z-10'
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Animated header section */}
        <div className='flex flex-col items-center'>
          <motion.p 
            className='text-white text-[30px] mb-0.5 font text-center'
            variants={titleVariants}
          >
            Experience
          </motion.p>
          <motion.div 
            className='h-1 bg-neutral-600 mb-6 sm:mb-8 rounded-full'
            variants={underlineVariants}
          />
        </div>

        {/* Animated Timeline */}
        <motion.div 
          className="relative border-l-2 sm:border-l-3 border-neutral-600 ml-2 sm:ml-3"
          variants={timelineVariants}
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              custom={index}
              variants={cardVariants}
              whileHover="hover"
              className="relative pl-3 sm:pl-7 pb-4 sm:pb-5 last:pb-0 group"
            >
              {/* Animated timeline circle */}
              <motion.span 
                className="absolute -left-1.5 sm:-left-2 top-4 sm:top-2 w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 bg-neutral-600 rounded-full group-hover:bg-neutral-500 transition-colors duration-300"
                variants={circleVariants}
                custom={index}
              />

              {/* Enhanced card content */}
              <motion.div 
                className="bg-neutral-800/60 backdrop-blur-sm rounded-lg px-4 sm:px-5 py-4 sm:py-5 shadow-xl group-hover:shadow-2xl group-hover:border-neutral-600/50 transition-all duration-300"
                whileHover={{
                  backgroundColor: "rgba(23, 23, 23, 0.8)",
                  transition: { duration: 0.2 }
                }}
              >
                <h3 className="text-white text-[17px] sm:text-[17px] md:text-[18px] lg:text-[19px] mb-1 sm:mb-2 leading-tight">
                  {exp.title}
                </h3>
                <p className="text-neutral-300 text-[14px] sm:text-[14px] md:text-[15px] mb-1.5 sm:mb-3 font-medium">
                  {exp.duration}
                </p>
                <p className="text-neutral-400/90 text-[14.3px] sm:text-[14px] md:text-[15px] lg:text-[15.5px] leading-relaxed">
                  {exp.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Experience;