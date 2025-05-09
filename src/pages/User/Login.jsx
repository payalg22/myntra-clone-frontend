import React from "react";
import PhoneLogin from "../../components/User/PhoneLogin";

export default function Login() {
  return (
    <div>
      <PhoneLogin />
      <button className="px-4 py-2 bg-red-500 text-white">
        Login
      </button>
    </div>
  );
}
