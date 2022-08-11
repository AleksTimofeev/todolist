import {api, TodolistType} from "../API/api";
import {Dispatch} from "redux";

type ActionsType = ReturnType<typeof getTodolistsAC>

const initialState: Array<TodolistType> = []

export const todolistsReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case 'GET_TODOLISTS': return [...action.todolists]

    default: return state
  }
}

export const getTodolistsAC = (todolists: Array<TodolistType>) => ({todolists, type: 'GET_TODOLISTS'} as const)

export const getTodolists = () => (dispatch: Dispatch) => {
  api.getTodolists()
    .then(data => {
      dispatch(getTodolistsAC(data))
    })
}