import {combineReducers} from "redux";
import {authReducer} from "./authReducer";
import {todolistsReducer} from "./todolistsReducer";


export const rootReducer = combineReducers({
  authReducer: authReducer,
  todolists: todolistsReducer
})