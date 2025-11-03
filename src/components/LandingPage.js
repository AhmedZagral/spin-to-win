import React from 'react';
import '../styles/LandingPage.css';

const LandingPage = ({ onStartSpin }) => {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="landing-title">Unlock Your Exclusive Offer</h1>
        <p className="landing-subtitle">
          Spin the wheel for a chance to win exciting discounts on premium jewelry
        </p>
        <div className="winners-indicator">
          <span className="pulse-dot"></span>
          <span className="winners-text">Only 9 Free Jewellery Remaining Today</span>
        </div>
        <button className="cta-button" onClick={onStartSpin}>
          Spin to Unlock
        </button>
        <p className="terms-link">
          By continuing, you agree to our <a href="#privacy">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
