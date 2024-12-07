import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        
        <div className="bottom">
          <div className="left">
            <h2>OpusLink</h2>
            <span>© OpusLink International Ltd. 2024</span>
          </div>
          <div className="right">
            <div className="social">
              <img src="/img/twitter.png" alt="Twitter" />
              <img src="/img/facebook.png" alt="Facebook" />
              <img src="/img/linkedin.png" alt="LinkedIn" />
              <img src="/img/pinterest.png" alt="Pinterest" />
              <img src="/img/instagram.png" alt="Instagram" />
            </div>
            <div className="link">
              <img src="/img/language.png" alt="Language" />
              <span>English</span>
            </div>
            <div className="link">
              <img src="/img/coin.png" alt="Currency" />
              <span>USD</span>
            </div>
            <img src="/img/accessibility.png" alt="Accessibility" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;