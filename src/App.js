import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";

// Components
import LandingPage from "./components/LandingPage";
import SpinWheel from "./components/SpinWheel";
import UserDataForm from "./components/UserDataForm";
import CouponDisplay from "./components/CouponDisplay";
import DuplicateUserMessage from "./components/DuplicateUserMessage";
import PrivacyPolicy from './components/PrivacyPolicy';

export default function App() {
  const [screen, setScreen] = useState("landing");
  const [selectedPrize, setSelectedPrize] = useState(null);
  const [userSuccessData, setUserSuccessData] = useState(null);
  const [duplicateInfo, setDuplicateInfo] = useState(null);

  const handleStartSpin = () => setScreen("spin");

  const handleSpinComplete = (prize) => {
    setSelectedPrize(prize);
    setScreen("form");
  };

  const handleSubmitSuccess = ({ name, mobile, couponCode, expiryDate, prize }) => {
    setUserSuccessData({ name, mobile, couponCode, expiryDate, prize });
    setScreen("coupon");
  };

  const handleDuplicateUser = (mobile, previousData) => {
    setDuplicateInfo({ mobile, previousData });
    setScreen("duplicate");
  };

  const goHome = () => {
    setSelectedPrize(null);
    setUserSuccessData(null);
    setDuplicateInfo(null);
    setScreen("landing");
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Privacy Policy Route */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          
          {/* Main App Route */}
          <Route path="*" element={
            <>
              {/* Landing page without footer */}
              {screen === "landing" && <LandingPage onStartSpin={handleStartSpin} />}

              {screen === "spin" && <SpinWheel onSpinComplete={handleSpinComplete} />}

              {screen === "form" && selectedPrize && (
                <UserDataForm
                  prize={selectedPrize}
                  onSubmitSuccess={handleSubmitSuccess}
                  onDuplicateUser={handleDuplicateUser}
                />
              )}

              {screen === "coupon" && userSuccessData && (
                <CouponDisplay userData={userSuccessData} />
              )}

              {screen === "duplicate" && duplicateInfo && (
                <DuplicateUserMessage
                  mobile={duplicateInfo.mobile}
                  previousData={duplicateInfo.previousData}
                />
              )}

              {!["landing", "spin", "form", "coupon", "duplicate"].includes(screen) && (
                <div className="bg-white p-6 rounded-2xl shadow-lg">Loading…</div>
              )}

              {screen !== "landing" && (
                <button
                  onClick={goHome}
                  style={{
                    position: "fixed",
                    left: 16,
                    bottom: 16,
                    background: "linear-gradient(135deg, #b76e79 0%, #d4a5a5 100%)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 9999,
                    padding: "10px 16px",
                    fontWeight: 700,
                    boxShadow: "0 10px 30px rgba(183, 110, 121, 0.3)",
                    cursor: "pointer",
                  }}
                >
                  Home
                </button>
              )}
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}
