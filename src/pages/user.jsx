import { useEffect, useState } from "react";

function User() {
  const [user, setUser] = useState(null);
  const [lockers, setLockers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    // Token stored in localStorage
    const token = localStorage.getItem("token");
    console.log("JWT Token:", token);

    // Simulate API delay
    setTimeout(() => {
      const response = {
        user: {
          userId: "USR001",
          userName: "Raushan Kumar",
          phoneNo: "+91 9876543210",
        },

        lockers: [
          {
            lockId: "L001",
            status: "Booked",
            bookedAt: "07 Jul 2026, 10:30 AM",
          },
          {
            lockId: "L008",
            status: "Booked",
            bookedAt: "07 Jul 2026, 12:15 PM",
          },
          {
            lockId: "L021",
            status: "Booked",
            bookedAt: "08 Jul 2026, 09:00 AM",
          },
        ],
      };

      setUser(response.user);
      setLockers(response.lockers);
      setLoading(false);
    }, 1000);
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
      {/* User Card */}
      <div className="rounded-2xl bg-white p-5 shadow">
        <div className="mb-4 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-2xl font-bold text-white">
            {user.userName.charAt(0)}
          </div>

          <div>
            <h1 className="text-xl font-bold">{user.userName}</h1>
            <p className="text-gray-500">{user.userId}</p>
            <p className="text-gray-500">{user.phoneNo}</p>
          </div>
        </div>
      </div>

      {/* Booked Lockers */}
      <h2 className="mt-6 mb-3 text-xl font-bold">
        My Booked Lockers
      </h2>

      <div className="space-y-4">
        {lockers.map((locker) => (
          <div
            key={locker.lockId}
            className="rounded-xl bg-white p-4 shadow"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                🔐 {locker.lockId}
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
    </div>
  );
}

export default User;