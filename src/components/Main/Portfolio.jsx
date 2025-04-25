import React, { useState, useMemo, useEffect, useRef } from 'react';
// Components
import PortfolioCategory from './PortfolioCategory';
import PortfolioCards from './PortfolioCards';
import { projects } from '../../data';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const [filteredCategory, setFilteredCategory] = useState("All");

  const titleRef = useRef(null);
  const categoryRef = useRef(null);
  const cardsRef = useRef(null);

  const allCategory = useMemo(() => ['All', ...new Set(projects.map((i) => i.category))], []);

  const categoriesFilter = (cat) => {
    setFilteredCategory(cat);
  };

  const filteredData = useMemo(() => {
    if (filteredCategory === "All") {
      return projects;
    } else {
      return projects.filter((item) => item.category === filteredCategory);
    }
  }, [filteredCategory]);

  useEffect(() => {
    // Create a media query for mobile devices
    const mobileQuery = window.matchMedia('(max-width: 640px)');
    
    const setupAnimations = () => {
      const ctx = gsap.context(() => {
        // Adjust animation values for different screen sizes
        const yOffset = mobileQuery.matches ? 30 : 50;
        const duration = mobileQuery.matches ? 0.8 : 1;
        
        gsap.from(titleRef.current, {
          opacity: 0,
          y: yOffset,
          duration: duration,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.from(categoryRef.current, {
          opacity: 0,
          y: yOffset,
          duration: duration,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: categoryRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.from(cardsRef.current, {
          opacity: 0,
          y: yOffset,
          duration: duration,
          delay: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      });
      
      return ctx;
    };
    
    // Initial setup
    const ctx = setupAnimations();
    
    // Update animations if screen size changes
    const handleResize = () => {
      ctx.revert();
      setupAnimations();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      ctx.revert();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div 
      className="relative bg-gray-50 px-4 sm:px-6 md:px-12 lg:px-15 flex flex-col pt-5 pb-12 sm:pt-10 sm:pb-16 md:pt-16 md:pb-10" 
      id='portfolio'
    >
      <h3 
        ref={titleRef} 
        className='text-lg sm:text-xl md:text-lg font-bold border-blue-900 border-b-2 pb-1 mb-6 sm:mb-7 w-fit mx-auto text-center z-10 relative'
      >
        Portfolio
      </h3>

      <div ref={categoryRef} className="z-10 w-full overflow-x-auto">
        <PortfolioCategory categoriesFilter={categoriesFilter} allCategory={allCategory} />
      </div>

      <div 
        ref={cardsRef} 
        className="mt-4 sm:mt-5 z-10 w-full"
      >
        <PortfolioCards data={filteredData} />
      </div>
    </div>
  );
};

export default Portfolio;