import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/CouponDisplay.css';

const CouponDisplay = ({ userData }) => {
  const { name, mobile, couponCode, expiryDate, prize } = userData;

  useEffect(() => {
    // Send coupon via WhatsApp using wa.me link
    const message = `Hi ${name}! 🎉 Congratulations on winning ${prize.label}! 

Your coupon code is: ${couponCode}

Valid for 15 days from our launch date.

Note: We will notify you of our launching date on this number.

Shop now at our store!`;

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
        <div className="success-animation">
          <div className="checkmark">✓</div>
        </div>

        <h2 className="congrats-title">🎉 Congratulations!</h2>
        <p className="congrats-text">Thank you, {name}!</p>

        <div className="coupon-code-box">
          <p className="code-label">Your Coupon Code</p>
          <div className="code-display">
            <span className="code-text">{couponCode}</span>
            <button onClick={copyToClipboard} className="copy-btn">
              📋 Copy
            </button>
          </div>
        </div>

        <div className="validity-info">
          <p className="validity-label">Valid for:</p>
          <p className="validity-text">
            <strong>15 Days from the date of launching</strong>
          </p>
        </div>

        <div className="launch-note">
          <p className="note-icon">📱</p>
          <p className="note-text">
            <strong>Note:</strong> We will notify you of our launching date on your given number
          </p>
        </div>

        <div className="whatsapp-info">
          <p className="whatsapp-text">📱 Coupon sent to your WhatsApp!</p>
          <p className="whatsapp-subtext">Check your messages for details</p>
        </div>

        <div className="cta-section">
          <p className="cta-text">Shop premium jewelry at exclusive prices</p>
          <a 
            href="https://www.instagram.com/inzavy_/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="visit-btn"
          >
            Visit Our Store
          </a>
        </div>

        <Link to="/" className="privacy-link">Privacy Policy</Link>
      </div>
    </div>
  );
};

export default CouponDisplay;
