import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95, rotateX: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.8,
      ease: [0.25, 0.8, 0.25, 1],
    },
  }),
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [failureMessage, setFailureMessage] = useState('');
  const [shrapnelPieces, setShrapnelPieces] = useState([]);
  const successRef = useRef(null);

  useEffect(() => {
    const pieces = [];
    for (let i = 0; i < 25; i++) {
      pieces.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        rotation: Math.random() * 360,
        scale: 0.25 + Math.random() * 0.7,
        duration: 10 + Math.random() * 8,
        type: Math.floor(Math.random() * 8),
        windX: 0.6 + Math.random() * 0.5,
        windY: -0.4 + Math.random() * 0.8,
        amplitude: 15 + Math.random() * 40,
        waveOffset: Math.random() * Math.PI * 2,
        rotationSpeed: 0.2 + Math.random() * 0.8,
      });
    }
    setShrapnelPieces(pieces);
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFailureMessage('All fields are required');
      return;
    }
    setIsSubmitting(true);
    setFailureMessage('');

    try {
      const response = await fetch('https://muhammads-server.vercel.app/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to send message');
      setSuccessMessage('Message has been sent successfully!');
      setFormData({ name: '', email: '', message: '' });

      if (successRef.current) {
        successRef.current.style.opacity = '0';
        successRef.current.style.transform = 'translateY(10px)';
        successRef.current.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        setTimeout(() => {
          successRef.current.style.opacity = '1';
          successRef.current.style.transform = 'translateY(0)';
        }, 100);
      }

      setTimeout(() => setSuccessMessage(''), 1500);
    } catch (err) {
      console.error('Error sending message:', err);
      setFailureMessage('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative bg-neutral-950 px-5 sm:px-6 md:px-12 lg:px-30 flex flex-col py-15 sm:py-20 overflow-hidden" id="contact">
      {/* Animated shrapnel pieces */} 
      {shrapnelPieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute pointer-events-none opacity-25"
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
          <svg width="16" height="32" viewBox="0 0 16 32" className="drop-shadow-lg">
            <path
              d="M8 2L14 10L12 18L8 30L4 18L2 10L8 2Z"
              fill="url(#metalGradient1)"
              stroke="#555"
              strokeWidth="0.5"
            />
          </svg>
        </div>
      ))}

      {/* Animated content container */}
      <motion.div
        className="flex flex-col items-center w-full max-w-5xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 ">
          {/* Left - Info */}
          <motion.div
            className="space-y-6 bg-neutral-800/60 backdrop-blur-sm p-7 sm:p-12 shadow-lg"
            variants={cardVariants}
            custom={0}
          >
            <div className="flex items-center mb-9 justify-between">
              <p className="text-neutral-300 text-[28px] sm:text-[30px] font">CONTACT</p>
              <p className="w-39 sm:w-77 h-1 mt-1 -mr-7 border-t-2 border-neutral-400"></p>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-4.5 h-4.5 text-neutral-400" />
              <p className="text-neutral-400 text-[15px] font-medium">+20 010 1285 7997</p>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-4.5 h-4.5 text-neutral-400" />
              <p className="text-neutral-400 text-[16.4px] sm:text-[16px] font-medium">muhvmmvdessvm@gmail.com</p>
            </div>
            <div className="flex items-center space-x-3 mb-3">
              <MapPin className="w-4.5 h-4.5 text-neutral-400" />
              <p className="text-neutral-400 text-[15px] font-medium">Badr City, Cairo, Egypt</p>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            className="w-full bg-neutral-800 p-7 sm:p-12"
            variants={cardVariants}
            custom={1}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Your name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 bg-neutral-700/70 rounded-md text-neutral-300 text-[14px] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 bg-neutral-700/70 rounded-md text-neutral-300 text-[14px] focus:outline-none"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-3.5 py-2 bg-neutral-700/70 rounded-md text-neutral-300 text-[14px] focus:outline-none"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="py-1.5 px-4 text-[14.4px] -mt-2 cursor-pointer bg-neutral-300 hover:bg-neutral-400 text-neutral-900 rounded-md transition-all duration-200"
                  disabled={isSubmitting}
                >
                  <Send className="w-3.5 h-3.5 inline-block mr-2" />
                  {isSubmitting ? 'Sending...' : 'Send'}
                </button>
              </div>
            </form>

            {/* Messages */}
            {successMessage && (
              <div
                ref={successRef}
                className="mt-6 p-3 text-center text-sm text-green-500 bg-green-900/20 rounded-lg font-medium border border-green-700"
              >
                {successMessage}
              </div>
            )}
            {failureMessage && (
              <div className="mt-6 p-3 text-center text-sm text-red-500 bg-red-900/20 rounded-lg font-medium border border-red-700">
                {failureMessage}
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;