import React from 'react';
import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';

// Animation Variants (نفس اللي في Portfolio)
const circleVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const titleVariants = {
  initial: { y: -30, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const underlineVariants = {
  initial: { width: 0, opacity: 0 },
  animate: {
    width: '4rem',
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const cardsVariants = {
  initial: { y: 50, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// بيانات الشهادات
const certifications = [
  {
    id: 1,
    title: 'Web III Pathline',
    image: '/pathline.png',
    pdf: '/pathline.pdf',
  },
];

const Certification = () => {
  return (
    <div className="relative bg-neutral-800 overflow-hidden flex justify-center px-5" id="certifications">
      {/* دوائر الخلفية */}
      <motion.div
        className="absolute -right-35 -top-20 w-90 h-90 sm:w-125 sm:h-125 bg-neutral-700/50 rounded-full"
        variants={circleVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
      />
      <motion.div
        className="absolute -left-35 -bottom-40 w-90 h-90 sm:w-125 sm:h-125 bg-neutral-700/50 rounded-full z-0"
        variants={circleVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
      />

      {/* محتوى القسم */}
      <motion.div
        className="flex flex-col items-center w-full max-w-6xl py-15 sm:py-20 z-10"
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.p className="text-white text-[30px] mb-0.5 font" variants={titleVariants}>
          Certifications
        </motion.p>

        <motion.div className="w-16 h-1 bg-neutral-600 mb-8 rounded-full" variants={underlineVariants} />

        <motion.div className="w-full overflow-x-auto pb-5" variants={cardsVariants}>
          <div className="flex gap-5 min-w-max">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="relative w-[310px] h-[300px] bg-neutral-900 border border-neutral-800 rounded-md overflow-hidden shadow-xl group flex-shrink-0"
              >
                {/* صورة الشهادة */}
                <div className="relative h-[220px] overflow-hidden">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-700 via-transparent to-transparent"></div>
                </div>

                {/* محتوى الكارت */}
                <div className="absolute bottom-0 w-full p-4 bg-neutral-900/90 bg-opacity-95 backdrop-blur-sm border-t border-neutral-800">
                  <h3 className="text-white text-[16px] sm:text-[16.5px] mb-3">{cert.title}</h3>

                  <div className="flex justify-between items-center">
                    <a
                      href={cert.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-1.5 rounded-md text-[13.5px] font-medium transition-colors"
                    >
                      View PDF
                    </a>
                    <a
                      href={cert.pdf}
                      download
                      className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors text-[13.5px]"
                    >
                      <FaDownload className="text-[14px]" /> Download
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Certification;