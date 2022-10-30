import {api, AuthMeRequestType} from "../API/api";
import {setStatusTodolistsAC} from "./appReducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


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
        return thunkAPI.rejectWithValue({error: 'some error'})
      }
    }catch (e) {
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
        alert(res.messages[0])
        thunkAPI.rejectWithValue({message: res.messages[0]})
      }
    } catch (e) {
      alert(e)
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
        alert(res.messages[0])
      }
    } catch (e) {
      alert(e)
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
