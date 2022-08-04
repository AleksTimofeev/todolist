import {AnyAction, applyMiddleware, compose, createStore} from "redux";
import {rootReducer} from "./rootReducer";
import {useDispatch} from "react-redux";
import thunkMiddleware, {ThunkDispatch} from "redux-thunk";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type AppStateType = ReturnType<typeof rootReducer>

export const useAppDispatch = () => useDispatch<ThunkDispatch<AppStateType,unknown,AnyAction> & AppDispatch>()
export type AppDispatch = typeof store.dispatch

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store