import { useState } from "react";
import Locker from "./lockericon";
import BookingForm from "./bookingform";
import { tempblocklocker, unblocklocker } from "../socket/sockethandler";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function Dashboard() {
  const [selectedLocker, setSelectedLocker] = useState([]);
  const navigate = useNavigate();
  const lockers = useSelector(state => state.locker.lockers);
  
  const navigateToProfile = () => {
    navigate("/user");
  };

  const handleLockerClick = async (lockerId) => {
    if (selectedLocker.includes(lockerId)) {
      setSelectedLocker(selectedLocker.filter((id) => id !== lockerId));
      await unblocklocker(lockerId);
    } else {
      setSelectedLocker([...selectedLocker, lockerId]);
      await tempblocklocker(lockerId);
    }
  };

  return (
    <div
      style={{
        padding: "10px",
        maxWidth: "420px",
        margin: "0 auto",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
     <div className="w-full h-10 bg-sky-100 shadow-md flex items-center justify-end px-6 mb-4">
  <button
  onClick={navigateToProfile}
  className="flex items-center gap-1 bg-sky-500 hover:bg-sky-600 text-white text-xs font-medium px-2.5 py-1 rounded-full shadow transition duration-200"
>
  👤 User
</button>
</div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          paddingBottom: "12px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {lockers.map((locker) => (
            <Locker
              key={locker.lockId}
              locker={locker}
              selectedLocker={selectedLocker}
              onLockerClick={handleLockerClick}
            />
          ))}
        </div>
      </div>

      <div
        style={{
          marginTop: "12px",
          flexShrink: 0,
          background: "white",
          paddingTop: "8px",
          borderTop: "1px solid #eee",
        }}
      >
        <BookingForm selectedLocker={selectedLocker} />
      </div>
    </div>
  );
}

export default Dashboard;