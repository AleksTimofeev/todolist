import {
  addTodolist, removeTodolist,
} from "./todolistsReducer";
import {api, TaskType} from "../API/api";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {setAppError, setTaskStatus, setTodolistStatus} from "./appReducer";
import {logout} from "./authReducer";

export type TaskReducerInitialType = {
  [key: string]: Array<TaskType>
}

export const getTasksForTodolist = createAsyncThunk(
  'task/getTaskForTodolist', async (idTodolist: string, thunkAPI) => {
    thunkAPI.dispatch(setTodolistStatus({idTodolist, status: 'loading'}))
    try {
      const res = await api.getTasksForTodolist(idTodolist)
      return {tasks: res.items, idTodolist}
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log(e.message)
        thunkAPI.dispatch(setAppError(e.message))
      }
    } finally {
      thunkAPI.dispatch(setTodolistStatus({idTodolist, status: 'succeeded'}))
    }
  })

export const updateTask = createAsyncThunk(
  'task/updateTask', async (task: TaskType, thunkAPI) => {
    thunkAPI.dispatch(setTaskStatus({idTodolist: task.todoListId, idTask: task.id, status: 'loading'}))
    try {
      const res = await api.updateTask(task)
      if (res.resultCode === 0) {
        return {task: res.data.item}
      } else {
        thunkAPI.dispatch(setAppError(res.messages[0]))
        return thunkAPI.rejectWithValue({message: 'some error'})
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log(e.message)
        thunkAPI.dispatch(setAppError(e.message))
      }
      return thunkAPI.rejectWithValue({message: 'network error'})
    } finally {
      thunkAPI.dispatch(setTaskStatus({idTodolist: task.todoListId, idTask: task.id, status: 'succeeded'}))
    }
  }
)

export const addTask = createAsyncThunk(
  'task/addTask', async (arg: { idTodolist: string, titleTask: string }, thunkAPI) => {
    thunkAPI.dispatch(setTodolistStatus({idTodolist: arg.idTodolist, status: 'loading'}))
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
      if (axios.isAxiosError(e)) {
        console.log(e.message)
        thunkAPI.dispatch(setAppError(e.message))
      }
    } finally {
      thunkAPI.dispatch(setTodolistStatus({idTodolist: arg.idTodolist, status: 'succeeded'}))
    }

  }
)

export const removeTask = createAsyncThunk(
  'task/removeTask', async (arg: { idTodolist: string, idTask: string }, thunkAPI) => {
    thunkAPI.dispatch(setTodolistStatus({idTodolist: arg.idTodolist, status: 'loading'}))
    thunkAPI.dispatch(setTaskStatus({...arg, status: 'loading'}))

    try {
      const res = await api.removeTask(arg.idTodolist, arg.idTask)
      if (res.resultCode === 0) {
        return {idTodolist: arg.idTodolist, idTask: arg.idTask}
      } else {
        thunkAPI.dispatch(setAppError(res.messages[0]))
        thunkAPI.rejectWithValue({message: 'some error'})
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log(e.message)
        thunkAPI.dispatch(setAppError(e.message))
      }
      thunkAPI.rejectWithValue({message: 'network error'})
    } finally {
      thunkAPI.dispatch(setTodolistStatus({idTodolist: arg.idTodolist, status: 'succeeded'}))
      thunkAPI.dispatch(setTaskStatus({...arg, status: 'succeeded'}))

    }
  }
)

const taskSlice = createSlice({
  name: 'task',
  initialState: {} as TaskReducerInitialType,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addTodolist.fulfilled, (state, action) => {
      if (action.payload?.todolist.id) {
        state[action.payload.todolist.id] = []
      }
    })
    builder.addCase(removeTodolist.fulfilled, (state, action) => {
      if(action.payload?.idTodolist){
        delete state[action.payload.idTodolist]
      }
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
      state[action.payload.task.todoListId].forEach(item => {
        if(item.id === action.payload.task.id){
          Object.assign(item, action.payload.task)
        }
      })
    })
    builder.addCase(removeTask.fulfilled, (state, action) => {
      if (action.payload) {
        state[action.payload.idTodolist] = [
          ...state[action.payload.idTodolist].filter(item => item.id !== action?.payload?.idTask)
        ]
      }
    })
    builder.addCase(logout.fulfilled, (state) => {
      return {}
      }
    )
  }
})

export const taskReducer = taskSlice.reducer
