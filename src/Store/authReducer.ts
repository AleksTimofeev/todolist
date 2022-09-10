import {Dispatch} from "redux";
import {api, AuthMeRequestType} from "../API/api";


type ActionsType = ReturnType<typeof authMeAC> | ReturnType<typeof authDataLoading>
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

    default:
      return state
  }
}

const authMeAC = (authData: AuthMeRequestType) => ({authData, type: 'AUTH_ME'} as const)
const authDataLoading = (value: boolean) => ({value, type: 'AUTH_DATA_LOADING'} as const)

export const authMeTC = () => (dispatch: Dispatch) => {
  api.authMe()
    .then(data => {
      if (data.resultCode === 0) {
        dispatch(authMeAC(data.data))
        dispatch(authDataLoading(false))
      } if (data.resultCode === 1){
        dispatch(authDataLoading(false))
      }
    })
}