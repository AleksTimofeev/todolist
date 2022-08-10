import {api, TodolistType} from "../API/api";
import {Dispatch} from "redux";

type ActionsType = ReturnType<typeof addTodolists>

const initialState: Array<TodolistType> = []

export const todolistsReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case 'ADD_TODOLISTS': return [...action.todolists]

    default: return state
  }
}

const addTodolists = (todolists: Array<TodolistType>) => ({todolists, type: 'ADD_TODOLISTS'} as const)

export const getTodolists = () => (dispatch: Dispatch) => {
  api.getTodolists()
    .then(data => {
      dispatch(addTodolists(data))
    })
}