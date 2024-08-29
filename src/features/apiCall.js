import axios from "axios";
import { appendData, setFilteredData } from "../features/dataSlice";

export const getAllData = async (dispatch, limit, skip) => {
  try {
    const { data } = await axios.get(
      `https://dummyjson.com/users/?limit=${limit}&skip=${skip}`
    );
    if (data && data.users) {
      dispatch(appendData({ users: data.users }));
    } else {
      console.error("Unexpected data structure:", data);
    }
  } catch (error) {
    console.log(error);
  }
};

// filter on the basis of gender
export const getFilteredData = async (dispatch, gender) => {
  try {
    const { data } = await axios.get(`https://dummyjson.com/users/?limit=208`);
    if (data && data.users) {
      const filteredUsers = data.users.filter((user) => user.gender === gender);
      dispatch(setFilteredData({ filterUsers: filteredUsers }));
    }
  } catch (error) {
    console.log(error);
  }
};
