import {combineReducers} from "redux";
import {authReducer} from "./authReducer";
import {todolistsReducer} from "./todolistsReducer";
import {taskReducer} from "./taskReducer";


export const rootReducer = combineReducers({
  authReducer: authReducer,
  todolists: todolistsReducer,
  tasks: taskReducer
})