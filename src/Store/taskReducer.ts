import {addTodolistsAC, getTodolistsAC, removeTodolistAC} from "./todolistsReducer";
import {api, TaskType} from "../API/api";
import {Dispatch} from "redux";
import {log} from "util";


type ActionsType = ReturnType<typeof getTodolistsAC> |
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

export const taskReducer = (state = initialState, action: ActionsType): InitialType => {
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
    case "ADD_TASK": return {...state,
      [action.task.todoListId]: [...state[action.task.todoListId], {...action.task}]
    }
    case 'REMOVE_TASK': return {...state,
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

export const getTasksForTodolist = (idTodolist: string) => (dispatch: Dispatch) => {
  api.getTasksForTodolist(idTodolist)
    .then(data => {
      dispatch(getTasksForTodolistAC(data.items, idTodolist))
    })
}
export const updateTask = (task: TaskType) => (dispatch: Dispatch) => {
  api.updateTask(task)
    .then(data => {
      if (data.resultCode === 0) {
        dispatch(updateTaskAC(data.data.item))
      }
    })
}
export const addTask = (idTodolist: string, titleTask: string) => (dispatch:Dispatch) => {
  api.addTask(idTodolist, titleTask)
    .then(data => {
      if(data.resultCode === 0){
        dispatch(addTaskAC(data.data.item))
      }
    })
}
export const removeTask = (idTodolist: string, idTask: string) => (dispatch: Dispatch) => {
  api.removeTask(idTodolist, idTask)
    .then(data => {
      if(data.resultCode === 0){
        dispatch(removeTaskAC(idTodolist, idTask))
      }
    })
    .catch(error => console.log(error))
}