import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialStateType = {
  statusTodolists: RequestStatusType
  statusTasks: RequestStatusType
  statusUpdateTodolist: RequestStatusType
}

const initialState: InitialStateType = {
  statusTodolists: 'idle' as RequestStatusType,
  statusTasks: 'idle' as RequestStatusType,
  statusUpdateTodolist: 'idle' as RequestStatusType
}

const appReducerSlice = createSlice({
  name: 'appReducer',
  initialState: initialState,
  reducers: {
    setStatusTodolistsAC: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.statusTodolists = action.payload.status
    },
  }
})

export const {setStatusTodolistsAC} = appReducerSlice.actions

export const appReducer = appReducerSlice.reducer
