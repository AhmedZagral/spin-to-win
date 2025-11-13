import React, { useState } from 'react';
import '../styles/SpinWheel.css';

const SpinWheel = ({ onSpinComplete }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [hasSpun, setHasSpun] = useState(false);
  const [spinCount, setSpinCount] = useState(() => {
    // Get spin count from localStorage or default to 0
    const saved = localStorage.getItem('spinCount');
    return saved ? parseInt(saved, 10) : 0;
  });

  // Prize configuration based on your rules
  const prizes = [
    { label: '10% OFF', value: 10, color: '#b76e79', type: 'discount' },
    { label: 'FREE JEWELRY ₹599', value: 599, color: '#f8f3f0', type: 'free' },
    { label: '20% OFF', value: 20, color: '#d4a5a5', type: 'discount' },
    { label: 'BUY 1 GET 1', value: 'bogo', color: '#f8f3f0', type: 'bogo' },
    { label: '10% OFF', value: 10, color: '#b76e79', type: 'discount' },
    { label: '₹100 OFF', value: 100, color: '#d4a5a5', type: 'flat' },
    { label: '20% OFF', value: 20, color: '#f8f3f0', type: 'discount' },
    { label: '50% OFF', value: 50, color: '#b76e79', type: 'half' }
  ];

  // Function to determine prize based on rules
  const determinePrize = () => {
    const currentSpin = spinCount + 1;
    
    // Save updated spin count
    localStorage.setItem('spinCount', currentSpin.toString());
    setSpinCount(currentSpin);

    // Rule 1: After 50 entries, 1 free product worth ₹599
    if (currentSpin === 50) {
      return prizes.find(p => p.type === 'free');
    }

    // Rule 2: Daily 2 times random BOGO (10% chance before 50 spins)
    if (Math.random() < 0.10 && currentSpin < 50) {
      const bogoPrize = prizes.find(p => p.type === 'bogo');
      if (bogoPrize) return bogoPrize;
    }

    // Rule 3: Daily 3 times flat ₹100 off (15% chance)
    if (Math.random() < 0.15 && currentSpin < 50) {
      const flatPrize = prizes.find(p => p.type === 'flat');
      if (flatPrize) return flatPrize;
    }

    // Rule 4: 50% off after 25 entries (one time)
    if (currentSpin === 26) {
      return prizes.find(p => p.type === 'half');
    }

    // Rule 5 & 6: Guaranteed 10% or 20% off
    // Nobody leaves empty-handed! 😂
    const guaranteedPrizes = prizes.filter(p => p.type === 'discount');
    return guaranteedPrizes[Math.floor(Math.random() * guaranteedPrizes.length)];
  };

  const handleSpin = () => {
    if (isSpinning || hasSpun) return;
    setIsSpinning(true);
    setHasSpun(true);
    
    const selectedPrize = determinePrize();
    const prizeIndex = prizes.findIndex(p => 
      p.label === selectedPrize.label && p.type === selectedPrize.type
    );
    
    const spins = 5 + Math.random() * 3;
    const segmentAngle = 360 / prizes.length;
    const targetAngle = 360 - (prizeIndex * segmentAngle) + (segmentAngle / 2);
    const finalRotation = (360 * spins) + targetAngle;
    
    setRotation(rotation + finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      onSpinComplete(selectedPrize);
    }, 4000);
  };

  return (
    <div className="spin-wheel-page">
      <div className="spin-wheel-container">
        <h2 className="wheel-title">Spin the Wheel</h2>
        <p className="wheel-subtitle">
          {!hasSpun ? 'Click SPIN NOW to discover your exclusive prize!' : 'Processing your reward...'}
        </p>
        
        <div className="wheel-wrapper">
          {/* Pointer */}
          <div className="wheel-pointer"></div>

          {/* Fixed Logo - Does NOT Rotate */}
          <div className="wheel-center-fixed">
            <img
              src="https://z-cdn-media.chatglm.cn/files/e71e8dd6-4642-468f-8851-b0c2e78bdeae_Inzavy-logo-1-bg-removed.png?auth_key=1789971051-e19bbd431da546d4952611a263cabb4f-0-7335cb89bf943abf61ba30d46bc7911c"
              alt="Inzavy"
              className="center-logo"
            />
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
          {isSpinning ? '🎯 SPINNING...' : hasSpun ? '⏳ PROCESSING...' : '🎯 SPIN NOW'}
        </button>
        
        {isSpinning && (
          <p className="spinning-message">
            🎁 Your exclusive prize is being selected...
          </p>
        )}
      </div>
    </div>
  );
};

export default SpinWheel;