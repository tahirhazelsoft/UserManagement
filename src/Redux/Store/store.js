import { legacy_createStore as createStore, applyMiddleware, combineReducers } from "redux";
import {thunk} from 'redux-thunk';
import userReducer from "../Reducers/userReducers"; 

const rootReducer = combineReducers({
  user: userReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));


