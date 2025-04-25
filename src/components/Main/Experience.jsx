import React, { useEffect, useRef } from 'react';
import ExperienceTimeline from './ExperienceTimeline';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const titleRef = useRef(null);
  const timelineRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation for title
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      });

      // Animation for the timeline
      gsap.from(timelineRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative bg-gray-50 px-7 sm:px-6 md:px-12 lg:px-15 flex flex-col pt-5 pb-12 sm:pt-10 sm:pb-16 md:pt-16 md:pb-10" 
      id="experince"
    >
      {/* Heading */}
      <h3
        ref={titleRef}
        className="text-lg sm:text-xl md:text-lg font-bold border-blue-900 border-b-2 pb-1 mb-6 sm:mb-7 w-fit mx-auto text-center z-10 relative"
      >
        Experience
      </h3>

      {/* Timeline */}
      <div
        ref={timelineRef}
        className="z-10 w-full"
      >
        <ExperienceTimeline />
      </div>
    </section>
  );
};

export default Experience;