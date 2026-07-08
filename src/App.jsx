import User from "./pages/user";
import Dashboard from "./pages/dashboard";
import Login from "./pages/loginform";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      {/* Root Route */}
      <Route
        path="/"
        element={
          token ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Login Route */}
      <Route
        path="/login"
        element={
          token ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Login />
          )
        }
      />

      {/* Dashboard Route */}
      <Route
        path="/dashboard"
        element={
          token ? (
            <Dashboard />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* User Route */}
      <Route
        path="/user"
        element={
          token ? (
            <User />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Invalid Route */}
      <Route
        path="*"
        element={
          <Navigate
            to={token ? "/dashboard" : "/login"}
            replace
          />
        }
      />
    </Routes>
  );
}

export default App;