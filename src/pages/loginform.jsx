import { useState } from "react";
import axios from "axios";
import { connectSocket } from "../socket/socket";
import { useNavigate } from "react-router-dom";

function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const getOtp = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/user/send-otp",
        {
          phone
        }
      );

      alert(`Your OTP is: ${res.data.otp}`);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/user/verify-otp",
        {
          phone,
          otp
        }
      );

      localStorage.setItem("token", res.data.token);
      alert("Login Success");
      connectSocket();

      navigate("/dashboard");
    } catch (error) {
      alert("Invalid OTP");
    }
  };

  return (
    <div>
      <h2>Phone Login</h2>

      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <button onClick={getOtp}>
        Get OTP
      </button>

      <br />
      <br />

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button onClick={login}>
        Login
      </button>
    </div>
  );
}

export default Login;