import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import react from "react";
//import Razorpay from "razorpay";

function BookingForm({ selectedLocker }) {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleBooking = async() => {
    if (selectedLocker.length === 0) {
      alert("Please select at least one locker");
      return;
    }

    if (!/^\d{6}$/.test(password)) {
      alert("Password must be exactly 6 digits");
      return;
    }
const token = localStorage.getItem("token");

  const response = await axios.post(
    "http://localhost:3000/create-order",
    {
      lockers: selectedLocker,
      password: password
    },
    {
    headers: {
      Authorization: `Bearer ${token}`
    }
   }
  );

  const order = response.data;

  const options = {
    key: "YOUR_KEY_ID",

    amount: order.amount,

    currency: order.currency,

    order_id: order.id,

    name: "Locker Booking",

    description: "Locker Booking Payment",

    handler: async function (response) {

      await axios.post(
        "http://localhost:3000/verify-payment",
        response,
         {
            headers: {
            Authorization: `Bearer ${token}`
            }
        }
      );

      alert("Payment Success");
      navigate("/user");
    }
  };

  const razorpay = new window.Razorpay(options);

  razorpay.open();
}; 


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignItems: "stretch",
        marginTop: "0px",
        width: "100%",
      }}
    >
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        maxLength={6}
        style={{
          padding: "10px",
          fontSize: "16px",
          width: "100%",
          
        }}
      />

      <button
        onClick={handleBooking}
        style={{
          padding: "10px 20px",
          cursor: "pointer",
          width: "100%",
        }}
      >
        Booking
      </button>
    </div>
  );
}

export default BookingForm;