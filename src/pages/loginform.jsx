import { useState , useEffect } from "react";
import axios from "axios";
import { connectSocket } from "../socket/socket";
import { useNavigate } from "react-router-dom";

function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    connectSocket();
    navigate("/dashboard");
  }
}, [navigate]);

  const getOtp = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/user/send-otp",
        {
          phone
        }
      );

      alert(`Your OTP is: ${res.data.otp}`);
      setOtpSent(true);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/user/verify-otp",
        {
          phoneNumber: phone,
          otp
        }
      );

      localStorage.setItem("token", res.data.token);
      console.log("Token stored:", res.data.token);
      alert("Login Success");
      //connectSocket();
      //navigate("/dashboard");
    } catch (error) {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-white to-purple-100 flex items-center justify-center px-5">

  <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8">

    {/* Logo */}
    <div className="flex justify-center mb-6">
      <div className="w-20 h-20 rounded-full bg-violet-100 flex items-center justify-center shadow-lg">
        <span className="text-4xl">📱</span>
      </div>
    </div>

    {/* Heading */}
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
      Phone Login
    </h2>

    <p className="text-center text-gray-500 text-sm mb-8">
      Login with your phone number
    </p>

    {/* Phone Number */}
    <input
      type="text"
      placeholder="Phone Number"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      className="w-full h-14 px-5 rounded-2xl border border-violet-200 bg-violet-50 outline-none focus:ring-2 focus:ring-violet-500 transition mb-5 text-gray-700 placeholder:text-gray-400"
    />

    <button
     onClick={getOtp}
     disabled={phone.length !== 10}
     className={`w-full h-14 rounded-2xl text-white font-semibold text-lg shadow-lg transition
      ${
        phone.length === 10
          ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:scale-[1.02] active:scale-95"
          : "bg-gray-400 cursor-not-allowed"
        }`}
      >
      Get OTP
    </button>

    <div className="flex items-center my-8">
      <div className="flex-1 h-px bg-gray-300"></div>
      <span className="mx-3 text-gray-400">or</span>
      <div className="flex-1 h-px bg-gray-300"></div>
    </div>

    {/* OTP */}
    <input
      type="text"
      placeholder="Enter OTP"
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
       disabled={!otpSent}
      className="w-full h-14 px-5 rounded-2xl border border-violet-200 bg-violet-50 outline-none focus:ring-2 focus:ring-violet-500 transition mb-5 text-gray-700 placeholder:text-gray-400"
    />

    <button
       onClick={login}
       disabled={!otpSent}
       className={`w-full h-14 rounded-2xl text-white font-semibold text-lg shadow-lg transition
       ${
         otpSent
          ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:scale-[1.02] active:scale-95"
          : "bg-gray-400 cursor-not-allowed"
       }`}
    >
      Login
    </button>

    <div className="mt-8 text-center text-gray-500 text-sm">
      🔒 Your data is safe and secure
    </div>

  </div>

</div>
  );
}

export default Login;