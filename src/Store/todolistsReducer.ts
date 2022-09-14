import {api, TodolistType} from "../API/api";
import {Dispatch} from "redux";
import {RequestStatusType, setStatusTodolistsAC} from "./appReducer";

export type TodolistsActionsType = ReturnType<typeof getTodolistsAC> |
  ReturnType<typeof addTodolistsAC> |
  ReturnType<typeof removeTodolistAC> |
  ReturnType<typeof updateTodolistAC> |
  ReturnType<typeof changeStatusGetTaskForTodolist> |
  ReturnType<typeof changeStatusRemoveTodolistAC> |
  ReturnType<typeof changeStatusAddTaskAC> |
  ReturnType<typeof changeStatusRemoveTaskAC>

export type FullTodolistType = Array<TodolistType & {
  statusRemoveTodolist: RequestStatusType
  statusGetTaskForTodolist: RequestStatusType
  statusRemoveTask: RequestStatusType
  statusAddTask: RequestStatusType
}>

const initialState: FullTodolistType = []

export const todolistsReducer = (state = initialState, action: TodolistsActionsType) => {
  switch (action.type) {
    case 'GET_TODOLISTS': return [...action.todolists]
    case "ADD_TODOLIST": return [action.todolist, ...state]
    case "UPDATE_TODOLIST": return [...state.map(item => item.id === action.idTodolist ? {...item, title: action.title} : item)]
    case "REMOVE_TODOLIST": return [...state.filter(item => item.id !== action.idTodolist)]
    case "CHANGE_STATUS_GET_TASK_FOR_TODOLIST": return [
      ...state.map(item => item.id === action.idTodolist ? {...item, statusGetTaskForTodolist: action.status} : item)
    ]
    case "CHANGE_STATUS_REMOVE_TODOLIST": return [
      ...state.map(item => item.id === action.idTodolist ? {...item, statusRemoveTodolist: action.status} : item)
    ]
    case "CHANGE_STATUS_REMOVE_TASK": return [
      ...state.map(item => item.id === action.idTodolist ? {...item, statusRemoveTask: action.status} : item)
    ]
    case "CHANGE_STATUS_ADD_TASK": return [
      ...state.map(item => item.id === action.idTodolist ? {...item, statusAddTask: action.status} : item)
    ]

    default: return state
  }
}

export const changeStatusRemoveTodolistAC = (idTodolist: string, status: RequestStatusType) => (
  {type: 'CHANGE_STATUS_REMOVE_TODOLIST', idTodolist, status} as const)
export const changeStatusGetTaskForTodolist = (idTodolist: string, status: RequestStatusType) => (
  {type: 'CHANGE_STATUS_GET_TASK_FOR_TODOLIST', idTodolist, status} as const)
export const changeStatusRemoveTaskAC = (idTodolist: string, status: RequestStatusType) => (
  {type: 'CHANGE_STATUS_REMOVE_TASK', idTodolist, status} as const)
export const changeStatusAddTaskAC = (idTodolist: string, status: RequestStatusType) => (
  {type: 'CHANGE_STATUS_ADD_TASK', idTodolist, status} as const)
export const getTodolistsAC = (todolists: Array<TodolistType>) => ({todolists, type: 'GET_TODOLISTS'} as const)
export const addTodolistsAC = (todolist: TodolistType) => ({todolist, type: 'ADD_TODOLIST'} as const)
export const updateTodolistAC = (idTodolist: string, title: string) => ({idTodolist, title, type: 'UPDATE_TODOLIST'} as const)
export const removeTodolistAC = (idTodolist: string) => ({idTodolist, type: 'REMOVE_TODOLIST'} as const)


export const getTodolists = () => (dispatch: Dispatch) => {
  dispatch(setStatusTodolistsAC('loading'))
  api.getTodolists()
    .then(data => {
      dispatch(getTodolistsAC(data))
      dispatch(setStatusTodolistsAC('succeeded'))
    })
    .catch(error => {
      // dispatch()
    })
}

export const addTodolist = (title: string) => (dispatch: Dispatch) => {
  dispatch(setStatusTodolistsAC('loading'))
  api.addTodolist(title)
    .then(data => {
      if(data.resultCode === 0){
        dispatch(addTodolistsAC(data.data.item))
        dispatch(setStatusTodolistsAC('succeeded'))
      }
    })
}

export const updateTodolist = (idTodolist: string, title: string) => (dispatch: Dispatch) => {
  dispatch(setStatusTodolistsAC('loading'))
  api.updateTodolist(idTodolist, title)
    .then(data => {
      if(data.resultCode === 0){
        dispatch(updateTodolistAC(idTodolist, title))
        dispatch(setStatusTodolistsAC('succeeded'))

      }
    })
}

export const removeTodolist = (idTodolist: string) => (dispatch: Dispatch) => {
  dispatch(setStatusTodolistsAC('loading'))
  dispatch(changeStatusRemoveTodolistAC(idTodolist, 'loading'))
  api.removeTodolist(idTodolist)
    .then(data => {
      if(data.resultCode === 0){
        dispatch(removeTodolistAC(idTodolist))
        dispatch(setStatusTodolistsAC('succeeded'))
        dispatch(changeStatusRemoveTodolistAC(idTodolist, 'succeeded'))
      }
    })
}