import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedinIn,
  faGithub,
  faInstagram,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 text-[12px] sm:text-[12.5px] py-3 px-4 sm:px-15">
      <div className="flex flex-col sm:flex-row gap-2 justify-between items-center">
        {/* Social Links */}
        <div className="flex gap-5 order-1 sm:order-2">
          <a href="https://linkedin.com/in/muhmedv" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedinIn} className="hover:text-white text-[14px] sm:text-[15px] transition" />
          </a>
          <a href="https://github.com/lil-de7k" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} className="hover:text-white text-[13.5px] sm:text-[15.5px] transition" />
          </a>
          <a href="https://instagram.com/lil__de7k" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} className="hover:text-white text-[14px] sm:text-[16px] transition" />
          </a>
          <a href="https://wa.me/201012857997" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faWhatsapp} className="hover:text-white text-[14.5px] sm:text-[17px] transition" />
          </a>
          <a href="mailto:muhvmmvdessvm@gmail.com">
            <FontAwesomeIcon icon={faEnvelope} className="hover:text-white text-[13px] sm:text-[15px] transition" />
          </a>
        </div>

        {/* Copyright */}
        <span className="order-2 sm:order-1">© 2025 MyPortfolio. All Rights Reserved</span>
      </div>
    </footer>
  );
};

export default Footer;
