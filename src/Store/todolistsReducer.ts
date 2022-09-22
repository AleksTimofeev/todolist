import {api, TodolistType} from "../API/api";
import {RequestStatusType, setStatusTodolistsAC} from "./appReducer";
import {AppThunkType} from "./store";
import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";

export type FullTodolistType = Array<TodolistType & {
  statusRemoveTodolist: RequestStatusType
  statusGetTaskForTodolist: RequestStatusType
  statusRemoveTask: RequestStatusType
  statusAddTask: RequestStatusType
  statusUpdateTodolist: RequestStatusType
}>

const initialState: FullTodolistType = []

const todolistsSlice = createSlice({
  name: 'todolists',
  initialState: initialState,
  reducers: {
    getTodolistsAC: (state, action: PayloadAction<{ todolists: Array<TodolistType> }>) => {
      return action.payload.todolists.map(item => ({
        ...item,
        statusRemoveTodolist: 'idle',
        statusGetTaskForTodolist: 'idle',
        statusRemoveTask: 'idle',
        statusAddTask: 'idle',
        statusUpdateTodolist: 'idle',
      }))
    },
    addTodolistsAC: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
      return [{
        ...action.payload.todolist,
        statusRemoveTodolist: 'idle',
        statusGetTaskForTodolist: 'idle',
        statusRemoveTask: 'idle',
        statusAddTask: 'idle',
        statusUpdateTodolist: 'idle',
      }, ...state]
    },
    updateTodolistAC: (state, action: PayloadAction<{ idTodolist: string, title: string }>) => {
      return state.map(
        item => item.id === action.payload.idTodolist ? {...item, title: action.payload.title} : item
      )
    },
    removeTodolistAC: (state, action: PayloadAction<{ idTodolist: string }>) => {
      return state.filter(item => item.id !== action.payload.idTodolist)
    },
    changeStatusUpdateTodolistAC:
      (state, action: PayloadAction<{ status: RequestStatusType, idTodolist: string }>) => {
      return state.map(
        item => item.id === action.payload.idTodolist ? {...item, statusUpdateTodolist: action.payload.status} : item
      )
    },
    changeStatusRemoveTodolistAC:
      (state, action: PayloadAction<{ status: RequestStatusType, idTodolist: string }>) => {
      return state.map(
        item => item.id === action.payload.idTodolist ? {...item, statusRemoveTodolist: action.payload.status} : item
      )
    },
    changeStatusRemoveTaskAC:
      (state, action: PayloadAction<{ status: RequestStatusType, idTodolist: string }>) => {
      return state.map(
        item => item.id === action.payload.idTodolist ? {...item, statusRemoveTask: action.payload.status} : item
      )
    },
  },
})

export const todolistsReducer = todolistsSlice.reducer

export const {
  getTodolistsAC,
  addTodolistsAC,
  updateTodolistAC,
  removeTodolistAC,
  changeStatusUpdateTodolistAC,
  changeStatusRemoveTodolistAC,
  changeStatusRemoveTaskAC
} = todolistsSlice.actions

export const getTodolists = () => async (dispatch: Dispatch) => {
  dispatch(setStatusTodolistsAC({status: 'loading'}))
  try {
    const res = await api.getTodolists()
    dispatch(getTodolistsAC({todolists: res}))
  } catch (e) {
    alert(e)
  } finally {
    dispatch(setStatusTodolistsAC({status: 'succeeded'}))
  }
}

export const addTodolist = (title: string): AppThunkType => async (dispatch) => {
  dispatch(setStatusTodolistsAC({status: 'loading'}))
  try {
    const res = await api.addTodolist(title)
    if (res.resultCode === 0) {
      dispatch(addTodolistsAC({todolist: res.data.item}))
    } else {
      alert(res.messages[0])
    }
  } catch (e) {
    alert(e)
  } finally {
    dispatch(setStatusTodolistsAC({status: 'succeeded'}))
  }
}

export const updateTodolist = (idTodolist: string, title: string) => async (dispatch: Dispatch) => {
  dispatch(changeStatusUpdateTodolistAC({status: 'loading', idTodolist}))
  try {
    const res = await api.updateTodolist(idTodolist, title)
    if (res.resultCode === 0) {
      dispatch(updateTodolistAC({idTodolist, title}))
    } else {
      alert(res.messages[0])
    }
  } catch (e) {
    alert(e)
  } finally {
    dispatch(changeStatusUpdateTodolistAC({status: 'succeeded', idTodolist}))
  }
}

export const removeTodolist = (idTodolist: string) => async (dispatch: Dispatch) => {
  dispatch(setStatusTodolistsAC({status: 'loading'}))
  dispatch(changeStatusRemoveTodolistAC({idTodolist, status: 'loading'}))
  try {
    const res = await api.removeTodolist(idTodolist)
    if (res.resultCode === 0) {
      dispatch(removeTodolistAC({idTodolist}))
    }
  } catch (e) {
    alert(e)
  } finally {
    dispatch(setStatusTodolistsAC({status: 'succeeded'}))
    dispatch(changeStatusRemoveTodolistAC({idTodolist, status: 'succeeded'}))
  }
}