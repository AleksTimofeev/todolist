import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {removeTodolist} from "./todolistsReducer";
import {authMe} from "./authReducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialStateType = {
  statusTodolists: RequestStatusType
  statusTasks: RequestStatusType
  statusUpdateTodolist: RequestStatusType
  statusErrorMessage: string | null
  appError: string | null
}

const initialState: InitialStateType = {
  statusTodolists: 'idle' as RequestStatusType,
  statusTasks: 'idle' as RequestStatusType,
  statusUpdateTodolist: 'idle' as RequestStatusType,
  statusErrorMessage: null,
  appError: null
}

const appReducerSlice = createSlice({
  name: 'appReducer',
  initialState: initialState,
  reducers: {
    setStatusTodolistsAC: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.statusTodolists = action.payload.status
    },
    setStatusErrorMessage: (state, action: PayloadAction<string>) => {
      state.statusErrorMessage = action.payload
    },
    setAppError: (state, action: PayloadAction<string>) => {
      state.appError = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(removeTodolist.rejected, (state, action) => {
      return {...state, error: action.payload?.error}
    })
  }
})

export const {setStatusTodolistsAC, setStatusErrorMessage, setAppError} = appReducerSlice.actions

export const appReducer = appReducerSlice.reducer
