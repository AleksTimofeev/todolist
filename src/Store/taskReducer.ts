import {
  addTodolistsAC,
  changeStatusRemoveTaskAC, changeStatusUpdateTodolistAC,
  getTodolistsAC,
  removeTodolistAC
} from "./todolistsReducer";
import {api, TaskType} from "../API/api";
import {AppThunkType} from "./store";

export type TaskActionsType = ReturnType<typeof getTodolistsAC> |
  ReturnType<typeof getTasksForTodolistAC> |
  ReturnType<typeof addTodolistsAC> |
  ReturnType<typeof removeTodolistAC> |
  ReturnType<typeof updateTaskAC> |
  ReturnType<typeof addTaskAC> |
  ReturnType<typeof removeTaskAC>


type InitialType = {
  [key: string]: Array<TaskType>
}

const initialState: InitialType = {}

export const taskReducer = (state = initialState, action: TaskActionsType): InitialType => {
  switch (action.type) {
    case 'GET_TODOLISTS':
      const todolists: { [key: string]: [] } = {}
      action.todolists.map(item => todolists[item.id] = [])
      return {...state, ...todolists}
    case "ADD_TODOLIST":
      return {
        ...state,
        [action.todolist.id]: []
      }
    case 'GET_TASKS_FOR_TODOLIST':
      return {
        ...state,
        [action.idTodolist]: [...action.tasks]
      }
    case "REMOVE_TODOLIST":
      delete state[action.idTodolist]
      return {...state}
    case "UPDATE_TASK":
      return {
        ...state,
        [action.task.todoListId]: [...state[action.task.todoListId].map(item => item.id === action.task.id ? {...action.task} : item)]
      }
    case "ADD_TASK":
      return {
        ...state,
        [action.task.todoListId]: [...state[action.task.todoListId], {...action.task}]
      }
    case 'REMOVE_TASK':
      return {
        ...state,
        [action.idTodolist]: [...state[action.idTodolist].filter(item => item.id !== action.idTask)]
      }

    default:
      return state
  }
}

const getTasksForTodolistAC = (tasks: Array<TaskType>, idTodolist: string) => ({
  tasks,
  idTodolist,
  type: 'GET_TASKS_FOR_TODOLIST'
} as const)
export const updateTaskAC = (task: TaskType) => ({task, type: 'UPDATE_TASK'} as const)
export const addTaskAC = (task: TaskType) => ({task, type: 'ADD_TASK'} as const)
export const removeTaskAC = (idTodolist: string, idTask: string) => ({idTodolist, idTask, type: 'REMOVE_TASK'} as const)

export const getTasksForTodolist = (idTodolist: string): AppThunkType => async dispatch => {
  dispatch(changeStatusUpdateTodolistAC('loading', idTodolist))
  try {
    const res = await api.getTasksForTodolist(idTodolist)
    dispatch(getTasksForTodolistAC(res.items, idTodolist))
  } catch (e) {
    alert(e)
  } finally {
    dispatch(changeStatusUpdateTodolistAC('succeeded', idTodolist))
  }
}
export const updateTask = (task: TaskType): AppThunkType => async dispatch => {
  try {
    const res = await api.updateTask(task)
    if (res.resultCode === 0) {
      dispatch(updateTaskAC(res.data.item))
    } else {
      alert(res.messages[0])
    }
  } catch (e) {
    alert(e)
  }
}
export const addTask = (idTodolist: string, titleTask: string): AppThunkType => async dispatch => {
  dispatch(changeStatusUpdateTodolistAC('loading', idTodolist))
  try {
    const res = await api.addTask(idTodolist, titleTask)
    res.resultCode === 0 ?
      dispatch(addTaskAC(res.data.item)) :
      alert(res.messages[0])
  } catch (e) {
    alert(e)
  } finally {
    dispatch(changeStatusUpdateTodolistAC('succeeded', idTodolist))
  }
}
export const removeTask = (idTodolist: string, idTask: string): AppThunkType => async dispatch => {
  dispatch(changeStatusUpdateTodolistAC('loading', idTodolist))
  dispatch(changeStatusRemoveTaskAC(idTodolist, 'loading'))
  try {
    const res = await api.removeTask(idTodolist, idTask)
    if (res.resultCode === 0) {
      dispatch(removeTaskAC(idTodolist, idTask))
    }else{
      alert(res.messages[0])
    }
  }catch (e){
    alert(e)
  }finally {
    dispatch(changeStatusUpdateTodolistAC('succeeded', idTodolist))
    dispatch(changeStatusRemoveTaskAC(idTodolist, 'succeeded'))
  }
}