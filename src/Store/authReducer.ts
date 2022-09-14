import {api, AuthMeRequestType} from "../API/api";
import {setStatusTodolistsAC} from "./appReducer";
import {AppThunkType} from "./store";


export type AuthActionsType = ReturnType<typeof authMeAC> |
  ReturnType<typeof authDataLoading> |
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

export const authReducer = (state = initialState, action: AuthActionsType): InitialStateType => {
  switch (action.type) {

    case "AUTH_ME":
      return {
        ...state, ...action.authData, isLogged: true
      }
    case "AUTH_DATA_LOADING":
      return {
        ...state, authDataLoading: action.value
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
const logoutAC = () => ({type: 'LOGOUT'} as const)

export const logoutTC = (): AppThunkType => (dispatch) => {
  api.logout().then(res => {
    if (res.resultCode === 0) {
      dispatch(logoutAC())
    }
  })
}
export const loginTC = (email: string, password: string, rememberMe: boolean): AppThunkType => (dispatch) => {
  dispatch(setStatusTodolistsAC('loading'))
  api.login(email, password, rememberMe)
    .then(res => {
      if (res.resultCode === 0) {
        dispatch(authMeTC())
        dispatch(setStatusTodolistsAC('succeeded'))
      }
    })
}
export const authMeTC = (): AppThunkType => (dispatch) => {
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