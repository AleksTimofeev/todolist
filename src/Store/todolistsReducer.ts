import {api, TodolistType} from "../API/api";
import {setAppError, setAppStatus, setTodolistStatus} from "./appReducer";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {logout} from "./authReducer";

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

export const updateTodolist = createAsyncThunk(
  'todolists/updateTodolist', async (param: UpdateTodolistType, {dispatch, rejectWithValue}) => {
    dispatch(setTodolistStatus({idTodolist: param.idTodolist, status: 'loading'}))
    try {
      const res = await api.updateTodolist(param)
      if (res.resultCode === 0) {
        return param
      } else {
        dispatch(setAppError('some error'))
      }
    } catch (e) {
      if(axios.isAxiosError(e)){
        dispatch(setAppError(e.message))
      }
      dispatch(setAppError('network error'))
    }finally {
      dispatch(setTodolistStatus({idTodolist: param.idTodolist, status: 'succeeded'}))
    }
})

export const removeTodolist = createAsyncThunk(
  'todolists/removeTodolist', async (param: {idTodolist: string}, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus('loading'))
    dispatch(setTodolistStatus({idTodolist: param.idTodolist, status: 'loading'}))
    try {
      const res = await api.removeTodolist(param.idTodolist)
      return param
    }catch (e) {
      if(axios.isAxiosError(e)){
        dispatch(setAppError(e.message))
      }else{
        dispatch(setAppError('network error.'))
      }
    }
    finally {
      dispatch(setAppStatus('succeeded'))
      dispatch(setTodolistStatus({idTodolist: param.idTodolist, status: 'succeeded'}))
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
          item.id === action.payload?.idTodolist ? {...item, title: action.payload.title} : item
        ))
      }
    })
    builder.addCase(removeTodolist.fulfilled, (state, action) => {
        return state.filter(item => item.id !== action.payload?.idTodolist)
    })
    builder.addCase(logout.fulfilled, (state) => {
      return []
    })
  }
})

export const todolistsReducer = todolistsSlice.reducer