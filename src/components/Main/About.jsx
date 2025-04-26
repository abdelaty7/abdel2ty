import React, { useRef, useEffect } from 'react';
import SkillsBar from './SkillsBar';
import Marquee from "react-fast-marquee";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const textRef = useRef(null);
  const skillsRef = useRef(null);
  const marqueeRef = useRef(null);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = [
        headingRef.current,
        textRef.current,
        skillsRef.current,
        marqueeRef.current
      ];

      elements.forEach((el, i) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Technology icons with uniform structure
  const techIcons = [
    { src: "/html.svg", alt: "HTML5", title: "HTML5", className: "w-6 sm:w-8 md:w-7" },
    { src: "/css.svg", alt: "CSS3", title: "CSS3", className: "w-6 sm:w-8 md:w-7" },
    { src: "/js.svg", alt: "JavaScript", title: "JavaScript", className: "w-6 sm:w-8 md:w-6" },
    { src: "/ts.svg", alt: "TypeScript", title: "TypeScript", className: "w-6 sm:w-8 md:w-6" },
    { src: "/express.svg", alt: "Express", title: "Express.js", className: "w-6 sm:w-8 md:w-7" },
    { src: "/react-js.svg", alt: "React.js", title: "React.js", className: "w-6 sm:w-8 md:w-7.5" },
    { src: "/next.svg", alt: "Next.js", title: "Next.js", className: "w-6 sm:w-8 md:w-7" },
    { src: "/tailwind.svg", alt: "Tailwind CSS", title: "Tailwind CSS", className: "w-6 sm:w-8 md:w-8.5" },
    { src: "/material-ui.svg", alt: "Material UI", title: "Material UI", className: "w-6 sm:w-8 md:w-7" },
    { src: "/node.svg", alt: "Node.js", title: "Node.js", className: "w-6 sm:w-8 md:w-7" },
    { src: "/redux.svg", alt: "Redux", title: "Redux", className: "w-6 sm:w-8 md:w-7" },
    { src: "/mongo.svg", alt: "MongoDB", title: "MongoDB", className: "w-6 sm:w-8 md:w-7.5" },
    { src: "/git.svg", alt: "Git", title: "Git", className: "w-6 sm:w-8 md:w-7" },
    { src: "/docker.svg", alt: "Docker", title: "Docker", className: "w-6 sm:w-8 md:w-7" },
    { src: "/vercel.svg", alt: "Vercel", title: "Vercel", className: "w-6 sm:w-8 md:w-7" }
  ];

  return (
    <div
      ref={sectionRef}
      className="relative bg-gray-50 px-7 sm:px-6 md:px-12 lg:px-15 flex flex-col pt-15 pb-12 sm:pt-10 sm:pb-16 md:pt-15 md:pb-20"
      id="about"
    >
      {/* Heading */}
      <h3
        ref={headingRef}
        className="text-md sm:text-xl md:text-lg font-bold border-blue-900 border-b-2 pb-1 mb-4 sm:mb-7 w-fit mx-auto text-center z-10 relative"
      >
        About
      </h3>

      {/* Content */}
      <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-12 pb-8 sm:pb-10 relative z-10">
        {/* Text content */}
        <div
          ref={textRef}
          className="lg:w-3/4 text-sm sm:text-base md:text-sm leading-relaxed text-gray-950 space-y-4"
        >
          <p>
            I am a passionate Computer Science student with a deep interest in web development. Since the beginning of my studies, I have been dedicated to mastering the art of web development, and I have accumulated significant hands-on experience over time. This continuous learning process allows me to apply new skills and techniques to every project I take on, making me more confident and proficient with each passing day.
          </p>
          <p>
            One of my key strengths is my time management and commitment. I believe that discipline and consistency are essential to success in any field. Through these qualities, I have been able to reach an advanced level in front-end development, where I focus on creating user-friendly, visually appealing, and functional interfaces.
          </p>
          <p>
            Although I have strong skills in front-end development, I am constantly expanding my knowledge to include other aspects of web development, including back-end technologies, databases, and full-stack solutions. My goal is not just to complete projects but to ensure they are of the highest quality. I believe that the quality of the work is far more important than the quantity of projects undertaken.
          </p>
        </div>

        {/* Skills bar */}
        <div ref={skillsRef} className="lg:w-1/4">
          <SkillsBar />
        </div>
      </div>

      {/* Marquee */}
      <div ref={marqueeRef}>
        <Marquee direction="right" speed={25} pauseOnHover={true} className="z-10">
          {techIcons.map((icon, index) => (
            <img 
              key={index}
              className={`${icon.className} h-auto mx-3 sm:mx-5 md:mx-7`} 
              src={icon.src} 
              alt={icon.alt} 
              title={icon.title} 
            />
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default About;