import {
  fetchUsers,
  deleteUser,
  updateUser,
  addUser,
  LogInUser
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

// Action creators
export const searchUser = (searchTerm) => ({
  type: SEARCH_USER,
  payload: searchTerm,
});

export const sortUsersAscending = () => ({ type: SORT_USERS_ASC });
export const sortUsersDescending = () => ({ type: SORT_USERS_DESC });


// Thunk actions
export const fetchUsersAsync = () => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const users = await fetchUsers();
    dispatch({ type: SET_USERS, payload: users });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message });
    toast.error("Error fetching users.");
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const deleteUserAsync = (id) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    await deleteUser(id);
    dispatch({ type: DELETE_USER, payload: id });
    toast.success("User deleted successfully.");
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message });
    toast.error("Error deleting user.");
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const updateUserAsync = (user) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const updatedUser = await updateUser(user);
    dispatch({ type: UPDATE_USER, payload: updatedUser });
    toast.success("User updated successfully.");
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message });
    toast.error("Error updating user.");
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const addUserAsync = (user) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const newUser = await addUser(user);
    dispatch({ type: ADD_USER, payload: newUser });
    toast.success("User added successfully.");
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message });
    toast.error("Error adding user.");
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const loggedInUserAsync = (email, password) => async (dispatch) => {
  try {
    const user = await LogInUser(email, password);
    dispatch({ type: AUTHENTICATE_USER, payload: user });

    // Set a timeout to log out the user after 5 minutes
    setTimeout(() => {
      dispatch(logoutUserAsync());
    }, 300000); // 300,000 ms = 5 minutes
  } catch (error) {
    dispatch({ type: AUTHENTICATE_USER, payload: { error: error.message } });
  }
};

export const logoutUserAsync = () => {
  return (dispatch) => {
    localStorage.removeItem('authToken');
    dispatch({ type: LOGOUT_USER });
    toast.success("You have been logged out automatically.");
  };
};