import {
  addTodolistsAC,
  changeStatusRemoveTaskAC, changeStatusUpdateTodolistAC,
  removeTodolistAC
} from "./todolistsReducer";
import {api, TaskType} from "../API/api";
import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {AppThunkType} from "./store";

type InitialType = {
  [key: string]: Array<TaskType>
}

const initialState: InitialType = {}

const taskSlice = createSlice({
  name: 'task',
  initialState: initialState,
  reducers: {
    getTasksForTodolistAC: (state, action: PayloadAction<{ tasks: Array<TaskType>, idTodolist: string }>) => {
      state[action.payload.idTodolist] = action.payload.tasks
    },
    updateTaskAC: (state, action: PayloadAction<{ task: TaskType }>) => {
      state[action.payload.task.todoListId] = [
        ...state[action.payload.task.todoListId].map(
          item => item.id === action.payload.task.id ? {...action.payload.task} : item
        )]
    },
    addTaskAC: (state, action: PayloadAction<{ task: TaskType }>) => {
      state[action.payload.task.todoListId] = [
        ...state[action.payload.task.todoListId], {...action.payload.task}
      ]
    },
    removeTaskAC: (state, action: PayloadAction<{ idTodolist: string, idTask: string }>) => {
      state[action.payload.idTodolist] = [
        ...state[action.payload.idTodolist].filter(item => item.id !== action.payload.idTask)
      ]
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addTodolistsAC, (state, action) => {
      state[action.payload.todolist.id] = []
    })
    builder.addCase(removeTodolistAC, (state, action) => {
      delete state[action.payload.idTodolist]
    })
  }
})

export const taskReducer = taskSlice.reducer

export const {
  getTasksForTodolistAC,
  updateTaskAC,
  addTaskAC,
  removeTaskAC
} = taskSlice.actions

export const getTasksForTodolist = (idTodolist: string) => async (dispatch: Dispatch) => {
  dispatch(changeStatusUpdateTodolistAC({status: 'loading', idTodolist}))
  try {
    const res = await api.getTasksForTodolist(idTodolist)
    dispatch(getTasksForTodolistAC({tasks: res.items, idTodolist}))
  } catch (e) {
    alert(e)
  } finally {
    dispatch(changeStatusUpdateTodolistAC({status: 'succeeded', idTodolist}))
  }
}
export const updateTask = (task: TaskType) => async (dispatch: Dispatch) => {
  try {
    const res = await api.updateTask(task)
    if (res.resultCode === 0) {
      dispatch(updateTaskAC({task: res.data.item}))
    } else {
      alert(res.messages[0])
    }
  } catch (e) {
    alert(e)
  }
}
export const addTask = (idTodolist: string, titleTask: string): AppThunkType => async (dispatch) => {
  dispatch(changeStatusUpdateTodolistAC({status: 'loading', idTodolist}))
  try {
    const res = await api.addTask(idTodolist, titleTask)
    res.resultCode === 0 ?
      dispatch(addTaskAC({task: res.data.item})) :
      alert(res.messages[0])
  } catch (e) {
    alert(e)
  } finally {
    dispatch(changeStatusUpdateTodolistAC({status: 'succeeded', idTodolist}))
  }
}
export const removeTask = (idTodolist: string, idTask: string) => async (dispatch: Dispatch) => {
  dispatch(changeStatusUpdateTodolistAC({status: 'loading', idTodolist}))
  dispatch(changeStatusRemoveTaskAC({idTodolist, status: 'loading'}))
  try {
    const res = await api.removeTask(idTodolist, idTask)
    if (res.resultCode === 0) {
      dispatch(removeTaskAC({idTodolist, idTask}))
    } else {
      alert(res.messages[0])
    }
  } catch (e) {
    alert(e)
  } finally {
    dispatch(changeStatusUpdateTodolistAC({status: 'succeeded', idTodolist}))
    dispatch(changeStatusRemoveTaskAC({idTodolist, status: 'succeeded'}))
  }
}