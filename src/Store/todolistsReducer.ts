import {api, TodolistType} from "../API/api";
import {RequestStatusType, setAppError, setStatusTodolistsAC} from "./appReducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

export type FullTodolistType = Array<TodolistType & {
  statusRemoveTodolist: RequestStatusType
  statusGetTaskForTodolist: RequestStatusType
  statusRemoveTask: RequestStatusType
  statusAddTask: RequestStatusType
  statusUpdateTodolist: RequestStatusType
}>

export const getTodolists = createAsyncThunk(
  'todolists/getTodolists', async (arg, thunkAPI) => {
  thunkAPI.dispatch(setStatusTodolistsAC({status: 'loading'}))
  try {
    const res = await api.getTodolists()
    return {todolists: res}
  } catch (e) {
    if(axios.isAxiosError(e)){
      console.log(e.message)
      thunkAPI.dispatch(setAppError(e.message))
    }
    return {todolists: []}
  } finally {
    thunkAPI.dispatch(setStatusTodolistsAC({status: 'succeeded'}))
  }
})

export const addTodolist = createAsyncThunk(
  'todolists/addTodolist', async (title: string, thunkAPI) => {
  thunkAPI.dispatch(setStatusTodolistsAC({status: 'loading'}))
  try {
    const res = await api.addTodolist(title)
    if (res.resultCode === 0) {
      return {todolist: res.data.item}
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
})

type UpdateTodolistType = {
  idTodolist: string, title: string
}

export const updateTodolist = createAsyncThunk<UpdateTodolistType, UpdateTodolistType, {
  rejectValue: { error: string, idTodolist: string }
}>(
  'todolists/updateTodolist', async (param, thunkAPI) => {
    thunkAPI.dispatch(changeStatusUpdateTodolistAC({status: 'loading', idTodolist: param.idTodolist}))
    try {
      const res = await api.updateTodolist(param)
      if (res.resultCode === 0) {
        return param
      } else {
        thunkAPI.dispatch(setAppError(res.messages[0]))
        return thunkAPI.rejectWithValue({error: 'some error', idTodolist: param.idTodolist})
      }
    } catch (e) {
      if(axios.isAxiosError(e)){
        console.log(e.message)
        thunkAPI.dispatch(setAppError(e.message))
      }
      return thunkAPI.rejectWithValue({error: 'some error', idTodolist: param.idTodolist})
    }finally {
      thunkAPI.dispatch(changeStatusUpdateTodolistAC({status: 'succeeded', idTodolist: param.idTodolist}))
    }
})

export const removeTodolist = createAsyncThunk<{idTodolist: string}, {idTodolist: string}, {rejectValue: {error: string}}>(
  'todolists/removeTodolist', async (param, thunkAPI) => {
    thunkAPI.dispatch(setStatusTodolistsAC({status: 'loading'}))
    thunkAPI.dispatch(changeStatusRemoveTodolistAC({idTodolist: param.idTodolist, status: 'loading'}))
    try {
      const res = await api.removeTodolist(param.idTodolist)
      return param
    }catch (e: any) {
      if(axios.isAxiosError(e)){
        console.log(e.message)
        thunkAPI.dispatch(setAppError(e.message))
      }
      return thunkAPI.rejectWithValue({error: e.message})
    }
    finally {
      thunkAPI.dispatch(setStatusTodolistsAC({status: 'succeeded'}))
      thunkAPI.dispatch(changeStatusRemoveTodolistAC({idTodolist: param.idTodolist, status: 'succeeded'}))
    }
  }
)

const todolistsSlice = createSlice({
  name: 'todolists',
  initialState: [] as FullTodolistType,
  reducers: {
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
  extraReducers: (builder) => {
    builder.addCase(getTodolists.fulfilled, (state, action) => {
      return action.payload.todolists.map(item => ({
        ...item,
        statusRemoveTodolist: 'idle',
        statusGetTaskForTodolist: 'idle',
        statusRemoveTask: 'idle',
        statusAddTask: 'idle',
        statusUpdateTodolist: 'idle',
      }))
    });
    builder.addCase(addTodolist.fulfilled, (state, action) => {
      if(action.payload){
      return [{
        ...action.payload.todolist,
        statusRemoveTodolist: 'idle',
        statusGetTaskForTodolist: 'idle',
        statusRemoveTask: 'idle',
        statusAddTask: 'idle',
        statusUpdateTodolist: 'idle',
      }, ...state]
      }
    });
    builder.addCase(updateTodolist.fulfilled, (state, action) => {
      if(action && action.payload){
        return state.map(item => (
          item.id === action.payload.idTodolist ? {...item, title: action.payload.title} : item
        ))
      }
    })
    builder.addCase(removeTodolist.fulfilled, (state, action) => {
        return state.filter(item => item.id !== action.payload.idTodolist)
    })
  }
})

export const todolistsReducer = todolistsSlice.reducer

export const {
  changeStatusUpdateTodolistAC,
  changeStatusRemoveTodolistAC,
  changeStatusRemoveTaskAC
} = todolistsSlice.actions