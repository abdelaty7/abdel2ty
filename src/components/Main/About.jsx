import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { GraduationCap, Languages, Download } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      controls.start("visible");
    }, 200);

    return () => clearTimeout(timer);
  }, [controls]);

  // 🧮 حساب العمر تلقائيًا
  const calculateAge = () => {
    const birthDate = new Date(2007, 0, 17); // 17 يناير 2007
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--; // لسه مكمّلش السنة
    }

    return age;
  };

  const age = calculateAge();

  // دالة تحميل الـ CV
  const handleDownloadCV = () => {
    // يمكنك تغيير المسار حسب مكان ملف الـ CV
    const cvUrl = '/cv.pdf';
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'Abdelaty_CV.pdf';
    link.click();
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
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
        stiffness: 100,
        duration: 0.6
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0, rotate: -20 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: -4,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 80,
        duration: 0.8
      }
    }
  };

  const textVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        duration: 0.8
      }
    }
  };

  const backgroundVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 60,
        duration: 1
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className='relative bg-neutral-900 overflow-x-hidden flex justify-center px-5 sm:px-4 md:px-6 lg:px-8' 
      id="about"
    >
      {/* خلفية كلمة ABOUT */}
      <motion.div 
        variants={backgroundVariants}
        className='absolute -right-18 sm:-right-16 md:-right-20 top-20 sm:top-16 md:top-20 pointer-events-none'
      >
        <p className='text-neutral-800 font-black text-8xl sm:text-7xl md:text-8xl lg:text-9xl select-none'>ABOUT</p>
      </motion.div>

      <div className='pt-16 sm:pt-20 md:pt-24 flex flex-col items-center z-10 max-w-6xl w-full'>
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-6">
          <motion.p 
            variants={itemVariants}
            className='text-white text-[30px] mb-0.5 font'
          >
            About Me
          </motion.p>
          <motion.div 
            variants={itemVariants}
            className='w-12 sm:w-15 h-1 bg-neutral-700 rounded-full mx-auto'
          />
        </motion.div>

        <div className='pb-16 sm:pb-20 md:pb-25 flex flex-col md:flex-row items-center md:items-start justify-between gap-8 sm:gap-10 md:gap-12 w-full'>
          {/* الصورة */}
          <motion.div 
            variants={imageVariants}
            className='flex-shrink-0'
          >
            <motion.div 
              className='w-[183px] h-[240px] sm:w-[200px] sm:h-[258px] md:w-[215px] md:h-[277px] rounded-[15px] overflow-hidden border-[3px] border-neutral-700 shadow-md sm:rotate-[-3deg] hover:rotate-0 hover:scale-103 transition-all duration-300 ease-in-out'
              whileHover={{ 
                rotate: 0, 
                scale: 1.03,
                transition: { duration: 0.3 }
              }}
            >
              <img
                src='/hero.jpeg'
                alt='Muhammad Essam'
                className='object-cover w-full h-full'
              />
            </motion.div>
          </motion.div>

          {/* النص والمعلومات */}
          <motion.div 
            variants={textVariants}
            className='flex-1 w-full'
          >
            <motion.p 
              variants={itemVariants}
              className='text-[16.8px] sm:text-[16px] md:text-[17.3px] leading-6 sm:leading-7 text-neutral-400 text-center md:text-left px-2 sm:px-0'
            >
              I'm Muhammad Essam, <span className='text-neutral-100/95'>{age} years</span>, based in Egypt. I'm currently focused on <span className='text-neutral-100/95'>studying Artificial Intelligence and Machine Learning</span>, which are my main areas of interest. I also have a solid background in Front-End Development and am exploring Flutter and some Back-End basics. 
              <span className='text-neutral-100/95'> All my learning is self-taught</span>, driven by a genuine passion for technology and an endless curiosity to understand how systems work from the inside out. I constantly challenge myself with complex problems, not because I have to — but because <span className='text-neutral-100/95'>problem-solving is how I grow</span>. I treat every bug, every error, every unexpected behavior as a puzzle to master, not just fix.
              I believe that true learning doesn't happen in the classroom alone — <span className='text-neutral-100/95'>it happens through practice, failure, and persistence</span>. Although I'm currently studying Computer Science at university, I've always been ahead of the curve. <span className='text-neutral-100/95'>I don't wait for knowledge, I seek it</span> — and I apply it immediately.
              <span className='text-neutral-100/95'> Curiosity. Consistency. Creativity.</span> These are the pillars I build on.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className='flex flex-col sm:flex-row mt-7 sm:mt-5 justify-between items-center gap-4 sm:gap-0'
            >
              <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto'>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className='hidden sm:flex'
                >
                  <InfoItem
                    icon={<GraduationCap size={21.5} className='text-neutral-300/80' />}
                    text='Bachelor of Computer Science'
                  />
                </motion.div>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                  className='hidden sm:flex'
                >
                  <InfoItem
                    icon={<Languages size={19.5} className='text-neutral-300/80' />}
                    text='Arabic, English, German'
                  />
                </motion.div>
              </div>
              
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className='w-full sm:w-auto flex justify-center'
              >
                <CVDownloadButton onClick={handleDownloadCV} />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const InfoItem = ({ icon, text, small = false }) => (
  <motion.div 
    className='flex items-center gap-2 bg-neutral-800 pr-3 sm:pr-4 rounded-full w-fit transition-all duration-300'
  >
    <div className='p-2.5 border-2 rounded-full border-neutral-500/60'>
      {icon}
    </div>
    <p className={`text-neutral-300/70 ${small ? 'text-[12px] sm:text-[13.7px]' : 'text-[15px] sm:text-[14.4px]'} mx-0.5`}>
      {text}
    </p>
  </motion.div>
);

const CVDownloadButton = ({ onClick }) => (
  <motion.button
    onClick={onClick}
    className='flex items-center mt-2 sm:mt-0 px-6 sm:px-5 gap-1 bg-neutral-300/90 sm:bg-neutral-400/90 hover:bg-neutral-700 pr-6 sm:pr-4 py-1.5 sm:py-1 rounded-full w-fit transition-all duration-300 ease-in-out cursor-pointer group'
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 1.1, duration: 0.5 }}
  >
    <div className='py-2 rounded-full border-neutral-800 group-hover:border-neutral-400/80 transition-colors duration-300'>
      <Download size={17.5} className='text-neutral-950/90 group-hover:text-neutral-300 transition-colors duration-300' />
    </div>
    <p className='text-neutral-950 group-hover:text-neutral-200/80 text-[14.8px] sm:text-[15px] mx-0.5 transition-colors duration-300'>
      Download CV
    </p>
  </motion.button>
);

export default About;