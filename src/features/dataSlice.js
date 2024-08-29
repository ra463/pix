import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    users: [],
    filterUsers: [],
    total: 0,
  },
  reducers: {
    appendData: (state, action) => {
      const existingUsers = new Set(state.users.map((user) => user.id));
      const newUsers = action.payload.users.filter(
        (user) => !existingUsers.has(user.id)
      );
      state.users = [...state.users, ...newUsers];
    },
    setFilteredData: (state, action) => {
      state.filterUsers = action.payload.filterUsers;
    },
  },
});

export const { appendData, setFilteredData } = dataSlice.actions;
export default dataSlice.reducer;
