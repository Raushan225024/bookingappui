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




//import { useEffect } from "react";
import Dashboard from "./pages/dashboard";
//import { connectSocket } from "./socket/socket";
//import Login from "./pages/loginform";
//import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  

  return <div>
    <Dashboard />
  </div>
}

export default App;