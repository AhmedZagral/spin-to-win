import React from 'react';
import '../styles/DuplicateUserMessage.css';

const DuplicateUserMessage = ({ mobile, previousData }) => {
  return (
    <div className="duplicate-container">
      <div className="duplicate-card">
        <div className="duplicate-header">
          <div className="star-decoration">✨</div>
          <h1 className="duplicate-title">You're Already a Winner!</h1>
          <p className="duplicate-subtitle">Hey {previousData.name}, thanks for participating</p>
        </div>
        
        <div className="already-won-section">
          <div className="check-mark">✓</div>
          <p className="already-won-text">You already claimed your reward</p>
        </div>
        
        <div className="reward-details-box">
          <h3 className="details-title">Your Reward Details</h3>
          
          <div className="detail-item">
            <span className="detail-label">Prize</span>
            <span className="detail-value">{previousData.prize}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Coupon Code</span>
            <span className="detail-value coupon-code">{previousData.couponCode}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Valid Till</span>
            <span className="detail-value">
              {new Date(previousData.expiryDate).toLocaleDateString('en-IN', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}
            </span>
          </div>
        </div>
        
        <div className="fair-play-message">
          <p>🎯 We keep it fair for everyone by allowing one reward per person</p>
        </div>
        
        <button 
          onClick={() => window.location.href = '/'}
          className="home-button"
        >
          Back to Home
        </button>
        
        <p className="thanks-message">Thanks for being amazing! 💎</p>
      </div>
    </div>
  );
};

export default DuplicateUserMessage;
