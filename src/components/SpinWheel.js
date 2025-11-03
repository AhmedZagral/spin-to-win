import React, { useState } from 'react';
import '../styles/SpinWheel.css';

const SpinWheel = ({ onSpinComplete }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [hasSpun, setHasSpun] = useState(false);

  const prizes = [
    { label: '10% OFF', value: 10, color: '#b76e79' },
    { label: '20% OFF', value: 20, color: '#f8f3f0' },
    { label: '30% OFF', value: 30, color: '#d4a5a5' },
    { label: 'FREE ITEM', value: 100, color: '#f8f3f0' },
    { label: '15% OFF', value: 15, color: '#b76e79' },
    { label: '25% OFF', value: 25, color: '#f8f3f0' },
    { label: '5% OFF', value: 5, color: '#d4a5a5' },
    { label: 'TRY AGAIN', value: 0, color: '#f8f3f0' }
  ];

  const handleSpin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setHasSpun(true);
    
    const randomIndex = Math.floor(Math.random() * prizes.length);
    const selectedPrize = prizes[randomIndex];
    
    const spins = 5 + Math.random() * 3;
    const segmentAngle = 360 / prizes.length;
    const targetAngle = 360 - (randomIndex * segmentAngle) + (segmentAngle / 2);
    const finalRotation = (360 * spins) + targetAngle;
    
    setRotation(rotation + finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      
      if (selectedPrize.label === 'TRY AGAIN') {
        setTimeout(() => {
          handleSpin();
        }, 1000);
      } else {
        onSpinComplete(selectedPrize);
      }
    }, 4000);
  };

  return (
    <div className="wheel-container">
      <h2 className="wheel-title">Spin the Wheel</h2>
      <p className="wheel-subtitle">
        {!hasSpun ? 'See all rewards, then click SPIN NOW!' : 'Click the button to discover your prize!'}
      </p>
      
      <div className="wheel-wrapper">
        <div className="wheel-pointer"></div>
        
        {/* Fixed Logo - Does NOT Rotate */}
        <div className="wheel-center-fixed">
          <img src={require('./logo.jpg')} alt="Inzavy Logo" className="center-logo" />

        </div>
        
        {/* Spinning Wheel */}
        <div 
          className={`wheel ${isSpinning ? 'spinning' : ''} ${hasSpun ? 'blurred' : ''}`}
          style={{ 
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none'
          }}
        >
          {prizes.map((prize, index) => {
            const angle = (360 / prizes.length) * index;
            return (
              <div 
                key={index} 
                className="wheel-segment"
                style={{ 
                  transform: `rotate(${angle}deg)`,
                  background: prize.color
                }}
              >
                <span className="segment-text">{prize.label}</span>
              </div>
            );
          })}
        </div>
      </div>
      
      <button 
        className="spin-button" 
        onClick={handleSpin}
        disabled={isSpinning || hasSpun}
      >
        {isSpinning ? 'SPINNING...' : hasSpun ? 'PROCESSING...' : 'SPIN NOW'}
      </button>
      
      {isSpinning && (
        <p className="spinning-message">🎯 Your prize is being selected...</p>
      )}
    </div>
  );
};

export default SpinWheel;
