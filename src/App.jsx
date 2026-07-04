/*import { useEffect } from "react";
import Dashboard from "./pages/dashboard";
import { connectSocket } from "./socket/socket";
import Login from "./pages/loginform";
import { Routes, Route } from "react-router-dom";


function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      connectSocket();
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
*/




import { useEffect } from "react";
import Dashboard from "./pages/dashboard";
import { connectSocket } from "./socket/socket";
import Login from "./pages/loginform";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      connectSocket();
    }
  }, [token]);

  return (
    <Routes>
      {/* Login Route */}
      <Route
        path="/login"
        element={
          token
            ? <Navigate to="/" replace />
            : <Login />
        }
      />

      {/* Protected Dashboard Route */}
      <Route
        path="/"
        element={
          token
            ? <Dashboard />
            : <Navigate to="/login" replace />
        }
      />
    </Routes>
  );
}

export default App;