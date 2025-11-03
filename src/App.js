import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import SpinWheel from './components/SpinWheel';
import UserDataForm from './components/UserDataForm';
import CouponDisplay from './components/CouponDisplay';
import DuplicateUserMessage from './components/DuplicateUserMessage';
import './styles/App.css';

function App() {
  const [stage, setStage] = useState('landing');
  const [prizeWon, setPrizeWon] = useState(null);
  const [userData, setUserData] = useState(null);
  const [duplicateData, setDuplicateData] = useState(null);

  const handleStartSpin = () => {
    setStage('spinning');
  };

  const handleSpinComplete = (prize) => {
    setPrizeWon(prize);
    setStage('form');
  };

  const handleFormSubmit = (data) => {
    setUserData(data);
    setStage('coupon');
  };

  const handleDuplicateUser = (mobile, previousData) => {
    setDuplicateData({ mobile, previousData });
    setStage('duplicate');
  };

  return (
    <div className="app">
      {stage === 'landing' && (
        <LandingPage onStartSpin={handleStartSpin} />
      )}
      
      {stage === 'spinning' && (
        <SpinWheel onSpinComplete={handleSpinComplete} />
      )}
      
      {stage === 'form' && (
        <UserDataForm 
          prize={prizeWon} 
          onSubmitSuccess={handleFormSubmit}
          onDuplicateUser={handleDuplicateUser}
        />
      )}
      
      {stage === 'coupon' && (
        <CouponDisplay userData={userData} />
      )}

      {stage === 'duplicate' && (
        <DuplicateUserMessage 
          mobile={duplicateData.mobile}
          previousData={duplicateData.previousData}
        />
      )}
    </div>
  );
}

export default App;
