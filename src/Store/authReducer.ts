import {Dispatch} from "redux";
import {api, AuthMeRequestType} from "../API/api";


type ActionsType = ReturnType<typeof authMeAC> |
  ReturnType<typeof authDataLoading> |
  ReturnType<typeof loginAC> |
  ReturnType<typeof logoutAC>

type AuthDataLoadingType = {
  authDataLoading: boolean
  isLogged: boolean
}
type InitialStateType = AuthMeRequestType & AuthDataLoadingType

const initialState: InitialStateType = {
  id: null,
  login: null,
  email: null,
  authDataLoading: true,
  isLogged: false
}

export const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {

    case "AUTH_ME":
      return {
        ...state, ...action.authData, isLogged: true
      }
    case "AUTH_DATA_LOADING":
      return {
        ...state, authDataLoading: action.value
      }
    case "LOGIN":
      return {
        ...state, id: action.id, isLogged: true
      }
    case "LOGOUT":
      return {...state,
        isLogged: false,
        id: null,
        login: null,
        email: null,}

    default:
      return state
  }
}

const authMeAC = (authData: AuthMeRequestType) => ({authData, type: 'AUTH_ME'} as const)
const authDataLoading = (value: boolean) => ({value, type: 'AUTH_DATA_LOADING'} as const)
const loginAC = (id: number) => ({type: 'LOGIN', id} as const)
const logoutAC = () => ({type: 'LOGOUT'} as const)

export const logoutTC = () => (dispatch: Dispatch) => {
  api.logout().then(res => {
    if (res.resultCode === 0) {
      dispatch(logoutAC())
    }
  })
}
export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
  api.login(email, password, rememberMe)
    .then(res => {
      if (res.resultCode === 0) {
        dispatch(loginAC(res.data.userId))
      }
    })
}
export const authMeTC = () => (dispatch: Dispatch) => {
  api.authMe()
    .then(data => {
      if (data.resultCode === 0) {
        dispatch(authMeAC(data.data))
        dispatch(authDataLoading(false))
      }
      if (data.resultCode === 1) {
        dispatch(authDataLoading(false))
      }
    })
}