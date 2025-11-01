import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;
const otpLogin = async (tokenId) => {
  const token = { token: tokenId };
  const res = await axios.post(`${baseUrl}/api/v1/user/auth/login/otp`, token, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return res;
};

export { otpLogin };
