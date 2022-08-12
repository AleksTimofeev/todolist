import {api, TodolistType} from "../API/api";
import {Dispatch} from "redux";

type ActionsType = ReturnType<typeof getTodolistsAC> | ReturnType<typeof addTodolistsAC> | ReturnType<typeof removeTodolistAC>

const initialState: Array<TodolistType> = []

export const todolistsReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case 'GET_TODOLISTS': return [...action.todolists]
    case "ADD_TODOLIST": return [action.todolist, ...state]
    case "REMOVE_TODOLIST": return [...state.filter(item => item.id !== action.idTodolist)]

    default: return state
  }
}

export const getTodolistsAC = (todolists: Array<TodolistType>) => ({todolists, type: 'GET_TODOLISTS'} as const)
export const addTodolistsAC = (todolist: TodolistType) => ({todolist, type: 'ADD_TODOLIST'} as const)
export const removeTodolistAC = (idTodolist: string) => ({idTodolist, type: 'REMOVE_TODOLIST'} as const)

export const getTodolists = () => (dispatch: Dispatch) => {
  api.getTodolists()
    .then(data => {
      dispatch(getTodolistsAC(data))
    })
}

export const addTodolist = (title: string) => (dispatch: Dispatch) => {
  api.addTodolist(title)
    .then(data => {
      if(data.resultCode === 0){
        dispatch(addTodolistsAC(data.data.item))
      }
    })
}

export const removeTodolist = (idTodolist: string) => (dispatch: Dispatch) => {
  api.removeTodolist(idTodolist)
    .then(data => {
      if(data.resultCode === 0){
        dispatch(removeTodolistAC(idTodolist))
      }
    })
}