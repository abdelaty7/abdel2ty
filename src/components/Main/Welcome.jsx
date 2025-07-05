import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedinIn,
  faGithub,
  faInstagram,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
import { 
  faMusic, 
  faVolumeUp, 
  faVolumeDown, 
  faVolumeMute, 
  faPause,
  faPlay,
  faBars,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

const Welcome = () => {
  const [shrapnelPieces, setShrapnelPieces] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolumeControls, setShowVolumeControls] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobileAudio, setShowMobileAudio] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Generate shrapnel pieces with wind-like flow
    const pieces = [];
    for (let i = 0; i < 25; i++) {
      // Bias X position toward left side (0-70% instead of 0-100%)
      const xBias = Math.random() < 0.8 ? Math.random() * 70 : 70 + Math.random() * 30;
      
      pieces.push({
        id: i,
        x: xBias,
        y: Math.random() * 100,
        rotation: Math.random() * 360,
        scale: 0.3 + Math.random() * 0.6,
        duration: 8 + Math.random() * 6,
        delay: 0,
        type: Math.floor(Math.random() * 8),
        windX: 0.8 + Math.random() * 0.4,
        windY: -0.3 + Math.random() * 0.6,
        amplitude: 20 + Math.random() * 35,
        waveOffset: Math.random() * Math.PI * 2,
        rotationSpeed: 0.3 + Math.random() * 0.7,
      });
    }
    setShrapnelPieces(pieces);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (isMuted && volume === 0) {
      setVolume(50); // Set to 50% when unmuting if volume is 0
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (newVolume > 0) {
      setIsMuted(false);
    }
  };

  const increaseVolume = () => {
    const newVolume = Math.min(100, volume + 10);
    handleVolumeChange(newVolume);
  };

  const decreaseVolume = () => {
    const newVolume = Math.max(0, volume - 10);
    handleVolumeChange(newVolume);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleMobileAudio = () => {
    setShowMobileAudio(!showMobileAudio);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const ShrapnelPiece = ({ piece }) => {
    const shrapnelShapes = [
      // Sharp triangular shard
      <svg width="16" height="32" viewBox="0 0 16 32" className="drop-shadow-lg">
        <path
          d="M8 2L14 10L12 18L8 30L4 18L2 10L8 2Z"
          fill="url(#metalGradient1)"
          stroke="#555"
          strokeWidth="0.5"
        />
      </svg>,
      // Jagged blade
      <svg width="20" height="28" viewBox="0 0 20 28" className="drop-shadow-lg">
        <path
          d="M3 26L8 2L12 8L10 14L15 18L13 24L8 22L5 26L3 26Z"
          fill="url(#metalGradient2)"
          stroke="#555"
          strokeWidth="0.5"
        />
      </svg>,
      // Sharp angular fragment
      <svg width="24" height="20" viewBox="0 0 24 20" className="drop-shadow-lg">
        <path
          d="M2 18L22 2L20 8L16 6L12 12L8 16L4 18L2 18Z"
          fill="url(#metalGradient3)"
          stroke="#555"
          strokeWidth="0.5"
        />
      </svg>,
      // Pointed shard
      <svg width="14" height="36" viewBox="0 0 14 36" className="drop-shadow-lg">
        <path
          d="M7 2L11 12L9 20L7 34L5 20L3 12L7 2Z"
          fill="url(#metalGradient4)"
          stroke="#555"
          strokeWidth="0.5"
        />
      </svg>,
      // Razor-like fragment
      <svg width="28" height="16" viewBox="0 0 28 16" className="drop-shadow-lg">
        <path
          d="M2 8L26 2L24 8L26 14L2 8Z"
          fill="url(#metalGradient1)"
          stroke="#555"
          strokeWidth="0.5"
        />
      </svg>,
      // Serrated edge piece
      <svg width="18" height="26" viewBox="0 0 18 26" className="drop-shadow-lg">
        <path
          d="M3 24L9 2L11 6L13 4L15 8L14 12L16 16L14 20L12 18L10 22L8 20L6 24L3 24Z"
          fill="url(#metalGradient2)"
          stroke="#555"
          strokeWidth="0.5"
        />
      </svg>,
      // Crystalline shard
      <svg width="22" height="22" viewBox="0 0 22 22" className="drop-shadow-lg">
        <path
          d="M11 2L19 7L17 11L19 15L11 20L3 15L5 11L3 7L11 2Z"
          fill="url(#metalGradient3)"
          stroke="#555"
          strokeWidth="0.5"
        />
      </svg>,
      // Splintered piece
      <svg width="16" height="30" viewBox="0 0 16 30" className="drop-shadow-lg">
        <path
          d="M8 2L12 8L10 12L14 16L12 20L8 28L4 20L2 16L6 12L4 8L8 2Z"
          fill="url(#metalGradient4)"
          stroke="#555"
          strokeWidth="0.5"
        />
      </svg>
    ];

    return (
      <div
        className="absolute pointer-events-none opacity-40"
        style={{
          left: `${piece.x}%`,
          top: `${piece.y}%`,
          transform: `rotate(${piece.rotation}deg) scale(${piece.scale})`,
          animation: `
            windFlow-${piece.id} ${piece.duration}s infinite linear,
            gentleRotate-${piece.id} ${piece.duration * 2}s infinite linear,
            waveMotion-${piece.id} ${piece.duration * 0.6}s infinite ease-in-out
          `,
        }}
      >
        {shrapnelShapes[piece.type]}
      </div>
    );
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Audio element */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src="/background-music.mp3" type="audio/mpeg" />
        <source src="/calm-music.ogg" type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>

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

      {/* Background image */}
      <img
        src="/welcome.jpg"
        alt="welcome image"
        className="w-full h-full object-cover"
      />

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden fixed top-6 left-6 z-50 px-4 py-3 bg-neutral-900/85 text-neutral-200 rounded-lg shadow-lg"
      >
        <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} className="text-lg" />
      </button>

      {/* Mobile Audio Button */}
      <button
        onClick={toggleMobileAudio}
        className="md:hidden fixed top-6 right-6 z-50 px-4 py-3 bg-neutral-900/85 text-neutral-300 rounded-lg shadow-lg"
      >
        <FontAwesomeIcon icon={faMusic} className="text-lg" />
      </button>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden fixed inset-0 z-80 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/70" onClick={toggleMobileMenu}></div>
        <div className={`absolute left-0 top-0 h-full w-80 bg-neutral-900/95 backdrop-blur-sm transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-8 pt-20">
            <ul className="space-y-4 text-neutral-300">
              <li>
                <a 
                  href="#about" 
                  onClick={handleLinkClick}
                  className="block text-2xl hover:text-white transition-colors duration-300 py-2 font"
                >
                  01. About Me
                </a>
              </li>
              <li>
                <a 
                  href="#skills" 
                  onClick={handleLinkClick}
                  className="block text-2xl hover:text-white transition-colors duration-300 py-2 font"
                >
                  02. Skills
                </a>
              </li>
              <li>
                <a 
                  href="#projects" 
                  onClick={handleLinkClick}
                  className="block text-2xl hover:text-white transition-colors duration-300 py-2 font"
                >
                  03. Projects
                </a>
              </li>
              <li>
                <a 
                  href="#experience" 
                  onClick={handleLinkClick}
                  className="block text-2xl hover:text-white transition-colors duration-300 py-2 font"
                >
                  04. Experience
                </a>
              </li>
              <li>
                <a 
                  href="#certifications" 
                  onClick={handleLinkClick}
                  className="block text-2xl hover:text-white transition-colors duration-300 py-2 font"
                >
                  05. Certifications
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  onClick={handleLinkClick}
                  className="block text-2xl hover:text-white transition-colors duration-300 py-2 font"
                >
                  06. Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Desktop Music & Volume Controls */}
      <div className="hidden md:block absolute top-6 right-6 z-30 w-50 bg-neutral-900/90 rounded-2xl p-4 shadow-xl space-y-4">
        {/* Play / Pause Button */}
        <button
          onClick={toggleMusic}
          className="w-full text-[13.8px] px-3 py-2 rounded-md transition-all duration-300 flex items-center justify-center bg-neutral-800/90 text-neutral-400/65 hover:bg-neutral-700/50 hover:text-neutral-200"
        >
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} className="mr-2 text-[12px]" />
          {isPlaying ? 'Pause Music' : 'Play Music'}
        </button>

        {/* Volume Slider */}
        <div className="flex items-center gap-3">
          <FontAwesomeIcon icon={faVolumeDown} className="text-neutral-500 text-[13px]" />
          <div className="relative w-full h-1 bg-neutral-500/30 rounded-full">
            <div
              className="absolute h-1 bg-neutral-400/70 rounded-full"
              style={{ width: `${isMuted ? 0 : volume}%` }}
            ></div>
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={isMuted ? 0 : volume}
              onChange={(e) => handleVolumeChange(Number(e.target.value))}
              className="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer"
            />
          </div>
          <FontAwesomeIcon icon={faVolumeUp} className="text-neutral-500 text-[13px]" />
        </div>

        {/* Mute Button */}
        <button
          onClick={toggleMute}
          className={`w-full text-[13.5px] px-3 py-2 rounded-md transition-all duration-300 ${
            isMuted
              ? 'bg-red-500/60 text-neutral-300/80 hover:bg-red-600/90'
              : 'w-full px-3 py-2 rounded-md transition-all duration-300 flex items-center justify-center bg-neutral-800/90 text-neutral-400/65 hover:bg-neutral-700/50 hover:text-neutral-200'
          }`}
        >
          <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} className="mr-2 text-[11.5px]" />
          {isMuted ? 'Unmute' : 'Mute'}
        </button>
      </div>

      {/* Mobile Audio Controls */}
      <div className={`md:hidden fixed top-20 right-6 z-40 transition-all duration-300 ${showMobileAudio ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="bg-neutral-900/85 backdrop-blur-sm rounded-xl p-4 shadow-xl space-y-4 min-w-[220px]">
          {/* Play / Pause Button */}
          <button
            onClick={toggleMusic}
            className="w-full text-[15px] px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-center bg-neutral-800/90 text-neutral-300 hover:bg-neutral-700/50 hover:text-neutral-100"
          >
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} className="mr-3 text-[12.5px]" />
            {isPlaying ? 'Pause Music' : 'Play Music'}
          </button>

          {/* Volume Controls */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <button
                onClick={decreaseVolume}
                className="p-2 bg-neutral-800/90 text-neutral-300 rounded-lg hover:bg-neutral-700/50 transition-colors"
              >
                <FontAwesomeIcon icon={faVolumeDown} className="text-[14px]" />
              </button>
              <div className="flex-1 px-2">
                <div className="relative h-1.5 bg-neutral-500/30 rounded-full">
                  <div
                    className="absolute h-1.5 bg-neutral-400/70 rounded-full"
                    style={{ width: `${isMuted ? 0 : volume}%` }}
                  ></div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={1}
                    value={isMuted ? 0 : volume}
                    onChange={(e) => handleVolumeChange(Number(e.target.value))}
                    className="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer"
                  />
                </div>
              </div>
              <button
                onClick={increaseVolume}
                className="p-2 bg-neutral-800/90 text-neutral-300 rounded-lg hover:bg-neutral-700/50 transition-colors"
              >
                <FontAwesomeIcon icon={faVolumeUp} className="text-[14px]" />
              </button>
            </div>

            {/* Mute Button */}
            <button
              onClick={toggleMute}
              className={`w-full text-[15px] px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-center ${
                isMuted
                  ? 'bg-red-500/60 text-neutral-200 hover:bg-red-600/90'
                  : 'bg-neutral-800/90 text-neutral-300 hover:bg-neutral-700/50 hover:text-neutral-100'
              }`}
            >
              <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} className="mr-3 text-[12.5px]" />
              {isMuted ? 'Unmute' : 'Mute'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:block absolute top-0 left-0 w-full h-full bg-black/25 flex items-start justify-start">
        <ul className='text-neutral-300/85 flex gap-4.5 text-[27px] py-12 px-12 flex-col font-medium tracking-wide'>
          <li>
            <a href="#about" className="font transition-all duration-300 ease-in-out hover:translate-x-3.5 hover:text-neutral-100 cursor-pointer block relative before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-0.5 before:w-0 before:bg-neutral-300 before:transition-all before:duration-300 hover:before:w-37">
              01. About Me
            </a>
          </li>
          <li>
            <a href="#skills" className="font transition-all duration-300 ease-in-out hover:translate-x-3.5 hover:text-neutral-100 cursor-pointer block relative before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-0.5 before:w-0 before:bg-neutral-300 before:transition-all before:duration-300 hover:before:w-27">
              02. Skills
            </a>
          </li>
          <li>
            <a href="#projects" className="font transition-all duration-300 ease-in-out hover:translate-x-3.5 hover:text-neutral-100 cursor-pointer block relative before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-0.5 before:w-0 before:bg-neutral-300 before:transition-all before:duration-300 hover:before:w-32">
              03. Projects
            </a>
          </li>
          <li>
            <a href="#experience" className="font transition-all duration-300 ease-in-out hover:translate-x-3.5 hover:text-neutral-100 cursor-pointer block relative before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-0.5 before:w-0 before:bg-neutral-300 before:transition-all before:duration-300 hover:before:w-39.5">
              04. Experience
            </a>
          </li>
          <li>
            <a href="#certifications" className="font transition-all duration-300 ease-in-out hover:translate-x-3.5 hover:text-neutral-100 cursor-pointer block relative before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-0.5 before:w-0 before:bg-neutral-300 before:transition-all before:duration-300 hover:before:w-46.5">
              05. Certifications
            </a>
          </li>
          <li>
            <a href="#contact" className="font transition-all duration-300 ease-in-out hover:translate-x-3.5 hover:text-neutral-100 cursor-pointer block relative before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-0.5 before:w-0 before:bg-neutral-300 before:transition-all before:duration-300 hover:before:w-31.5">
              06. Contact
            </a>
          </li>
        </ul>
      </div>

      {/* Social media icons */}
      <div className="absolute bottom-11 sm:bottom-10 left-1/2 transform -translate-x-1/2 sm:left-auto sm:-right-83 w-1/2 h-full flex items-end sm:justify-end justify-center z-10">
        <div className="flex gap-4 sm:gap-3.5 mx-6 text-neutral-300 sm:text-neutral-300/80">
          <a href="https://www.linkedin.com/in/abdel2ty/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedinIn} className="hover:text-neutral-300 hover:bg-neutral-700/80 text-[20.5px] sm:text-[20px] transition-all duration-300 ease-in-out hover:-translate-y-2.5 p-3.5 sm:p-3 bg-neutral-800/85 sm:bg-neutral-800/75 rounded-full" />
          </a>
          <a href="https://github.com/abdelaty7" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} className="hover:text-neutral-300 hover:bg-neutral-700/80 text-[20.5px] sm:text-[21px] transition-all duration-300 ease-in-out hover:-translate-y-2.5 p-3.5 sm:p-3 bg-neutral-800/85 sm:bg-neutral-800/75 rounded-full" />
          </a>
          <a href="https://instagram.com/lil__de7k" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} className="hover:text-neutral-300 hover:bg-neutral-700/80 text-[20.5px] sm:text-[21px] transition-all duration-300 ease-in-out hover:-translate-y-2.5 p-3.5 sm:p-3 bg-neutral-800/85 sm:bg-neutral-800/75 rounded-full" />
          </a>
          <a href="https://wa.me/201012857997" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faWhatsapp} className="hover:text-neutral-300 hover:bg-neutral-700/80 text-[20.5px] sm:text-[22px] transition-all duration-300 ease-in-out hover:-translate-y-2.5 p-3.5 sm:p-3 bg-neutral-800/85 sm:bg-neutral-800/75 rounded-full" />
          </a>
        </div>
      </div>

      {/* Dynamic CSS animations for each piece */}
      <style jsx>{`
        ${shrapnelPieces.map(piece => `
          @keyframes windFlow-${piece.id} {
            0% {
              transform: translateY(0px) translateX(-20px);
            }
            100% {
              transform: translateY(${piece.windY * 120}px) translateX(${180 + piece.windX * 150}px);
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
              transform: translateY(${Math.sin(piece.waveOffset) * piece.amplitude * 0.4}px) translateX(0px);
            }
            25% {
              transform: translateY(${Math.sin(piece.waveOffset + Math.PI/2) * piece.amplitude * 0.6}px) translateX(${Math.cos(piece.waveOffset + Math.PI/2) * piece.amplitude * 0.3}px);
            }
            50% {
              transform: translateY(${Math.sin(piece.waveOffset + Math.PI) * piece.amplitude * 0.5}px) translateX(${Math.cos(piece.waveOffset + Math.PI) * piece.amplitude * 0.4}px);
            }
            75% {
              transform: translateY(${Math.sin(piece.waveOffset + Math.PI * 1.5) * piece.amplitude * 0.3}px) translateX(${Math.cos(piece.waveOffset + Math.PI * 1.5) * piece.amplitude * 0.2}px);
            }
          }
        `).join('')}
      `}</style>
    </div>
  );
};

export default Welcome;