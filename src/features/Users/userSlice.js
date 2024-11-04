import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  // users: JSON.parse(localStorage.getItem("users")) || [],
  searchResult: [],
  LoggedInUser:[]
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // addUser: (state, action) => {
    //   const userExists = state.users.find(
    //     (user) => user.email === action.payload.email
    //   );
    //   if (userExists) {
    //     toast.error("User already exists!");
    //     return;
    //   }

    //   const nextId =
    //     state.users.length > 0
    //       ? Math.max(...state.users.map((user) => user.id)) + 1
    //       : 1;
    //   const newUser = { ...action.payload, id: nextId };
    //   state.users.push(newUser);
    //   localStorage.setItem("users", JSON.stringify(state.users));
    //   toast.success("User registered successfully!");
    // },
    // updateUser: (state, action) => {
    //   const index = state.users.findIndex(
    //     (user) => user.id === action.payload.id
    //   );
    //   if (index !== -1) {
    //     state.users[index] = action.payload;
    //     localStorage.setItem("users", JSON.stringify(state.users));
    //     toast.success("User updated successfully!");
    //   } else {
    //     toast.error("User not found!");
    //   }
    // },
    // deleteUser: (state, action) => {
    //   state.users = state.users.filter((user) => user.id !== action.payload);
    //   localStorage.setItem("users", JSON.stringify(state.users));
    //   toast.success("User deleted successfully!");
    // },
    // searchUser: (state, action) => {
    //   const searchTerm = action.payload.toLowerCase(); 
    //   state.searchResult = state.users.filter(
    //     (user) =>
    //       user.email.toLowerCase().includes(searchTerm) ||
    //       user.firstname.toLowerCase().includes(searchTerm) ||
    //       user.lastname.toLowerCase().includes(searchTerm)
    //   );
    // },
    authenticateUser: (state, action) => {
      const { email, password } = action.payload;
      const authenticatedUser = state.users.filter(
        (user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password
      );
      if (authenticatedUser.length) {
        state.LoggedInUser = authenticatedUser;
        toast.success("Login successful!");
      } else {
        toast.error("Invalid email or password!");
        state.LoggedInUser = [];
      }
    },
    
  },
});

export const { addUser, updateUser, deleteUser, searchUser, authenticateUser } =
  userSlice.actions;

export default userSlice.reducer;
