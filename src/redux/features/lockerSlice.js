import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lockers: []
};

const lockerSlice = createSlice({
  name: "locker",
  initialState,
  reducers: {
    updateStatus: (state, action) => {
      const { lockId, status } = action.payload;

      const locker = state.lockers.find(
        (item) => item.lockId === lockId
      );

      if (locker) {
        locker.status = status;
      }
    },
    setLockers: (state, action) => {
      state.lockers = action.payload;
    },
    
  }
});

export const { updateStatus, setLockers } = lockerSlice.actions;
export default lockerSlice.reducer;