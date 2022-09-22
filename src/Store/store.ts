import {rootReducer} from "./rootReducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";

export type AppDispatch = typeof store.dispatch

export type AppThunkType = ThunkAction<void, AppStateType, unknown, any>

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})
export type AppStateType = ReturnType<typeof store.getState>
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector

export default store