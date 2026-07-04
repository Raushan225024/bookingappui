const fs = require('fs');

const appContent = `import { useEffect } from "react";
import Dashboard from "./pages/dashboard";
import { connectSocket } from "./socket/socket";

function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      connectSocket();
    }
  }, []);

  return (
    <div>
      <Dashboard />
    </div>
  );
}

export default App;
`;

const storeContent = `import { configureStore } from "@reduxjs/toolkit";
import lockerReducer from "./features/lockerSlice";

const store = configureStore({
  reducer: {
    locker: lockerReducer
  }
});

export default store;
export { store };
`;

fs.writeFileSync('d:/bookingappui/appui/src/App.jsx', appContent, 'utf8');
fs.writeFileSync('d:/bookingappui/appui/src/redux/store.js', storeContent, 'utf8');
console.log('Wrote App.jsx and store.js');
