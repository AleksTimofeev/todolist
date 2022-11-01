import {
  addTodolist,
  changeStatusRemoveTaskAC, changeStatusUpdateTodolistAC, removeTodolist,
} from "./todolistsReducer";
import {api, TaskType} from "../API/api";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {setAppError} from "./appReducer";

type InitialType = {
  [key: string]: Array<TaskType>
}

export const getTasksForTodolist = createAsyncThunk(
  'task/getTaskForTodolist', async (idTodolist: string, thunkAPI) => {
    thunkAPI.dispatch(changeStatusUpdateTodolistAC({status: 'loading', idTodolist}))
    try {
      const res = await api.getTasksForTodolist(idTodolist)
      return {tasks: res.items, idTodolist}
    } catch (e) {
      if(axios.isAxiosError(e)){
        console.log(e.message)
        thunkAPI.dispatch(setAppError(e.message))
      }
    } finally {
      thunkAPI.dispatch(changeStatusUpdateTodolistAC({status: 'succeeded', idTodolist}))
    }
  })

export const updateTask = createAsyncThunk(
  'task/updateTask', async (task: TaskType, thunkAPI) => {
    try {
      const res = await api.updateTask(task)
      if (res.resultCode === 0) {
        return {task: res.data.item}
      } else {
        thunkAPI.dispatch(setAppError(res.messages[0]))
        return thunkAPI.rejectWithValue({message: 'some error'})
      }
    } catch (e) {
      if(axios.isAxiosError(e)){
        console.log(e.message)
        thunkAPI.dispatch(setAppError(e.message))
      }
      return thunkAPI.rejectWithValue({message: 'network error'})
    }
  }
)

export const addTask = createAsyncThunk(
  'task/addTask', async (arg: { idTodolist: string, titleTask: string }, thunkAPI) => {
    thunkAPI.dispatch(changeStatusUpdateTodolistAC({status: 'loading', idTodolist: arg.idTodolist}))
    try {
      const res = await api.addTask(arg.idTodolist, arg.titleTask)
      if (res.resultCode === 0) {
        return {task: res.data.item}
      } else {
        thunkAPI.dispatch(setAppError(res.messages[0]))
        thunkAPI.rejectWithValue({message: 'some error'})
      }
    } catch (e) {
      thunkAPI.rejectWithValue({message: 'network error'})
      if(axios.isAxiosError(e)){
        console.log(e.message)
        thunkAPI.dispatch(setAppError(e.message))
      }
    } finally {
      thunkAPI.dispatch(changeStatusUpdateTodolistAC({status: 'succeeded', idTodolist: arg.idTodolist}))
    }

  }
)

export const removeTask = createAsyncThunk(
  'task/removeTask', async (arg: { idTodolist: string, idTask: string }, thunkAPI) => {
    thunkAPI.dispatch(changeStatusUpdateTodolistAC({status: 'loading', idTodolist: arg.idTodolist}))
    thunkAPI.dispatch(changeStatusRemoveTaskAC({idTodolist: arg.idTodolist, status: 'loading'}))
    try {
      const res = await api.removeTask(arg.idTodolist, arg.idTask)
      if (res.resultCode === 0) {
        return {idTodolist: arg.idTodolist, idTask: arg.idTask}
      } else {
        thunkAPI.dispatch(setAppError(res.messages[0]))
        thunkAPI.rejectWithValue({message: 'some error'})
      }
    } catch (e) {
      if(axios.isAxiosError(e)){
        console.log(e.message)
        thunkAPI.dispatch(setAppError(e.message))
      }
      thunkAPI.rejectWithValue({message: 'network error'})
    } finally {
      thunkAPI.dispatch(changeStatusUpdateTodolistAC({status: 'succeeded', idTodolist: arg.idTodolist}))
      thunkAPI.dispatch(changeStatusRemoveTaskAC({idTodolist: arg.idTodolist, status: 'succeeded'}))
    }
  }
)

const taskSlice = createSlice({
  name: 'task',
  initialState: {} as InitialType,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addTodolist.fulfilled, (state, action) => {
      if (action.payload?.todolist.id) {
        state[action.payload.todolist.id] = []
      }
    })
    builder.addCase(removeTodolist.fulfilled, (state, action) => {
      delete state[action.payload.idTodolist]
    })
    builder.addCase(getTasksForTodolist.fulfilled, (state, action) => {
      if (action.payload?.idTodolist) {
        state[action.payload.idTodolist] = action.payload.tasks
      }
    })
    builder.addCase(addTask.fulfilled, (state, action) => {
      if (action?.payload?.task) {
        state[action.payload.task.todoListId] = [
          ...state[action.payload.task.todoListId], {...action.payload.task}
        ]
      }
    })
    builder.addCase(updateTask.fulfilled, (state, action) => {
      state[action.payload.task.todoListId] = [
        ...state[action.payload.task.todoListId].map(
          item => item.id === action.payload.task.id ? {...action.payload.task} : item
        )]
    })
    builder.addCase(removeTask.fulfilled, (state, action) => {
      if (action.payload) {
        state[action.payload.idTodolist] = [
          ...state[action.payload.idTodolist].filter(item => item.id !== action?.payload?.idTask)
        ]
      }
    })
  }
})

export const taskReducer = taskSlice.reducer
