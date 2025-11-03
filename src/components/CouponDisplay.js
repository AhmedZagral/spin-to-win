import React, { useEffect } from 'react';
import '../styles/CouponDisplay.css';

const CouponDisplay = ({ userData }) => {
  const { name, mobile, couponCode, expiryDate, prize } = userData;

  useEffect(() => {
    // Send coupon via WhatsApp using wa.me link
    const message = `Hi ${name}! 🎉 Congratulations on winning ${prize.label}! Your coupon code is: ${couponCode}. Valid till: ${new Date(expiryDate).toLocaleDateString('en-IN')}. Shop now at our store!`;
    const whatsappUrl = `https://wa.me/91${mobile}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in new tab after 1 second
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 1000);
  }, [name, mobile, couponCode, expiryDate, prize]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(couponCode);
    alert('Coupon code copied to clipboard!');
  };

  return (
    <div className="coupon-container">
      <div className="coupon-card">
        <div className="coupon-header">
          <h2 className="success-title">🎊 Your Prize is Ready!</h2>
          <p className="success-subtitle">Thank you, {name}!</p>
        </div>
        
        <div className="prize-badge">
          <span className="prize-value">{prize.label}</span>
        </div>
        
        <div className="coupon-code-section">
          <p className="code-label">Your Coupon Code</p>
          <div className="coupon-code-box">
            <span className="coupon-code">{couponCode}</span>
          </div>
          <button className="copy-button" onClick={copyToClipboard}>
            Copy Code
          </button>
        </div>
        
        <div className="expiry-section">
          <p className="expiry-text">
            Valid till: <strong>{new Date(expiryDate).toLocaleDateString('en-IN', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            })}</strong>
          </p>
        </div>
        
        <div className="whatsapp-notice">
          <p>📱 Coupon sent to your WhatsApp!</p>
          <p className="notice-subtext">Check your messages for details</p>
        </div>
        
        <div className="brand-message">
          <p className="brand-text">Shop premium jewelry at exclusive prices</p>
          <a href="#privacy" className="privacy-link">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

export default CouponDisplay;
