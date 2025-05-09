import React, { useState } from 'react';
import { auth } from '../../firebase/firebaseConfig';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const PhoneLogin = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [step, setStep] = useState(1);

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible', // or 'normal'
      callback: (response) => {
        // recaptcha verified
      },
      'expired-callback': () => {
        alert("Recaptcha expired, try again.");
      }
    });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setupRecaptcha();

    const appVerifier = window.recaptchaVerifier;
    const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;

    try {
      const result = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      setConfirmationResult(result);
      setStep(2);
      alert("OTP sent successfully!");
    } catch (error) {
      console.error("OTP error:", error);
      alert("Failed to send OTP. Try again.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!confirmationResult) return;

    try {
      const result = await confirmationResult.confirm(otp);
      const user = result.user;

      console.log("User:", user);
      const idToken = await user.getIdToken();
      console.log("Firebase ID Token:", idToken);

      // TODO: Send token to backend for verification like Google login
      alert("Login successful!");

    } catch (error) {
      console.error("OTP verification failed:", error);
      alert("Incorrect OTP");
    }
  };

  return (
    <div>
      {step === 1 && (
        <form onSubmit={handleSendOtp}>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
            required
          />
          <button type="submit">Send OTP</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyOtp}>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
          />
          <button type="submit">Verify OTP</button>
        </form>
      )}

      <div id="recaptcha-container"></div>
    </div>
  );
};

export default PhoneLogin;
