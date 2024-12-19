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
        </div>

        <div className="bottom">
          <span>OpusLink - CS 554-A Final Project by Web Rangers.</span>
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
