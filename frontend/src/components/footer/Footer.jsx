import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="top">
          <div className="column">
            <h2>OpusLink</h2>
            <p>
              Empowering freelancers and clients worldwide with seamless project
              collaboration.
            </p>
          </div>
          <div className="column quickLinks">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <Link to="/">About Us</Link>
              </li>
              <li>
                <Link to="/">Contact</Link>
              </li>
              <li>
                <Link to="/">FAQs</Link>
              </li>
              <li>
                <Link to="/">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          <div className="column">
            <h3>Follow Us</h3>
            <div className="social">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/img/twitter.png" alt="Twitter" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/img/facebook.png" alt="Facebook" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/img/linkedin.png" alt="LinkedIn" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/img/instagram.png" alt="Instagram" />
              </a>
            </div>
          </div>
        </div>

        <div className="bottom">
          <span>© 2024 OpusLink International Ltd. All rights reserved.</span>
          <div className="settings">
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
    </footer>
  );
}

export default Footer;
