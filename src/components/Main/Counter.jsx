import React, { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';
import { gsap } from 'gsap';

const Counter = () => {
  const [inView, setInView] = useState(false);
  const counterRef = useRef(null);
  const statsRef = useRef([]);

  // Intersection Observer to detect when counter is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.3 } // Start counting when 30% of element is visible
    );
    
    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, []);

  // GSAP animation when counter comes into view
  useEffect(() => {
    if (inView) {
      gsap.fromTo(
        statsRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.3, duration: 1 }
      );
    }
  }, [inView]);

  // Stats data to avoid repetition
  const statsData = [
    { value: 0, label: "Clients Served" },
    { value: 2, label: "Projects Delivered" },
    { value: 3, label: "Projects Completed" },
    { value: 1, label: "Successful Integrations" }
  ];

  return (
    <div className="bg-gray-50">
      <div
        ref={counterRef}
        className="relative bg-black px-4 pb-12 sm:px-8 md:px-12 lg:px-20 sm:mb-10 flex flex-col justify-center transition-all sm:rounded-br-3xl md:rounded-br-full"
      >
        {/* Background dots pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] bg-[size:20px_20px] z-0" />
        
        <div className="z-10 pb-6 sm:pb-8 md:pb-10 lg:pb-17 text-white">
          {/* Stats counter grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 lg:gap-8">
            {statsData.map((stat, index) => (
              <div
                key={index}
                ref={(el) => (statsRef.current[index] = el)}
                className="flex flex-col items-center"
              >
                <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-xl text-gray-300 font-bold">
                  {inView && (
                    <>
                      <CountUp start={0} end={stat.value} duration={3} />
                      <span>+</span>
                    </>
                  )}
                </h4>
                <p className="text-xs sm:text-sm md:text-xs text-gray-400 font-semibold pt-2 text-center">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counter;