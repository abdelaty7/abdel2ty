import React, { useEffect, useState, useRef } from 'react';
import { Trash2, Shield, LogOut, Mail, User, Calendar, MessageSquare } from 'lucide-react';

const AdminPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shrapnelPieces, setShrapnelPieces] = useState([]);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  // Navigation function for React Router
  const navigateToRoute = (route) => {
    if (typeof window !== 'undefined') {
      if (window.history && window.history.pushState) {
        window.history.pushState({}, '', route);
        window.dispatchEvent(new PopStateEvent('popstate'));
      } else {
        window.location.href = route;
      }
    }
  };

  useEffect(() => {
    // Check if animations have already been played
    const hasAnimated = window.sessionStorage?.getItem('adminAnimated');
    if (hasAnimated) {
      const elements = [titleRef.current, contentRef.current].filter(Boolean);
      elements.forEach((el) => {
        if (el) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      });
    } else {
      if (window.sessionStorage) {
        window.sessionStorage.setItem('adminAnimated', 'true');
      }
      
      const elements = [titleRef.current, contentRef.current].filter(Boolean);
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

    // Generate shrapnel pieces
    const pieces = [];
    for (let i = 0; i < 15; i++) {
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

    // Check authentication token
    const token = localStorage.getItem('token');
    if (!token) {
      navigateToRoute('/admin');
      return;
    }

    // Fetch messages using axios
    const fetchMessages = async () => {
      try {
        setLoading(true);
        
        // Using fetch as a substitute for axios since it's not available in this environment
        const response = await fetch('https://muhammads-server.vercel.app/api/messages', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }

        const data = await response.json();
        setMessages(data);
      } catch (err) {
        console.error('Error fetching messages:', err);
        navigateToRoute('/admin');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const deleteMessage = async (id) => {
    try {
      // Using fetch as a substitute for axios
      const response = await fetch(`https://muhammads-server.vercel.app/api/messages/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete message');
      }

      setMessages(messages.filter(msg => msg._id !== id));
    } catch (err) {
      console.error('Error deleting message:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    if (window.sessionStorage) {
      window.sessionStorage.removeItem('adminAnimated');
    }
    navigateToRoute('/admin');
  };

  const ShrapnelPiece = ({ piece }) => {
    const shrapnelShapes = [
      <svg key={0} width="16" height="32" viewBox="0 0 16 32" className="drop-shadow-lg">
        <path
          d="M8 2L14 10L12 18L8 30L4 18L2 10L8 2Z"
          fill="url(#metalGradient1)"
          stroke="#555"
          strokeWidth="0.5"
        />
      </svg>,
      <svg key={1} width="20" height="28" viewBox="0 0 20 28" className="drop-shadow-lg">
        <path
          d="M3 26L8 2L12 8L10 14L15 18L13 24L8 22L5 26L3 26Z"
          fill="url(#metalGradient2)"
          stroke="#555"
          strokeWidth="0.5"
        />
      </svg>,
      <svg key={2} width="24" height="20" viewBox="0 0 24 20" className="drop-shadow-lg">
        <path
          d="M2 18L22 2L20 8L16 6L12 12L8 16L4 18L2 18Z"
          fill="url(#metalGradient3)"
          stroke="#555"
          strokeWidth="0.5"
        />
      </svg>,
      <svg key={3} width="14" height="36" viewBox="0 0 14 36" className="drop-shadow-lg">
        <path
          d="M7 2L11 12L9 20L7 34L5 20L3 12L7 2Z"
          fill="url(#metalGradient4)"
          stroke="#555"
          strokeWidth="0.5"
        />
      </svg>,
      <svg key={4} width="28" height="16" viewBox="0 0 28 16" className="drop-shadow-lg">
        <path
          d="M2 8L26 2L24 8L26 14L2 8Z"
          fill="url(#metalGradient1)"
          stroke="#555"
          strokeWidth="0.5"
        />
      </svg>,
      <svg key={5} width="18" height="26" viewBox="0 0 18 26" className="drop-shadow-lg">
        <path
          d="M3 24L9 2L11 6L13 4L15 8L14 12L16 16L14 20L12 18L10 22L8 20L6 24L3 24Z"
          fill="url(#metalGradient2)"
          stroke="#555"
          strokeWidth="0.5"
        />
      </svg>,
      <svg key={6} width="22" height="22" viewBox="0 0 22 22" className="drop-shadow-lg">
        <path
          d="M11 2L19 7L17 11L19 15L11 20L3 15L5 11L3 7L11 2Z"
          fill="url(#metalGradient3)"
          stroke="#555"
          strokeWidth="0.5"
        />
      </svg>,
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
    <div className="min-h-screen relative bg-neutral-950 flex flex-col items-center px-5 overflow-hidden">
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

      {/* Header */}
      <div ref={titleRef} className="relative z-10 text-center mt-8 mb-5 w-full max-w-4xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Shield className="w-6.5 h-6.5 sm:w-8 sm:h-8 text-neutral-300 mr-1 sm:mr-2" />
            <h1 className="text-neutral-300 text-lg sm:text-2xl sm:font-bold">ADMIN DASHBOARD</h1>
          </div>
          <button 
            onClick={handleLogout}
            className="bg-red-500/80 hover:bg-red-500 text-neutral-300 text-[13.3px] sm:text-sm px-4 py-2 rounded-md transition-all duration-200 ease-in-out cursor-pointer flex items-center space-x-2 backdrop-blur-sm"
          >
            <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div ref={contentRef} className="relative z-10 w-full mb-10 max-w-4xl">
        <div className="bg-neutral-800/80 backdrop-blur-sm border border-neutral-700/40 p-6 shadow-xl">
          <div className="flex items-center justify-center mb-6">
            <MessageSquare className="w-5 h-5 text-neutral-300 mr-2" />
            <h2 className="text-neutral-300 text-lg">Contact Messages</h2>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-neutral-300"></div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-20 h-20 bg-neutral-700/50 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-8 h-8 text-neutral-400" />
              </div>
              <p className="text-center text-neutral-400 font-medium">
                Your inbox is feeling lonely.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div 
                  key={message._id} 
                  className="bg-neutral-700/60 backdrop-blur-sm border border-neutral-600/40 p-5 rounded-lg hover:bg-neutral-700/80 transition-all duration-200"
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                  }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex flex-col space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-neutral-400" />
                          <span className="text-neutral-300 font-medium text-sm">{message.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-neutral-400" />
                          <span className="text-neutral-300 text-sm">{message.email}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-neutral-400" />
                        <span className="text-neutral-400 text-xs">
                          {new Date(message.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={() => deleteMessage(message._id)} 
                      className="text-red-400 hover:text-red-300 transition-colors p-2 hover:bg-red-500/10 rounded-md"
                      aria-label="Delete message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="bg-neutral-800/80 rounded-md p-4 border-l-4 border-neutral-400">
                    <p className="text-neutral-300 text-sm leading-relaxed whitespace-pre-wrap">
                      {message.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Dynamic CSS animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
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

export default AdminPage;