import {Dispatch} from "redux";
import {apiAuth, AuthMeRequestType} from "../API/api";


type ActionsType = ReturnType<typeof authMeAC>
type InitialStateType = AuthMeRequestType
const initialState: InitialStateType = {
  id: null,
  login: null,
  email: null
}

export const authReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {

    case "AUTH_ME": return {
      ...action.authData
    }

    default: return state
  }
}

const authMeAC = (authData: AuthMeRequestType) => ({authData, type: 'AUTH_ME'} as const)

export const authMeTC = () => (dispatch: Dispatch) => {
    apiAuth.authMe()
      .then(data => {
        if (data.resultCode === 0){
          dispatch(authMeAC(data.data))
        }
      })
}