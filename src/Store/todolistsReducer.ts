import {api, TodolistType} from "../API/api";
import {Dispatch} from "redux";

type ActionsType = ReturnType<typeof getTodolistsAC> | ReturnType<typeof addTodolistsAC>

const initialState: Array<TodolistType> = []

export const todolistsReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case 'GET_TODOLISTS': return [...action.todolists]
    case "ADD_TODOLIST": return [action.todolist, ...state]

    default: return state
  }
}

export const getTodolistsAC = (todolists: Array<TodolistType>) => ({todolists, type: 'GET_TODOLISTS'} as const)
export const addTodolistsAC = (todolist: TodolistType) => ({todolist, type: 'ADD_TODOLIST'} as const)

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