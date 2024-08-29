import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    users: [],
    filterUsers: [],
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
      console.log("hey123")
      console.log(state.filterUsers);
      state.filterUsers = action.payload.filterUsers;
    },
  },
});

export const { appendData, setFilteredData } = dataSlice.actions;
export default dataSlice.reducer;
