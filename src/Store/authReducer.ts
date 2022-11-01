import {api, AuthMeRequestType} from "../API/api";
import {setAppError, setStatusTodolistsAC} from "./appReducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";


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

export const authMe = createAsyncThunk(
  'auth/authMe', async (arg, thunkAPI) => {
    try {
      const res = await api.authMe()
      if (res.resultCode === 0) {
        return {authData: res.data}
      }
      else{
        thunkAPI.dispatch(setAppError(res.messages[0]))
        return thunkAPI.rejectWithValue({error: 'some error'})
      }
    }catch (e) {
      if(axios.isAxiosError(e)){
        console.log(e.message)
        thunkAPI.dispatch(setAppError(e.message))
      }
      return thunkAPI.rejectWithValue({error: 'some error'})
    }finally {
      thunkAPI.dispatch(authDataLoading({value: false}))
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout', async(arg, thunkAPI) => {
    try {
      const res = await api.logout()
      if (res.resultCode === 0) {
        return
      } else {
        thunkAPI.dispatch(setAppError(res.messages[0]))
        thunkAPI.rejectWithValue({message: res.messages[0]})
      }
    } catch (e) {
      if(axios.isAxiosError(e)){
        console.log(e.message)
        thunkAPI.dispatch(setAppError(e.message))
      }
      thunkAPI.rejectWithValue({message: 'error'})
    }
  }
)

export const login = createAsyncThunk(
  'auth/login', async(arg:{email: string, password: string, rememberMe: boolean}, thunkAPI) => {
    thunkAPI.dispatch(setStatusTodolistsAC({status: 'loading'}))
    try {
      const res = await api.login(arg.email, arg.password, arg.rememberMe)
      if (res.resultCode === 0) {
        thunkAPI.dispatch(authMe())
      } else {
        thunkAPI.dispatch(setAppError(res.messages[0]))
      }
    } catch (e) {
      if(axios.isAxiosError(e)){
        console.log(e.message)
        thunkAPI.dispatch(setAppError(e.message))
      }
    } finally {
      thunkAPI.dispatch(setStatusTodolistsAC({status: 'succeeded'}))
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    authDataLoading: (state, action: PayloadAction<{ value: boolean }>) => {
      state.authDataLoading = action.payload.value
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authMe.fulfilled, (state, action) => {
      if(action.payload){
        state.authData = action.payload.authData
        state.isLogged = true
      }
    })
    builder.addCase(logout.fulfilled, (state) => {
      state.authData = {id: null, login: null, email: null}
      state.isLogged = false
    })
  }
})

export const authReducer = authSlice.reducer
export const {authDataLoading} = authSlice.actions
