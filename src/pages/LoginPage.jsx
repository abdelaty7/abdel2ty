import React, { useState, useRef, useEffect, useCallback } from 'react';
import { User, Lock, Eye, EyeOff, LogIn, Shield } from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [failureMessage, setFailureMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [shrapnelPieces, setShrapnelPieces] = useState([]);

  const titleRef = useRef(null);
  const formRef = useRef(null);
  const successRef = useRef(null);

  // Navigation function
  const navigateToRoute = (route) => {
    if (typeof window !== 'undefined') {
      // For client-side navigation
      if (window.history && window.history.pushState) {
        window.history.pushState({}, '', route);
        // Trigger a custom event for route change
        window.dispatchEvent(new PopStateEvent('popstate'));
      } else {
        // Fallback to full page redirect
        window.location.href = route;
      }
    }
  };

  useEffect(() => {
    // Check if animations have already been played
    const hasAnimated = window.sessionStorage?.getItem('loginAnimated');
    if (hasAnimated) {
      // If already animated, just show elements without animation
      const elements = [titleRef.current, formRef.current].filter(Boolean);
      elements.forEach((el) => {
        if (el) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      });
    } else {
      // Mark as animated and run animations
      if (window.sessionStorage) {
        window.sessionStorage.setItem('loginAnimated', 'true');
      }
      
      // Simple fade-in animation
      const elements = [titleRef.current, formRef.current].filter(Boolean);
      
      elements.forEach((el, index) => {
        if (el) {
          el.style.opacity = '0';
          el.style.transform = 'translateY(20px)';
          el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
          
          setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, index * 200);
        }
      });
    }

    // Generate shrapnel pieces with wind-like flow
    const pieces = [];
    for (let i = 0; i < 20; i++) {
      const xBias = Math.random() * 100;
      
      pieces.push({
        id: i,
        x: xBias,
        y: Math.random() * 100,
        rotation: Math.random() * 360,
        scale: 0.3 + Math.random() * 0.6,
        duration: 12 + Math.random() * 10,
        delay: 0,
        type: Math.floor(Math.random() * 8),
        windX: 0.5 + Math.random() * 0.6,
        windY: -0.3 + Math.random() * 0.6,
        amplitude: 12 + Math.random() * 35,
        waveOffset: Math.random() * Math.PI * 2,
        rotationSpeed: 0.15 + Math.random() * 0.7,
      });
    }
    setShrapnelPieces(pieces);
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFailureMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch('https://muhammads-server.vercel.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          email: formData.email, 
          password: formData.password 
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setFailureMessage(data.message || 'Login failed');
        return;
      }

      // Store token in memory for this session
      // In a real app, you would store this in localStorage or a secure cookie
      window.authToken = data.token;
      
      setSuccessMessage('Login successful! Redirecting...');
      
      if (successRef.current) {
        successRef.current.style.opacity = '0';
        successRef.current.style.transform = 'translateY(10px)';
        successRef.current.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
          successRef.current.style.opacity = '1';
          successRef.current.style.transform = 'translateY(0)';
        }, 100);
      }

      // Redirect to admin inbox after successful login
      setTimeout(() => {
        navigateToRoute('/admin/inbox');
        setSuccessMessage('');
      }, 2000);

    } catch (error) {
      console.error('Login error:', error);
      setFailureMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const ShrapnelPiece = ({ piece }) => {
    const shrapnelShapes = [
      // Sharp triangular shard
      <svg key={0} width="16" height="32" viewBox="0 0 16 32" className="drop-shadow-lg">
        <path
          d="M8 2L14 10L12 18L8 30L4 18L2 10L8 2Z"
          fill="url(#metalGradient1)"
          stroke="#555"
          strokeWidth="0.5"
        />
      </svg>,
      // Jagged blade
      <svg key={1} width="20" height="28" viewBox="0 0 20 28" className="drop-shadow-lg">
        <path
          d="M3 26L8 2L12 8L10 14L15 18L13 24L8 22L5 26L3 26Z"
          fill="url(#metalGradient2)"
          stroke="#555"
          strokeWidth="0.5"
        />
      </svg>,
      // Sharp angular fragment
      <svg key={2} width="24" height="20" viewBox="0 0 24 20" className="drop-shadow-lg">
        <path
          d="M2 18L22 2L20 8L16 6L12 12L8 16L4 18L2 18Z"
          fill="url(#metalGradient3)"
          stroke="#555"
          strokeWidth="0.5"
        />
      </svg>,
      // Pointed shard
      <svg key={3} width="14" height="36" viewBox="0 0 14 36" className="drop-shadow-lg">
        <path
          d="M7 2L11 12L9 20L7 34L5 20L3 12L7 2Z"
          fill="url(#metalGradient4)"
          stroke="#555"
          strokeWidth="0.5"
        />
      </svg>,
      // Razor-like fragment
      <svg key={4} width="28" height="16" viewBox="0 0 28 16" className="drop-shadow-lg">
        <path
          d="M2 8L26 2L24 8L26 14L2 8Z"
          fill="url(#metalGradient1)"
          stroke="#555"
          strokeWidth="0.5"
        />
      </svg>,
      // Serrated edge piece
      <svg key={5} width="18" height="26" viewBox="0 0 18 26" className="drop-shadow-lg">
        <path
          d="M3 24L9 2L11 6L13 4L15 8L14 12L16 16L14 20L12 18L10 22L8 20L6 24L3 24Z"
          fill="url(#metalGradient2)"
          stroke="#555"
          strokeWidth="0.5"
        />
      </svg>,
      // Crystalline shard
      <svg key={6} width="22" height="22" viewBox="0 0 22 22" className="drop-shadow-lg">
        <path
          d="M11 2L19 7L17 11L19 15L11 20L3 15L5 11L3 7L11 2Z"
          fill="url(#metalGradient3)"
          stroke="#555"
          strokeWidth="0.5"
        />
      </svg>,
      // Splintered piece
      <svg key={7} width="16" height="30" viewBox="0 0 16 30" className="drop-shadow-lg">
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
        className="absolute pointer-events-none opacity-20"
        style={{
          left: `${piece.x}%`,
          top: `${piece.y}%`,
          transform: `rotate(${piece.rotation}deg) scale(${piece.scale})`,
          animation: `
            windFlow-${piece.id} ${piece.duration}s infinite linear,
            gentleRotate-${piece.id} ${piece.duration * 2}s infinite linear,
            waveMotion-${piece.id} ${piece.duration * 0.7}s infinite ease-in-out
          `,
        }}
      >
        {shrapnelShapes[piece.type]}
      </div>
    );
  };

  return (
    <div className="min-h-screen relative bg-neutral-950 flex items-center justify-center px-5 overflow-hidden">
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

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-5 sm:mb-6">
          <div className="flex items-center justify-center mb-2">
            <Shield className="w-8 h-9 sm:w-9 sm:h-9 text-neutral-300 mr-2" />
            <h1 className="text-neutral-300 text-2xl sm:font-bold">ADMIN LOGIN</h1>
          </div>
          <p className="text-neutral-400 text-[14px] sm:text-sm">
            Admin login to manage contact form messages.
          </p>
        </div>

        {/* Login Form */}
        <div ref={formRef} className="bg-neutral-800/80 backdrop-blur-sm border border-neutral-700/40 p-5 sm:p-8 shadow-xl">
          <div className="space-y-4">
            
            {/* Email Field */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="w-4 h-4 text-neutral-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-neutral-700/80 rounded-md text-neutral-300 text-[14px] placeholder-gray-400 focus:outline-none transition-all duration-200"
                  placeholder="Enter The email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-4 h-4 text-neutral-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-2.5 bg-neutral-700/80 rounded-md text-neutral-300 text-[14px] placeholder-gray-400 focus:outline-none transition-all duration-200"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4.5 h-4.5" />
                  ) : (
                    <Eye className="w-4.5 h-4.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              onClick={handleLogin}
              className="w-full py-2.5 mt-6 text-[14px] bg-neutral-300 hover:bg-neutral-400 text-neutral-900 rounded-md transition-all duration-200 ease-in-out cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2 font-medium"
              disabled={isSubmitting}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Logging in...' : 'Login'}</span>
            </button>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div
              ref={successRef}
              className="mt-6 p-3 text-center text-sm text-green-500 bg-green-900/20 rounded-lg font-medium border border-green-700"
            >
              <p>{successMessage}</p>
            </div>
          )}

          {/* Error Message */}
          {failureMessage && (
            <div className="mt-6 p-3 text-center text-sm text-red-500 bg-red-900/20 rounded-lg font-medium border border-red-700">
              <p>{failureMessage}</p>
            </div>
          )}
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
              transform: translateY(${piece.windY * 120}px) translateX(${200 + piece.windX * 180}px);
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
              transform: translateY(${Math.sin(piece.waveOffset) * piece.amplitude * 0.3}px) translateX(0px);
            }
            25% {
              transform: translateY(${Math.sin(piece.waveOffset + Math.PI/2) * piece.amplitude * 0.5}px) translateX(${Math.cos(piece.waveOffset + Math.PI/2) * piece.amplitude * 0.25}px);
            }
            50% {
              transform: translateY(${Math.sin(piece.waveOffset + Math.PI) * piece.amplitude * 0.4}px) translateX(${Math.cos(piece.waveOffset + Math.PI) * piece.amplitude * 0.35}px);
            }
            75% {
              transform: translateY(${Math.sin(piece.waveOffset + Math.PI * 1.5) * piece.amplitude * 0.2}px) translateX(${Math.cos(piece.waveOffset + Math.PI * 1.5) * piece.amplitude * 0.15}px);
            }
          }
        `).join('')}
      `}</style>
    </div>
  );
};

export default LoginPage;