import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lockers: [  { lockId: "001", status: "available" },
  { lockId: "002", status: "booked" },
  { lockId: "003", status: "tempLock" },
  { lockId: "004", status: "available" },
  { lockId: "005", status: "available" },
  { lockId: "006", status: "booked" },
  { lockId: "007", status: "available" },
  { lockId: "008", status: "tempLock" },
  { lockId: "009", status: "booked" },
  { lockId: "010", status: "available" },

  { lockId: "011", status: "available" },
  { lockId: "012", status: "booked" },
  { lockId: "013", status: "available" },
  { lockId: "014", status: "tempLock" },
  { lockId: "015", status: "available" },
  { lockId: "016", status: "booked" },
  { lockId: "017", status: "available" },
  { lockId: "018", status: "available" },
  { lockId: "019", status: "tempLock" },
  { lockId: "020", status: "booked" },

  { lockId: "021", status: "available" },
  { lockId: "022", status: "available" },
  { lockId: "023", status: "booked" },
  { lockId: "024", status: "tempLock" },
  { lockId: "025", status: "available" },
  { lockId: "026", status: "booked" },
  { lockId: "027", status: "available" },
  { lockId: "028", status: "available" },
  { lockId: "029", status: "booked" },
  { lockId: "030", status: "tempLock" },

  { lockId: "031", status: "available" },
  { lockId: "032", status: "available" },
  { lockId: "033", status: "booked" },
  { lockId: "034", status: "available" },
  { lockId: "035", status: "tempLock" },
  { lockId: "036", status: "booked" },
  { lockId: "037", status: "available" },
  { lockId: "038", status: "available" },
  { lockId: "039", status: "tempLock" },
  { lockId: "040", status: "booked" },

  { lockId: "041", status: "available" },
  { lockId: "042", status: "booked" },
  { lockId: "043", status: "available" },
  { lockId: "044", status: "tempLock" },
  { lockId: "045", status: "available" },
  { lockId: "046", status: "booked" },
  { lockId: "047", status: "available" },
  { lockId: "048", status: "available" },
  { lockId: "049", status: "tempLock" },
  { lockId: "050", status: "booked" }]
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