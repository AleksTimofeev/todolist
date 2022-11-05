import {api, TodolistType} from "../API/api";
import {setAppError, setAppStatus, setTodolistStatus} from "./appReducer";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export type FullTodolistType = Array<TodolistType>

export const getTodolists = createAsyncThunk(
  'todolists/getTodolists', async (arg, thunkAPI) => {
  thunkAPI.dispatch(setAppStatus('loading'))
  try {
    const res = await api.getTodolists()
    res.forEach(td => thunkAPI.dispatch(setTodolistStatus({idTodolist: td.id, status: "idle"})))
    return {todolists: res}
  } catch (e) {
    if(axios.isAxiosError(e)){
      thunkAPI.dispatch(setAppError(e.message))
    }
    return {todolists: []}
  } finally {
    thunkAPI.dispatch(setAppStatus('succeeded'))
  }
})

export const addTodolist = createAsyncThunk(
  'todolists/addTodolist', async (title: string, thunkAPI) => {
  thunkAPI.dispatch(setAppStatus('loading'))
  try {
    const res = await api.addTodolist(title)
    if (res.resultCode === 0) {
      thunkAPI.dispatch(setTodolistStatus({idTodolist: res.data.item.id, status: 'idle'}))
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
    thunkAPI.dispatch(setAppStatus('succeeded'))
  }
})

type UpdateTodolistType = {
  idTodolist: string, title: string
}

export const updateTodolist = createAsyncThunk<UpdateTodolistType, UpdateTodolistType, {
  rejectValue: { error: string, idTodolist: string }
}>(
  'todolists/updateTodolist', async (param, thunkAPI) => {
    thunkAPI.dispatch(setTodolistStatus({idTodolist: param.idTodolist, status: 'loading'}))
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
      thunkAPI.dispatch(setTodolistStatus({idTodolist: param.idTodolist, status: 'succeeded'}))
    }
})

export const removeTodolist = createAsyncThunk<{idTodolist: string}, {idTodolist: string}, {rejectValue: {error: string}}>(
  'todolists/removeTodolist', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus('loading'))
    thunkAPI.dispatch(setTodolistStatus({idTodolist: param.idTodolist, status: 'loading'}))
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
      thunkAPI.dispatch(setAppStatus('succeeded'))
      thunkAPI.dispatch(setTodolistStatus({idTodolist: param.idTodolist, status: 'loading'}))
    }
  }
)

const todolistsSlice = createSlice({
  name: 'todolists',
  initialState: [] as FullTodolistType,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTodolists.fulfilled, (state, action) => {
      return action.payload.todolists
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