import React from 'react';
import './Footer.css';

const Footer = () => {
      return (
        <div className="footer-container">
          <div className="about-us">
            <section>
              <h2 >About Us</h2>
              <p>The Website provides users access to various
projects based on different domains.The project platform displays various projects of
various colleges and technologies.Users can upload their projects and can even go
through others' projects for reference.</p>
            
            </section>
          </div>
          <div className="contact">
            <section>
              <h2>Contact Us</h2>
              <p>Phone Number: 123456789</p>
              <p>Email: eduinnohub09@gmail.com</p>
              <p>Address: IT Complex, Chennai, 643221</p>
            </section>
          </div>
        </div>
      );
    };
export default Footer;