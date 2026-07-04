import { configureStore } from "@reduxjs/toolkit";
import lockerReducer from "./features/lockerSlice";

const store = configureStore({
  reducer: {
    locker: lockerReducer
  }
});

export default store;
export { store };
