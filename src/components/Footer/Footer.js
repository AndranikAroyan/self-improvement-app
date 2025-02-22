import React from 'react';
import './Footer.css'; // Import Footer-specific styles

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Growth Section */}
        <div className="footer-section">
          <h3 className="footer-heading">Growth</h3>
          <p className="footer-text">Track your habits and improve your life daily.</p>
        </div>

        {/* Contact Section */}
        <div className="footer-section">
          <h3 className="footer-heading">Contact</h3>
          <p className="footer-text">+123 456 7890</p>
          <p className="footer-text">support@selfimprovement.com</p>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-copyright">
        <p className="footer-copyright-text">© 2025 Self-Improvement. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;