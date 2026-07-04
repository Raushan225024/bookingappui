import { useNavigate } from "react-router-dom";

function UserProfile({ user, bookedLockers }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "500px",
        margin: "auto"
      }}
    >
      <h2>User Profile</h2>

      <h3>Welcome {user.name}</h3>

      <h4>Booked Lockers</h4>

      {bookedLockers.length === 0 ? (
        <p>No Locker Booked</p>
      ) : (
        <ul>
          {bookedLockers.map((lockerId) => (
            <li key={lockerId}>
              Locker {lockerId}
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={handleLogout}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          cursor: "pointer"
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default UserProfile;