import lockericon from "../assets/locker.png";

function Locker({
  locker,
  selectedLocker,
  onLockerClick
}) {
  const lockerId = locker?.lockId ?? locker?.lockerId ?? locker?.id;

  const isDisabled =
    locker.status === "booked" ||
    locker.status === "tempLock" ||
    locker.status === "tempbook";

  const isSelected = selectedLocker.some((item) => {
    const itemId = item?.lockId ?? item?.lockerId ?? item?.id ?? item;
    return itemId === lockerId;
  });

  const backgroundColor = isDisabled
    ? "#689ff731" // Red
    : isSelected
    ? "#3b82f6" // Blue
    : "#22c55e"; // Green

  return (
    <div
      onClick={() => {
        if (!isDisabled) {
          onLockerClick(lockerId);
        }
      }}
      style={{
        width: "calc(25% - 10px)",
        maxWidth: "78px",
        aspectRatio: "1 / 1",
        backgroundColor,
        borderRadius: "12px",
        margin: "6px",
        cursor: isDisabled ? "not-allowed" : "pointer",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        boxShadow: "0 6px 12px rgba(0,0,0,0.22)",
        border: "1px solid rgba(255,255,255,0.35)",
        transform: "translateY(-1px)",
      }}
    >
      <img
        src={lockericon}
        alt="Locker"
        style={{
          width: "86%",
          height: "86%",
          objectFit: "contain",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "4px",
          right: "4px",
          width: "22px",
          height: "18px",
          borderRadius: "50%",
          background: "#f3dddd",
          color: "#111010",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
          fontSize: "10px",
          zIndex: 2,
          boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
        }}
      >
        {lockerId}
      </div>
    </div>
  );
}

export default Locker;