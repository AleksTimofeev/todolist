import {applyMiddleware, compose, createStore} from "redux";
import {rootReducer} from "./rootReducer";
import thunkMiddleware, {ThunkDispatch} from "redux-thunk";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store