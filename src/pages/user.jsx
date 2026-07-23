import axios from "axios";
import HomeIcon from "../assets/home.svg";
import LogoutIcon from "../assets/user-logout.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";



function User() {
  const [user, setUser] = useState(null);
  const [lockers, setLockers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [lockerId, setLockerId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
   
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }
  
    const response = await axios.post(
      "https://bookingapp-production-11ee.up.railway.app/api/user/user-lockers",
      {}, // request body (empty)
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("User Data:", response.data);

    setUser(response.data.user.userId);
    console.log("User:", response.data.user.userId);
    setLockers(response.data.user.lockers);
    console.log("Lockers:", response.data.user.lockers);

  } catch (err) {
    console.error(err);

    alert(err.response?.data?.message || err.message);

    // If token is invalid
    if (err.response?.status === 401) {
      //localStorage.removeItem("token");
      navigate("/login");
    }
  } finally {
    setLoading(false);
  }
};
  const getPassword = async() => {
    const token = localStorage.getItem("token");
    alert("Password will be sent to your registered mobile number via SMS.");
    await axios.post(
      "http://localhost:3000/api/user/getPassword",
      {}, // request body (empty)
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    

  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };
  const handleVerifyPassword = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      "http://localhost:3000/api/user/verify-password",
      {
        lockerId,
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);

    if (response.data.success) {
      alert("Locker opened successfully!");
    } else {
      alert(response.data.message);
    }
  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message || "Something went wrong."
    );
  }  
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    
    <div className="min-h-screen bg-slate-100 p-4">
      {/* Top Buttons */}
      <div className="mb-4 flex items-center justify-end gap-4">
        <h2 className="text-xl font-bold">UserId:{user}</h2>
        
         <button
         onClick={handleDashboard}
         className="flex h-9 w-9 items-center justify-center rounded-[25%] bg-blue-100 hover:bg-blue-200"
        >
          <img
           src={HomeIcon}
           alt="Home"
           className="h-3 w-3"
         />
        </button>

        <button
           onClick={handleLogout}
           className="flex h-9 w-9 items-center justify-center rounded-[25%] bg-red-100 hover:bg-red-200"
        >
          <img
            src={LogoutIcon}
            alt="Logout"
            className="h-3 w-3"
          />
       </button>
       
      </div>

      <div className="mx-auto mt-6 w-full max-w-[300px] rounded-xl border border-gray-200 bg-white shadow-lg">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-[50px] w-full items-center justify-between px-4 font-semibold text-gray-700 hover:bg-gray-50"
      >
        <span>Open Your Locker</span>

        {isOpen ? (
          <ChevronUp size={18} />
        ) : (
          <ChevronDown size={18} />
        )}
      </button>

      {/* Dropdown Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-80 p-4 pt-0" : "max-h-0"
        }`}
      >
        <div className="space-y-3">
          <input
            type="number"
            placeholder="Enter Locker ID"
            value={lockerId}
            onChange={(e) => setLockerId(e.target.value)}
            className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition focus:border-blue-500"
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition focus:border-blue-500"
          />

          <button
            onClick={handleVerifyPassword}
            className="h-10 w-full rounded-lg bg-blue-600 font-medium text-white transition hover:bg-blue-700 active:scale-95"
          >
            Open Locker
          </button>
        </div>
      </div>
    </div>

      {/* Booked Lockers */}
      <h2 className="mt-6 mb-3 text-xl font-bold">
        My Booked Lockers
      </h2>

      {lockers.length === 0 ? (
        <div className="rounded-xl bg-white p-5 text-center shadow">
          No lockers booked.
        </div>
      ) : (
        <div className="space-y-4">
          {lockers.map((locker) => (
            <div
              key={locker.lockId}
              className="rounded-xl bg-white p-4 shadow"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  🔐 {locker.lockerId}
                </h3>

                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                  {locker.status}
                </span>
              </div>

              <p className="mt-2 text-gray-600">
                Booked On
              </p>

              <p className="font-medium">
                {locker.bookedAt}
              </p>
            </div>
          ))}
        </div>
      )}
      <div className="mt-6 text-center">
          <button
            onClick={getPassword}
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Password
          </button>
          <p className="mt-1 text-sm text-gray-500">
            get-password by SMS 
          </p>
        </div>
    </div>
  );
}

export default User;