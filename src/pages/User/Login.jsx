import React from "react";
import PhoneLogin from "../../components/User/PhoneLogin";
import { primaryBtn } from "../../styles/tailwindStyles";

export default function Login() {
  return (
    <div>
      <PhoneLogin />
      {/* <button className={primaryBtn}>
        Login
      </button> */}
    </div>
  );
}
