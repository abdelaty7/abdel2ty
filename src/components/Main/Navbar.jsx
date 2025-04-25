import React, { useEffect, useRef, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollToTop = () => {
  const buttonRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Go to top function
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  useEffect(() => {
    // Create scroll trigger to show/hide button
    const showButton = ScrollTrigger.create({
      start: "100px top", // Show after scrolling 100px
      onEnter: () => setIsVisible(true),
      onLeaveBack: () => setIsVisible(false)
    });

    // GSAP animation for button appearance
    const ctx = gsap.context(() => {
      gsap.fromTo(
        buttonRef.current,
        { 
          opacity: 0, 
          y: 20,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
          paused: true
        }
      );
    });

    // Handle resize for responsive behavior
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      showButton.kill();
      ctx.revert();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Animation effect when visibility changes
  useEffect(() => {
    if (buttonRef.current) {
      if (isVisible) {
        gsap.to(buttonRef.current, { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        gsap.to(buttonRef.current, { 
          opacity: 0, 
          y: 20, 
          scale: 0.8,
          duration: 0.2,
          ease: "power2.in"
        });
      }
    }
  }, [isVisible]);

  return (
    <button
      ref={buttonRef}
      aria-label="Scroll to top"
      className={`fixed z-50 flex items-center justify-center bottom-3 sm:bottom-5 md:bottom-6 lg:bottom-4
                right-3 sm:right-5 md:right-6 lg:right-4
                h-9 w-9 sm:h-10 sm:w-10 md:h-10 md:w-10
                bg-blue-800 hover:bg-blue-700 
                p-2 sm:p-2 md:p-2
                rounded-full cursor-pointer 
                shadow-lg hover:shadow-xl
                transition-colors duration-300 
                opacity-0`}
      onClick={scrollToTop}
    >
      <FaArrowUp className="text-white text-xs sm:text-sm md:text-xs" />
    </button>
  );
};

export default ScrollToTop;