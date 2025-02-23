import React from 'react';
import './Footer.css'; // Import Footer-specific styles
import { FaPhone, FaEnvelope, FaFacebook, FaLinkedin } from 'react-icons/fa'; // Import icons from react-icons

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content-wrapper">
        {/* Growth Section */}
        <div className="footer-section-growth">
          <h3 className="footer-heading-main">Growth</h3>
          <p className="footer-text-description">Track your habits and improve your life daily.</p>
        </div>

        {/* Contact Section */}
        <div className="footer-section-contact">
          <h3 className="footer-heading-main">Contact</h3>
          <div className="footer-contact-info">
            <p className="footer-text-contact">
              <FaPhone className="footer-icon-contact" /> +374 93 47 45 87
            </p>
            <p className="footer-text-contact">
              <FaEnvelope className="footer-icon-contact" /> Antranik.Aroyan@gmail.com
            </p>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="footer-section-social">
          <h3 className="footer-heading-main">Follow Us</h3>
          <div className="footer-social-icons">
            <a href="https://www.facebook.com/Ando.Aroyan0/" aria-label="Facebook">
              <FaFacebook className="footer-social-icon" />
            </a>
            <a href="https://am.linkedin.com/in/anto-aroyan-aaa941248" aria-label="LinkedIn">
              <FaLinkedin className="footer-social-icon" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-copyright-section">
        <p className="footer-copyright-text">© 2025 Self-Improvement. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;