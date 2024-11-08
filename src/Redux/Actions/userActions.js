import { useSelector } from "react-redux";
import {
  fetchUsers,
  deleteUser,
  updateUser,
  addUser,
  LogInUser,
} from "../Services/userServices";
import toast from "react-hot-toast";

// Action types
export const SEARCH_USER = "SEARCH_USER";
export const SORT_USERS_ASC = "SORT_USERS_ASC";
export const SORT_USERS_DESC = "SORT_USERS_DESC";
export const AUTHENTICATE_USER = "AUTHENTICATE_USER";
export const SET_USERS = "SET_USERS";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";
export const ADD_USER = "ADD_USER";
export const DELETE_USER = "DELETE_USER";
export const UPDATE_USER = "UPDATE_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const CLEAR_ERROR = "CLEAR_ERROR";

// Action creators
export const searchUser = (searchTerm) => ({
  type: SEARCH_USER,
  payload: searchTerm,
});

export const sortUsersAscending = () => ({ type: SORT_USERS_ASC });
export const sortUsersDescending = () => ({ type: SORT_USERS_DESC });
export const logoutUser = () => ({ type: LOGOUT_USER });
// Action creator to clear specific error
export const clearError = (key) => ({
  type: CLEAR_ERROR,
  payload: key,
});


// Helper functions for loading and error state
const setLoading = (key, status) => ({
  type: SET_LOADING,
  payload: { key, status },
});
const setError = (key, error) => ({
  type: SET_ERROR,
  payload: { key, error },
});

// Thunk actions
export const fetchUsersAsync = () => async (dispatch) => {
  dispatch(setLoading("fetchUser", true));
  try {
    const users = await fetchUsers();
    dispatch({ type: SET_USERS, payload: users });
  } catch (error) {
    dispatch(setError("fetchUser", error.message));
    toast.error("Error fetching users.");
  } finally {
    dispatch(setLoading("fetchUser", false));
  }
};

export const deleteUserAsync = (id) => async (dispatch) => {
  dispatch(setLoading("deleteUser", true));
  try {
    await deleteUser(id);
    dispatch({ type: DELETE_USER, payload: id });
    toast.success("User deleted successfully.");
  } catch (error) {
    dispatch(setError("deleteUser", error.message));
    toast.error("Error deleting user.");
  } finally {
    dispatch(setLoading("deleteUser", false));
  }
};

// export const updateUserAsync = (user) => async (dispatch) => {
//   dispatch(setLoading("updateUser", true));
//   try {
//     const updatedUser = await updateUser(user);
//     dispatch({ type: UPDATE_USER, payload: updatedUser });
//     toast.success("User updated successfully.");
//   } catch (error) {
//     dispatch(setError("updateUser", error.message));
//     toast.error("Error updating user.");
//   } finally {
//     dispatch(setLoading("updateUser", false));
//   }
// };

// export const addUserAsync = (user) => async (dispatch) => {
//   dispatch(setLoading("addUser", true));
//   try {
//     const newUser = await addUser(user);
//     dispatch({ type: ADD_USER, payload: newUser });
//     toast.success("User added successfully.");
//   } catch (error) {
//     dispatch(setError("addUser", error.message));
//     toast.error("Error adding user.");
//   } finally {
//     dispatch(setLoading("addUser", false));
//   }
// };



export const updateUserAsync = (user,success) => async (dispatch) => {
  dispatch(setLoading("updateUser", true));
  try {
    const updatedUser = await updateUser(user);
    dispatch({ type: UPDATE_USER, payload: updatedUser });
    toast.success("User updated successfully.");
    success()
  } catch (error) {
    dispatch(setError("updateUser", error.message)); // This sets the error in Redux
    toast.error("Error updating user.");
  } finally {
    dispatch(setLoading("updateUser", false));
  }
};

export const addUserAsync = (user,success) => async (dispatch) => {
  dispatch(setLoading("addUser", true));
  try {
    const newUser = await addUser(user);
    dispatch({ type: ADD_USER, payload: newUser });
    toast.success("User added successfully.");
    success()
  } catch (error) {
    dispatch(setError("addUser", error.message)); // This sets the error in Redux
    toast.error("Error adding user.");
  } finally {
    dispatch(setLoading("addUser", false));
  }
};

export const loggedInUserAsync = (email, password) => async (dispatch) => {
  try {
    const user = await LogInUser(email, password);
    dispatch({ type: AUTHENTICATE_USER, payload: user });
  } catch (error) {
    dispatch({ type: AUTHENTICATE_USER, payload: { error: error.message } });
  }
};


export const logoutUserAsync = () => {
  return (dispatch) => {
    localStorage.removeItem("authToken");
    dispatch({ type: LOGOUT_USER });
    toast.success("You have been logged out automatically.");
  };
};
