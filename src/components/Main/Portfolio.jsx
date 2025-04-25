import React, { useState, useMemo, useEffect, useRef } from 'react';
// Components
import PortfolioCategory from './PortfolioCategory';
import PortfolioCards from './PortfolioCards';
import { projects } from '../../data';
import { gsap } from 'gsap';

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
    const hasAnimated = sessionStorage.getItem('portfolioAnimated');
    if (hasAnimated) return;

    sessionStorage.setItem('portfolioAnimated', 'true');

    const mobileQuery = window.matchMedia('(max-width: 640px)');
    const yOffset = mobileQuery.matches ? 30 : 50;
    const duration = mobileQuery.matches ? 0.8 : 1;

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: yOffset,
        duration,
        ease: "power3.out",
      });

      gsap.from(categoryRef.current, {
        opacity: 0,
        y: yOffset,
        duration,
        delay: 0.2,
        ease: "power3.out",
      });

      gsap.from(cardsRef.current, {
        opacity: 0,
        y: yOffset,
        duration,
        delay: 0.4,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
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