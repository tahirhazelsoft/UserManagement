import {
  SEARCH_USER,
  SORT_USERS_ASC,
  SORT_USERS_DESC,
  AUTHENTICATE_USER,
  SET_USERS,
  SET_LOADING,
  SET_ERROR,
  ADD_USER,
  DELETE_USER,
  UPDATE_USER,
  LOGOUT_USER,
} from "../Actions/userActions";
import toast from "react-hot-toast";

const initialState = {
  users: [],
  searchResult: [],
  loggedInUser: localStorage.getItem("loggedInUser")
    ? JSON.parse(localStorage.getItem("loggedInUser"))
    : null,
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_USER:
      const searchTerm = action.payload.toLowerCase();

      return {
        ...state,
        searchResult: searchTerm
        ? state.users.filter((user) =>
            user.firstName.toLowerCase() === searchTerm
          )
        : []
      };
      

    case SORT_USERS_ASC:
      return {
        ...state,
        users: [...state.users].sort((a, b) => a.id - b.id),
      };

    case SORT_USERS_DESC:
      return {
        ...state,
        users: [...state.users].sort((a, b) => b.id - a.id),
      };

    case AUTHENTICATE_USER:
      if (action.payload.error) {
        toast.error("Invalid email or password!");
        return { ...state, loggedInUser: null, error: action.payload.error };
      } else {
        const authenticatedUser = action.payload;
        console.log(authenticatedUser);
        toast.success("Login successful!");
        localStorage.setItem("loggedInUser", JSON.stringify(authenticatedUser));
        return { ...state, loggedInUser: authenticatedUser };
      }
    case LOGOUT_USER:
      toast.success("Logout successful!");
      localStorage.removeItem("loggedInUser");
      return {
        ...state,
        loggedInUser: null,
      };
    case SET_USERS:
      return { ...state, users: action.payload };

    case SET_LOADING:
      return { ...state, loading: action.payload };

    case SET_ERROR:
      return { ...state, error: action.payload };

    case ADD_USER:
      return { ...state, users: [...state.users, action.payload] };

    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };

    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };

    default:
      return state;
  }
};

export default userReducer;
