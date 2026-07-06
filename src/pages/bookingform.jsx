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
    <div className="flex flex-col gap-3 rounded-2xl border border-sky-300/40 bg-gradient-to-br from-sky-100 to-blue-100 p-4 shadow-lg shadow-blue-200/50">
      <div className="flex gap-2">
        <div className="relative flex-1">
          
          <input
            type="password"
            placeholder="6-digit PIN as a locker password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            maxLength={6}
            className="w-full rounded-xl border border-sky-300/60 bg-white/80 px-4 py-2 text-sm text-blue-900 placeholder:text-blue-300 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-300/50"
          />
        </div>

        <button
          onClick={handleBooking}
          className="mt-auto flex-shrink-0 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 px-6 py-2 font-semibold text-white shadow-lg shadow-blue-400/40 transition hover:-translate-y-0.5 hover:shadow-blue-400/60 active:scale-[0.98]"
        >
          Book
        </button>
      </div>

      <div className="rounded-xl border border-sky-300/50 bg-sky-50 px-4 py-1 text-xs text-blue-700">
        {selectedLocker.length > 0
          ? `✓ ${selectedLocker.length} locker${selectedLocker.length > 1 ? "s" : ""} ready to book`
          : "Select lockers above to continue"}
      </div>
    </div>
  );
}

export default BookingForm;