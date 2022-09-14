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

export const logoutTC = (): AppThunkType => async dispatch => {
  try {
    const res = await api.logout()
    if(res.resultCode === 0){
      dispatch(logoutAC())
    }else{alert(res.messages[0])}
  }catch (e){
    alert(e)
  }

}
export const loginTC = (email: string, password: string, rememberMe: boolean): AppThunkType => async dispatch => {

  dispatch(setStatusTodolistsAC('loading'))
  try {
    const res = await api.login(email, password, rememberMe)
    if(res.resultCode === 0){
      dispatch(authMeTC())
    }else{alert(res.messages[0])}
  }catch (e) {
    alert(e)
  }finally {
    dispatch(setStatusTodolistsAC('succeeded'))
  }
}
export const authMeTC = (): AppThunkType => async dispatch => {
  try {
    const res = await api.authMe()
    if (res.resultCode === 0) {
      dispatch(authMeAC(res.data))
    }
  }catch (e) {
    alert(e)
  }finally {
    dispatch(authDataLoading(false))
  }

}