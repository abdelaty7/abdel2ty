import React, { useState, useRef, useEffect, useCallback } from 'react';
import { TextField } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [failureMessage, setFailureMessage] = useState('');

  const titleRef = useRef(null);
  const formRef = useRef(null);
  const successRef = useRef(null);

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 640px)');
    const setupAnimations = () => {
      const ctx = gsap.context(() => {
        const yOffset = mobileQuery.matches ? 30 : 40;
        const duration = mobileQuery.matches ? 0.8 : 1;

        gsap.from(titleRef.current, {
          opacity: 0,
          y: yOffset,
          duration: duration,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 90%",
          },
        });

        gsap.from(formRef.current, {
          opacity: 0,
          y: yOffset + 10,
          duration: duration + 0.2,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 90%",
          },
        });
      });

      return ctx;
    };

    const ctx = setupAnimations();
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

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
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
      const response = await axios.post('http://localhost:5000/api/messages', formData);

      setSuccessMessage('Message has been sent successfully!');
      setFormData({ name: '', email: '', message: '' });

      if (successRef.current) {
        gsap.fromTo(successRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        );
      }

      setTimeout(() => {
        setSuccessMessage('');
      }, 1500);
    } catch (err) {
      console.error('Error sending message:', err);
      setFailureMessage('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative bg-gray-50 px-7 sm:px-6 md:px-12 lg:px-15 flex flex-col pt-5 pb-12 sm:pt-10 sm:pb-16 md:pt-16 md:pb-20" id='contact'>
      <h3
        ref={titleRef}
        className='text-lg sm:text-xl md:text-lg font-bold border-blue-900 border-b-2 pb-1 mb-6 sm:mb-7 w-fit mx-auto text-center z-10 relative'
      >
        Contact
      </h3>

      <div className='flex justify-center w-full'>
        <div
          ref={formRef}
          className="w-full max-w-md p-3 sm:p-5 md:p-5 bg-white rounded-xs sm:rounded shadow-md sm:shadow-lg md:shadow-xl z-10"
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <TextField
                fullWidth
                variant="filled"
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                InputProps={{ style: { fontSize: '13px', fontWeight: '500', opacity: '0.8', fontFamily: '"Lexend Deca", sans-serif' } }}
                InputLabelProps={{ style: { fontSize: '12px'} }}
              />
            </div>

            <div className="mb-4">
              <TextField
                fullWidth
                variant="filled"
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                InputProps={{ style: { fontSize: '13px', fontWeight: '500', opacity: '0.8', fontFamily: '"Lexend Deca", sans-serif' } }}
                InputLabelProps={{ style: { fontSize: '12px'} }}
              />
            </div>

            <div className="mb-4">
              <TextField
                fullWidth
                variant="filled"
                label="Message"
                name="message"
                multiline
                rows={window.innerWidth < 640 ? 3 : 4}
                value={formData.message}
                onChange={handleChange}
                required
                InputProps={{ style: { fontSize: '13px', fontWeight: '500', opacity: '0.8', fontFamily: '"Lexend Deca", sans-serif' } }}
                InputLabelProps={{ style: { fontSize: '12px'} }}
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 sm:py-2.5 text-xs sm:text-[12px] bg-black text-white rounded transition-all duration-200 ease-in-out hover:bg-slate-900 focus:ring-2 focus:ring-offset-2 focus:ring-black cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          {successMessage && (
            <div
              ref={successRef}
              className="mt-4 sm:mt-6 p-2 text-center text-xs sm:text-xs text-green-700 bg-green-50 rounded font-medium"
            >
              <p>{successMessage}</p>
            </div>
          )}

          {failureMessage && (
            <div className="mt-4 sm:mt-6 p-2 text-center text-xs sm:text-xs text-red-700 bg-red-50 rounded font-medium">
              <p>{failureMessage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
