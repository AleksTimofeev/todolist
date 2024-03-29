import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {logout} from "./authReducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialStateType = {
  appStatus: RequestStatusType
  todolistStatus: Array<{idTodolist: string, status: RequestStatusType}>
  taskStatus: Array<{idTodolist: string, idTask: string, status: RequestStatusType}>
  statusErrorMessage: string | null
  appError: string | null
  appInfo: string | null
  showTaskDescription: string | null
}

const initialState: InitialStateType = {
  appStatus: 'idle' as RequestStatusType,
  todolistStatus: [],
  taskStatus: [],
  statusErrorMessage: null,
  appError: null,
  appInfo: null,
  showTaskDescription: null
}

const appReducerSlice = createSlice({
  name: 'appReducer',
  initialState: initialState,
  reducers: {
    setStatusErrorMessage: (state, action: PayloadAction<string>) => {
      state.statusErrorMessage = action.payload
    },
    setAppError: (state, action: PayloadAction<string | null>) => {
      state.appError = action.payload
    },
    setAppInfo: (state, action: PayloadAction<string | null>) => {
      state.appInfo = action.payload
    },
    setAppStatus: (state, action: PayloadAction<RequestStatusType>) => {
      state.appStatus = action.payload
    },
    setTodolistStatus: (state, action: PayloadAction<{idTodolist: string, status: RequestStatusType}>) => {
      const todolist = state.todolistStatus.find(item => item.idTodolist === action.payload.idTodolist)
      if(todolist){
        // state.todolistStatus = state.todolistStatus.map(
        //   item => item.idTodolist === action.payload.idTodolist ? action.payload : item
        // )
        state.todolistStatus.forEach(item => {
          if (item.idTodolist === action.payload.idTodolist) {
            item.status = action.payload.status
          }
        })
      } else {
        state.todolistStatus = [...state.todolistStatus, action.payload]
      }
    },
    setTaskStatus: (state, action: PayloadAction<{idTodolist: string, idTask: string, status: RequestStatusType}>) => {
      const task = state.taskStatus.find(task => task.idTask === action.payload.idTask)
      if(task){
        state.taskStatus = state.taskStatus.map(
          task => task.idTask === action.payload.idTask ? {...task, status: action.payload.status} : task
        )
      } else {
        state.taskStatus = [...state.taskStatus, action.payload]
      }
    },
    showTaskDescription: (state, action: PayloadAction<{idTask: string}>) => {
      state.showTaskDescription = action.payload.idTask
    },
    closeTaskDescription: (state) => {
      state.showTaskDescription = null
    }
  },
  extraReducers: builder => {
    builder.addCase(logout.fulfilled, (state) => {
      state.todolistStatus = []
      state.taskStatus = []
    })

  }
})

export const {
  setStatusErrorMessage,
  setAppError,
  setAppInfo,
  setAppStatus,
  setTodolistStatus,
  setTaskStatus,
  showTaskDescription,
  closeTaskDescription,
} = appReducerSlice.actions

export const appReducer = appReducerSlice.reducer
