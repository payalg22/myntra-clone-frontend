import React, { useState } from "react";
import { auth } from "../../firebase/firebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { primaryBtn } from "../../styles/tailwindStyles";
import { useEffect } from "react";

const PhoneLogin = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [step, setStep] = useState(1);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible", // or 'normal'
          callback: (response) => {
            console.log("Recaptcha received");
          },
          "expired-callback": () => {
            alert("Recaptcha expired, try again.");
          },
        }
      );
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();

    setupRecaptcha();

    const appVerifier = window.recaptchaVerifier;
    const formattedPhone = phone.startsWith("+") ? phone : `+91${phone}`;

    try {
      const result = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        appVerifier
      );
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
      const res = await otpLogin(idToken);
      console.log(res);
      // TODO: Send token to backend for verification like Google login
      alert("Login successful!");
    } catch (error) {
      console.error("OTP verification failed:", error);
      alert("Incorrect OTP");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {step === 1 && (
        <form onSubmit={handleSendOtp} className="flex flex-col gap-2">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
            className="border border-gray-300 rounded-md p-2 focus:outline-none"
            required
          />
          <button type="submit" className={primaryBtn} disabled={!phone}>
            Send OTP
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyOtp} className="flex flex-col gap-2">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
            className="border border-gray-300 rounded-md p-2 focus:outline-none"
          />
          <button type="submit" className={primaryBtn}>
            Verify OTP
          </button>
        </form>
      )}

      <div id="recaptcha-container"></div>
    </div>
  );
};

export default PhoneLogin;
