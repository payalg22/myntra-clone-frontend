import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase/firebaseConfig";

export default function GoogleLogin() {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("User Info:", {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      });

      const idToken = await user.getIdToken();
      console.log("Firebase ID Token:", idToken);

      // TODO: Send this token to your backend for verification
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="bg-red-500 text-white cursor-pointer p-3 rounded-xl font-medium"
    >
      Sign in with Google
    </button>
  );
}
