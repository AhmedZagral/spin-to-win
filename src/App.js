import React, { useState } from "react";
import "./styles/App.css";

// Components (paths match your structure)
import LandingPage from "./components/LandingPage";
import SpinWheel from "./components/SpinWheel";
import UserDataForm from "./components/UserDataForm";
import CouponDisplay from "./components/CouponDisplay";
import DuplicateUserMessage from "./components/DuplicateUserMessage";

export default function App() {
  // screens: 'landing' | 'spin' | 'form' | 'coupon' | 'duplicate'
  const [screen, setScreen] = useState("landing");

  // prize selected from SpinWheel (object: { label, value, color })
  const [selectedPrize, setSelectedPrize] = useState(null);

  // data for success path (CouponDisplay expects { name, mobile, couponCode, expiryDate, prize })
  const [userSuccessData, setUserSuccessData] = useState(null);

  // data for duplicate path (DuplicateUserMessage expects { mobile, previousData })
  const [duplicateInfo, setDuplicateInfo] = useState(null);

  // Landing -> Spin
  const handleStartSpin = () => setScreen("spin");

  // Spin complete -> Form
  const handleSpinComplete = (prize) => {
    setSelectedPrize(prize);
    setScreen("form");
  };

  // Form success -> Coupon
  const handleSubmitSuccess = ({ name, mobile, couponCode, expiryDate, prize }) => {
    setUserSuccessData({ name, mobile, couponCode, expiryDate, prize });
    setScreen("coupon");
  };

  // Form duplicate -> Duplicate screen
  const handleDuplicateUser = (mobile, previousData) => {
    setDuplicateInfo({ mobile, previousData });
    setScreen("duplicate");
  };

  // simple “home” reset
  const goHome = () => {
    setSelectedPrize(null);
    setUserSuccessData(null);
    setDuplicateInfo(null);
    setScreen("landing");
  };

  return (
    <div className="app">
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

      {/* Fallback (shouldn’t be visible normally) */}
      {!["landing", "spin", "form", "coupon", "duplicate"].includes(screen) && (
        <div className="bg-white p-6 rounded-2xl shadow-lg">Loading…</div>
      )}

      {/* Small home button when not on landing (optional) */}
      {screen !== "landing" && (
        <button
          onClick={goHome}
          style={{
            position: "fixed",
            left: 16,
            bottom: 16,
            background:
              "linear-gradient(135deg, #b76e79 0%, #d4a5a5 100%)",
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
    </div>
  );
}
