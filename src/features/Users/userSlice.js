import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {
  fetchUsers,
  deleteUser,
  updateUser,
  addUser,
} from "../../Services/UserService";

const initialState = {
  users: [],
  searchResult: [],
  LoggedInUser: [],
  loading: false,
  error: null,
};

export const fetchUsersAsync = createAsyncThunk(
  "users/fetchUsers",
  async () => {
    const users = await fetchUsers();
    return users;
  }
);

export const deleteUserAsync = createAsyncThunk(
  "users/deleteUser",
  async (id) => {
    await deleteUser(id);
    return id;
  }
);

export const updateUserAsync = createAsyncThunk(
  "users/updateUser",
  async (user) => {
    const updatedUser = await updateUser(user);
    return updatedUser;
  }
);

export const addUserAsync = createAsyncThunk("users/addUser", async (user) => {
  const newUser = await addUser(user);
  return newUser;
});

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    searchUser: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      if (searchTerm) {
        const filteredUsers = state.users.filter((user) =>
          user.firstName.toLowerCase().includes(searchTerm)
        );
        state.searchResult = filteredUsers;
      } else {
        state.searchResult = []; 
      }
    },
    UsersInDescendingOrder:(state,action)=>{
      state.users = [...state.users].sort((a, b) => b.id - a.id);
    },
    UsersInAscendingOrder:(state,action)=>{
      state.users = [...state.users].sort((a, b) => a.id - b.id);
    },
    authenticateUser: (state, action) => {
      const { email, password } = action.payload;
      const authenticatedUser = state.users.filter(
        (user) =>
          user.email.toLowerCase() === email.toLowerCase() &&
          user.password === password
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
        toast.success("User deleted successfully!");
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
          toast.success("User updated successfully!");
        }
      })
      .addCase(addUserAsync.fulfilled, (state, action) => {
        state.users.push(action.payload);
        toast.success("User registered successfully!");
      });
  },
});

export const { authenticateUser,UsersInDescendingOrder,UsersInAscendingOrder,searchUser } = userSlice.actions;

export default userSlice.reducer;
