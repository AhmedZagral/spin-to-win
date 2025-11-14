import React, { useState } from 'react';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import '../styles/UserDataForm.css';

const UserDataForm = ({ prize, onSubmitSuccess, onDuplicateUser }) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !mobile) {
      alert('Please fill all fields');
      return;
    }

    if (mobile.length !== 10) {
      alert('Please enter valid 10-digit mobile number');
      return;
    }

    setIsSubmitting(true);

    try {
      // Check if user already has a reward
      const q = query(collection(db, 'users'), where('mobile', '==', mobile));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // User already has a reward
        setIsSubmitting(false);
        onDuplicateUser(mobile, querySnapshot.docs[0].data());
        return;
      }

      // New user - create reward
      const couponCode = `JEWEL${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      
      // Changed from 7 days to 15 days
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 15);

      await addDoc(collection(db, 'users'), {
        name,
        mobile,
        prize: prize.label,
        prizeValue: prize.value,
        couponCode,
        expiryDate: expiryDate.toISOString(),
        timestamp: new Date().toISOString()
      });

      onSubmitSuccess({
        name,
        mobile,
        couponCode,
        expiryDate,
        prize
      });
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">🎁 Claim Your Prize!</h2>
        <p className="form-subtitle">Enter your details to unlock your prize</p>

        <form onSubmit={handleSubmit} className="user-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              type="tel"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="10-digit mobile number"
              required
              maxLength="10"
            />
          </div>

          <div className="prize-info">
            <span className="prize-icon">{prize.emoji || '🎁'}</span>
            <span className="prize-text">You won: {prize.label}</span>
          </div>

          <button type="submit" disabled={isSubmitting} className="submit-btn">
            {isSubmitting ? 'Processing...' : 'Claim My Prize 🎉'}
          </button>
        </form>

        <p className="terms">
          By submitting, you agree to receive promotional messages on WhatsApp
        </p>
      </div>
    </div>
  );
};

export default UserDataForm;
