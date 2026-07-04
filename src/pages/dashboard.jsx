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
    // Re-click => Unselect
    if (selectedLocker.includes(lockerId)) {
      setSelectedLocker(
        selectedLocker.filter(id => id !== lockerId)
      );
      await unblocklocker(lockerId);
    } else {
      setSelectedLocker([
        ...selectedLocker,
        lockerId
      ]);
      await tempblocklocker(lockerId);
    }
  };

  return (
  <div>
    <div><button onClick = {navigateToProfile}>user</button></div>
    <div>
      {lockers.map((locker) => (
        <Locker
          key={locker.id}
          locker={locker}
          selectedLocker={selectedLocker}
          onLockerClick={handleLockerClick}
        />
      ))}
    </div>
    <div><BookingForm selectedLocker={selectedLocker} /></div>
  </div>
  );
}

export default Dashboard;