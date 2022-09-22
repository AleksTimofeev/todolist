import {api, AuthMeRequestType} from "../API/api";
import {setStatusTodolistsAC} from "./appReducer";
import {AppThunkType} from "./store";
import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";


type InitialStateType = {
  authData: AuthMeRequestType
  authDataLoading: boolean
  isLogged: boolean
}

const initialState: InitialStateType = {
  authData: {
    id: null,
    login: null,
    email: null
  },
  authDataLoading: true,
  isLogged: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    authMeAC: (state, action: PayloadAction<{ authData: AuthMeRequestType }>) => {
      state.authData = action.payload.authData
      state.isLogged = true
    },
    authDataLoading: (state, action: PayloadAction<{ value: boolean }>) => {
      state.authDataLoading = action.payload.value
    },
    logoutAC(state){
      state.authData = {id: null, login: null, email: null}
      state.isLogged = false
    }
  }
})

export const authReducer = authSlice.reducer
export const {authMeAC, authDataLoading, logoutAC} = authSlice.actions

export const logoutTC = (): AppThunkType => async dispatch => {
  try {
    const res = await api.logout()
    if (res.resultCode === 0) {
      dispatch(logoutAC())
    } else {
      alert(res.messages[0])
    }
  } catch (e) {
    alert(e)
  }

}
export const loginTC = (email: string, password: string, rememberMe: boolean): AppThunkType => async dispatch => {

  dispatch(setStatusTodolistsAC({status: 'loading'}))
  try {
    const res = await api.login(email, password, rememberMe)
    if (res.resultCode === 0) {
      dispatch(authMeTC())
    } else {
      alert(res.messages[0])
    }
  } catch (e) {
    alert(e)
  } finally {
    dispatch(setStatusTodolistsAC({status: 'succeeded'}))
  }
}
export const authMeTC = () => async (dispatch: Dispatch) => {
  try {
    const res = await api.authMe()
    if (res.resultCode === 0) {
      dispatch(authMeAC({authData: res.data}))
    }
  } catch (e) {
    alert(e)
  } finally {
    dispatch(authDataLoading({value: false}))
  }

}