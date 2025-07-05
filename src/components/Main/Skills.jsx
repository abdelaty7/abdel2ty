import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNode,
  FaDatabase
} from 'react-icons/fa';
import {
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiPostgresql,
  SiNextdotjs,
  SiNestjs,
  SiGraphql
} from 'react-icons/si';

const technicalSkills = [
  { name: 'HTML', icon: <FaHtml5 className="text-orange-500 text-[44px] sm:text-[38px] md:text-[42px] lg:text-[44px]" />, level: 99 },
  { name: 'CSS', icon: <FaCss3Alt className="text-blue-500 text-[44px] sm:text-[38px] md:text-[42px] lg:text-[44px]" />, level: 99 },
  { name: 'JavaScript', icon: <SiJavascript className="text-yellow-400 text-[42px] sm:text-[36px] md:text-[40px] lg:text-[42px]" />, level: 96 },
  { name: 'TypeScript', icon: <SiTypescript className="text-blue-400 text-[42px] sm:text-[36px] md:text-[40px] lg:text-[42px]" />, level: 85 },
  { name: 'React', icon: <FaReact className="text-cyan-400 text-[43px] sm:text-[38px] md:text-[42px] lg:text-[44px]" />, level: 91 },
  { name: 'Next.js', icon: <SiNextdotjs className="text-white text-[41px] sm:text-[35px] md:text-[39px] lg:text-[41px]" />, level: 0 },
  { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-teal-400 text-[43px] sm:text-[37px] md:text-[41px] lg:text-[43px]" />, level: 99 },
  { name: 'Node.js', icon: <FaNode className="text-green-600 text-[50px] sm:text-[42px] md:text-[46px] lg:text-[50px]" />, level: 50 },
  { name: 'Express.js', icon: <SiExpress className="text-white text-[40px] sm:text-[34px] md:text-[38px] lg:text-[40px]" />, level: 50 },
  { name: 'NestJS', icon: <SiNestjs className="text-red-600 text-[43px] sm:text-[37px] md:text-[41px] lg:text-[43px]" />, level: 0 },
  { name: 'MongoDB', icon: <SiMongodb className="text-green-500 text-[44px] sm:text-[38px] md:text-[42px] lg:text-[44px]" />, level: 50 },
  { name: 'PostgreSQL', icon: <SiPostgresql className="text-blue-500 text-[44px] sm:text-[37px] md:text-[41px] lg:text-[43px]" />, level: 0 },
  { name: 'GraphQL', icon: <SiGraphql className="text-pink-500 text-[44px] sm:text-[37px] md:text-[41px] lg:text-[43px]" />, level: 0 },
  { name: 'Databases', icon: <FaDatabase className="text-indigo-400 text-[40px] sm:text-[34px] md:text-[38px] lg:text-[40px]" />, level: 50 },
];

const softSkills = [
  'Self-Learning', 'Problem Solving', 'Research', 'Adaptability', 'Critical Thinking',
  'Time Management', 'Communication', 'Project Ownership', 'Perseverance'
];

const Skills = () => {
  const [shrapnelPieces, setShrapnelPieces] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    // Generate shrapnel pieces with wind-like flow (same as Contact component)
    const pieces = [];
    for (let i = 0; i < 25; i++) {
      const xBias = Math.random() * 100;
      
      pieces.push({
        id: i,
        x: xBias,
        y: Math.random() * 100,
        rotation: Math.random() * 360,
        scale: 0.25 + Math.random() * 0.7,
        duration: 10 + Math.random() * 8,
        delay: 0,
        type: Math.floor(Math.random() * 8),
        windX: 0.6 + Math.random() * 0.5,
        windY: -0.4 + Math.random() * 0.8,
        amplitude: 15 + Math.random() * 40,
        waveOffset: Math.random() * Math.PI * 2,
        rotationSpeed: 0.2 + Math.random() * 0.8,
      });
    }
    setShrapnelPieces(pieces);

    // Trigger intro animation
    const timer = setTimeout(() => {
      setIsVisible(true);
      controls.start("visible");
    }, 200);

    return () => clearTimeout(timer);
  }, [controls]);

  const ShrapnelPiece = ({ piece }) => {
    const shrapnelShapes = [
      // Sharp triangular shard
      <svg key={0} width="16" height="32" viewBox="0 0 16 32" className="drop-shadow-lg">
        <path
          d="M8 2L14 10L12 18L8 30L4 18L2 10L8 2Z"
          fill="url(#metalGradient1)"
          stroke="#555"
          strokeWidth="0.5"
        />
      </svg>,
      // Jagged blade
      <svg key={1} width="20" height="28" viewBox="0 0 20 28" className="drop-shadow-lg">
        <path
          d="M3 26L8 2L12 8L10 14L15 18L13 24L8 22L5 26L3 26Z"
          fill="url(#metalGradient2)"
          stroke="#555"
          strokeWidth="0.5"
        />
      </svg>,
      // Sharp angular fragment
      <svg key={2} width="24" height="20" viewBox="0 0 24 20" className="drop-shadow-lg">
        <path
          d="M2 18L22 2L20 8L16 6L12 12L8 16L4 18L2 18Z"
          fill="url(#metalGradient3)"
          stroke="#555"
          strokeWidth="0.5"
        />
      </svg>,
      // Pointed shard
      <svg key={3} width="14" height="36" viewBox="0 0 14 36" className="drop-shadow-lg">
        <path
          d="M7 2L11 12L9 20L7 34L5 20L3 12L7 2Z"
          fill="url(#metalGradient4)"
          stroke="#555"
          strokeWidth="0.5"
        />
      </svg>,
      // Razor-like fragment
      <svg key={4} width="28" height="16" viewBox="0 0 28 16" className="drop-shadow-lg">
        <path
          d="M2 8L26 2L24 8L26 14L2 8Z"
          fill="url(#metalGradient1)"
          stroke="#555"
          strokeWidth="0.5"
        />
      </svg>,
      // Serrated edge piece
      <svg key={5} width="18" height="26" viewBox="0 0 18 26" className="drop-shadow-lg">
        <path
          d="M3 24L9 2L11 6L13 4L15 8L14 12L16 16L14 20L12 18L10 22L8 20L6 24L3 24Z"
          fill="url(#metalGradient2)"
          stroke="#555"
          strokeWidth="0.5"
        />
      </svg>,
      // Crystalline shard
      <svg key={6} width="22" height="22" viewBox="0 0 22 22" className="drop-shadow-lg">
        <path
          d="M11 2L19 7L17 11L19 15L11 20L3 15L5 11L3 7L11 2Z"
          fill="url(#metalGradient3)"
          stroke="#555"
          strokeWidth="0.5"
        />
      </svg>,
      // Splintered piece
      <svg key={7} width="16" height="30" viewBox="0 0 16 30" className="drop-shadow-lg">
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
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.25, scale: piece.scale }}
        transition={{ 
          delay: piece.id * 0.05,
          duration: 0.8,
          ease: "easeOut"
        }}
        className="absolute pointer-events-none"
        style={{
          left: `${piece.x}%`,
          top: `${piece.y}%`,
          transform: `rotate(${piece.rotation}deg)`,
          animation: `
            windFlow-${piece.id} ${piece.duration}s infinite linear,
            gentleRotate-${piece.id} ${piece.duration * 2}s infinite linear,
            waveMotion-${piece.id} ${piece.duration * 0.7}s infinite ease-in-out
          `,
        }}
      >
        {shrapnelShapes[piece.type]}
      </motion.div>
    );
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100
      }
    }
  };

  const marqueeVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 80,
        delay: 0.5
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="relative bg-neutral-950 px-5 sm:px-4 md:px-6 lg:px-12 xl:px-30 flex flex-col py-10 sm:py-16 md:py-20 overflow-hidden" 
      id="skills"
    >
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

      {/* Flying shrapnel pieces */}
      {shrapnelPieces.map((piece) => (
        <ShrapnelPiece key={piece.id} piece={piece} />
      ))}

      {/* Main Content */}
      <div className='flex flex-col items-center w-full relative z-10'>
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-6 sm:mb-8">
          <motion.p 
            variants={itemVariants}
            className='text-white text-[30px] mb-0.5 font'
          >
            Skills
          </motion.p>
          <motion.div 
            variants={itemVariants}
            className='w-7 h-1 bg-neutral-600 rounded-full mx-auto'
          />
        </motion.div>

        {/* Technical Skills Marquee */}
        <motion.div 
          variants={marqueeVariants}
          className="overflow-hidden w-full mb-8 sm:mb-10 md:mb-14"
        >
          <div className="flex animate-marquee-reverse space-x-3 sm:space-x-5 md:space-x-7 w-max">
            {technicalSkills.concat(technicalSkills).map((skill, i) => (
              <motion.div 
                key={i} 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  delay: i * 0.1,
                  duration: 0.5,
                  ease: "easeOut"
                }}
                className="flex flex-col w-28 sm:w-28 md:w-30 items-center bg-neutral-800/60 backdrop-blur-sm p-2 sm:p-3 md:p-4 rounded-xl shadow-lg hover:bg-neutral-800/80 transition-all duration-300"
              >
                {/* Fixed height container for icon */}
                <div className="h-15 sm:h-14 md:h-16 flex items-center justify-center mt-3 sm:mt-0 mb-3 sm:mb-2">
                  {skill.icon}
                </div>
                {/* Fixed position for progress bar */}
                <div className="w-full">
                  <div className="w-full bg-neutral-800 h-1.5 sm:h-1 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ 
                        delay: i * 0.1 + 0.5,
                        duration: 1,
                        ease: "easeOut"
                      }}
                      className="h-1.5 sm:h-1 bg-gradient-to-r from-neutral-600 to-neutral-500 rounded-full"
                    />
                  </div>
                  <p className="text-neutral-400 text-[12.5px] sm:text-[11px] md:text-[12.5px] text-center mt-2">
                    {skill.level}%
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Soft Skills Section */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center max-w-full sm:max-w-4xl md:max-w-6xl mx-auto px-2"
        >
          {softSkills.map((skill, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                delay: i * 0.08 + 0.8,
                duration: 0.4,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(38, 38, 38, 0.8)",
                transition: { duration: 0.2 }
              }}
              className="bg-neutral-800/60 backdrop-blur-sm text-neutral-300/70 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[14.3px] sm:text-[14px] shadow-lg cursor-default"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Dynamic CSS animations for shrapnel pieces */}
      <style jsx>{`
        ${shrapnelPieces.map(piece => `
          @keyframes windFlow-${piece.id} {
            0% {
              transform: translateY(0px) translateX(-20px);
            }
            100% {
              transform: translateY(${piece.windY * 120}px) translateX(${200 + piece.windX * 180}px);
            }
          }
          
          @keyframes gentleRotate-${piece.id} {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(${piece.rotationSpeed > 0.5 ? 360 : -360}deg);
            }
          }
          
          @keyframes waveMotion-${piece.id} {
            0%, 100% {
              transform: translateY(${Math.sin(piece.waveOffset) * piece.amplitude * 0.3}px) translateX(0px);
            }
            25% {
              transform: translateY(${Math.sin(piece.waveOffset + Math.PI/2) * piece.amplitude * 0.5}px) translateX(${Math.cos(piece.waveOffset + Math.PI/2) * piece.amplitude * 0.25}px);
            }
            50% {
              transform: translateY(${Math.sin(piece.waveOffset + Math.PI) * piece.amplitude * 0.4}px) translateX(${Math.cos(piece.waveOffset + Math.PI) * piece.amplitude * 0.35}px);
            }
            75% {
              transform: translateY(${Math.sin(piece.waveOffset + Math.PI * 1.5) * piece.amplitude * 0.2}px) translateX(${Math.cos(piece.waveOffset + Math.PI * 1.5) * piece.amplitude * 0.15}px);
            }
          }
        `).join('')}
        
        /* Reversed Marquee animation */
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 30s linear infinite;
        }

        /* Responsive marquee speed */
        @media (max-width: 640px) {
          .animate-marquee-reverse {
            animation: marquee-reverse 20s linear infinite;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default Skills;