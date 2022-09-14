import {AnyAction, applyMiddleware, compose, createStore} from "redux";
import {rootReducer} from "./rootReducer";
import {useDispatch} from "react-redux";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppActionsType} from "./appReducer";
import {AuthActionsType} from "./authReducer";
import {TaskActionsType} from "./taskReducer";
import {TodolistsActionsType} from "./todolistsReducer";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type AppStateType = ReturnType<typeof rootReducer>

export const useAppDispatch = () => useDispatch<ThunkDispatch<AppStateType,unknown,AnyAction> & AppDispatch>()
export type AppDispatch = typeof store.dispatch

export type ActionsType = AppActionsType | AuthActionsType | TaskActionsType | TodolistsActionsType

export type AppThunkType = ThunkAction<void, AppStateType, unknown, ActionsType>

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store