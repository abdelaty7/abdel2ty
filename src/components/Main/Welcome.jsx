  import React, { useEffect, useRef, useState } from 'react';
  import { TypeAnimation } from 'react-type-animation';
  import gsap from 'gsap';
  import { FaBars, FaTimes } from 'react-icons/fa';

  const Welcome = () => {
    const heroRef = useRef(null);
    const textRef = useRef(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' }
      );
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, delay: 0.6, duration: 1, ease: 'power2.out' }
      );
    }, []);

    const navLinks = ['about', 'experince', 'portfolio', 'contact'];

    useEffect(() => {
      const handleScroll = () => {
        const sections = navLinks.map((id) => document.getElementById(id));
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        for (let section of sections) {
          if (section) {
            const offsetTop = section.offsetTop;
            const offsetHeight = section.offsetHeight;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(section.id);
              break;
            }
          }
        }
      };

      window.addEventListener('scroll', handleScroll);
      handleScroll();

      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScrollToSection = (id) => {
      const section = document.getElementById(id);
      if (section) {
        const yOffset = window.innerWidth < 640 ? -80 : -55;
        const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({
          top: y,
          behavior: 'smooth',
        });
      }
      setMenuOpen(false);
    };

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
      <div className="relative text-white overflow-hidden">
        {/* Navbar */}
        <nav className="w-full px-7 sm:px-15 py-4 flex items-center justify-between fixed bg-black bg-opacity-80 backdrop-blur-md z-50">
          <div className="text-2xl font-bold cursor-pointer" onClick={scrollToTop}>MyPortfolio</div>

          <div className="block sm:hidden text-xl cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>

          <ul className="hidden sm:flex gap-6 text-sm">
            {navLinks.map((section) => (
              <li key={section} className="relative group">
                <button
                  onClick={() => handleScrollToSection(section)}
                  className={`transition duration-300 ${activeSection === section ? 'text-white' : ''}`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                  <span
                    className={`absolute left-0 -bottom-1 w-full h-0.5 bg-white transition-transform duration-300 ease-out ${
                      activeSection === section ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    } origin-left`}
                  ></span>
                </button>
              </li>
            ))}
          </ul>

          {menuOpen && (
            <div className="fixed inset-0 top-16 bg-black bg-opacity-90 z-40 sm:hidden">
              <ul className="flex flex-col bg-gray-100 font-semibold text-black items-center gap-0.5 py-3 m-1.5 shadow-md rounded-md text-sm">
                {navLinks.map((section) => (
                  <li key={section} className="cursor-pointe">
                    <button onClick={() => handleScrollToSection(section)} className="py-2 px-4">
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section
          ref={heroRef}
          className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-gradient-to-br from-blue-950 via-black to-black pt-20 relative"
        >
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] bg-[size:20px_20px] z-0" />
          <div className="absolute w-40 h-40 md:w-52 lg:w-64 md:h-52 lg:h-64 bg-blue-700/30 rounded-full blur-3xl z-0 animate-pulse" />

          <div ref={textRef} className="relative z-10 max-w-3xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
              Muhammad Essam
            </h1>

            <h2 className="text-xs sm:text-sm text-gray-400 mt-3 uppercase tracking-wider">
              Full-Stack Developer · Creative Coder · Visionary
            </h2>

            <div className="mt-4 text-gray-300 text-base">
              <TypeAnimation
                sequence={[
                  'Full-Stack Developer',
                  2000,
                  'WordPress Developer',
                  2000,
                  'Backend Node.js',
                  2000,
                  'Frontend React.js',
                  2000,
                ]}
                speed={50}
                wrapper="span"
                className="inline-block"
                repeat={Infinity}
              />
            </div>

            <p className="mt-6 text-gray-500 text-sm max-w-3xl mx-auto">
              I build clean and scalable web solutions with intuitive UI and reliable backend systems. Let’s create something awesome.
            </p>

            <div className="mt-6 flex justify-center gap-4">
            <div className="mt-6 sm:mt-8 md:mt-5 flex justify-center items-center gap-4 flex-wrap">
              <a href="/cv.pdf" download>
                <button className="relative h-10 sm:h-9.5 px-5 rounded cursor-pointer flex items-center border border-blue-900 bg-blue-800 overflow-hidden group">
                  <span className="transform transition-all duration-300 group-hover:opacity-0 text-white text-[12px] sm:text-[13px]">
                    Download CV?
                  </span>
                  <span className="absolute transform transition-all duration-300 inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-blue-900">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" className="w-5 sm:w-3 font-bold fill-white">
                      <path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z"></path>
                      <path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z"></path>
                      <path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z"></path>
                    </svg>
                    <span className="ml-2 text-white text-[12px] sm:text-[13px]">Download</span>
                  </span>
                </button>
              </a>

              <button
                onClick={() => handleScrollToSection('contact')}
                className="h-10 sm:h-9 px-5 cursor-pointer rounded border text-[12px] sm:text-[13px] border-white text-white hover:bg-gray-300 hover:border-gray-300 hover:text-black font-medium transition"
              >
                Hire Me
              </button>
            </div>
            </div>
          </div>
        </section>
      </div>
    );
  };

  export default Welcome;