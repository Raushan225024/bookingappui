//const lockericon = require("../assets/locker.png");
import lockericon from "../assets/locker.png";
import useState from "react";
function Locker({
  locker,
  selectedLocker,
  onLockerClick
}) {
  const [clicked, setClicked] = useState(false);

  const isDisabled =
    locker.status === "booked" ||
    locker.status === "tempbook";

  const backgroundColor =
    isDisabled
      ? "red"
      : selectedLocker === locker.id
      ? "blue"
      : "green";

  return (
    <div
      onClick={() => {
        if (!isDisabled) {
          onLockerClick(locker);
          
        }
      }}
      style={{
        width: "100px",
        height: "100px",
        margin: "10px",
        backgroundColor,
        cursor: isDisabled ? "not-allowed" : "pointer"
      }}
    >
      <div
        style={{
          width: "60px",
          height: "60px",
          marginBottom: "10px"
        }}
      >
        <img
          src={lockericon}
          alt="Locker"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain"
          }}
        />
      </div>
       <div
        style={{
          fontWeight: "bold",
          fontSize: "16px"
        }}
      >
        Locker {locker.id}
      </div>
    
    </div>
  );
}

export default Locker;