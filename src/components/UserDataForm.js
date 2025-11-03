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
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 7);

      await addDoc(collection(db, 'users'), {
        name,
        mobile,
        prize: prize.label,
        prizeValue: prize.value,
        couponCode,
        expiryDate: expiryDate.toISOString(),
        timestamp: new Date().toISOString()
      });

      onSubmitSuccess({ name, mobile, couponCode, expiryDate, prize });
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-overlay">
      <div className="form-modal">
        <div className="blurred-prize">
          <h2 className="prize-announcement">🎉 Congratulations!</h2>
          <div className="blurred-text">
            You WON a Prize!
          </div>
          <p className="unlock-message">Enter your details to unlock your prize</p>
        </div>
        
        <form onSubmit={handleSubmit} className="data-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Your Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <input
              type="tel"
              placeholder="Mobile Number (10 digits)"
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
              className="form-input"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Claim My Prize'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserDataForm;
