import {getTodolistsAC} from "./todolistsReducer";
import {api, TaskType} from "../API/api";
import {Dispatch} from "redux";


type ActionsType = ReturnType<typeof getTodolistsAC> | ReturnType<typeof getTasksForTodolistAC>

type InitialType = {
  [key: string]: Array<TaskType>
}

const initialState: InitialType = {
}

export const taskReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case 'GET_TODOLISTS':
      const todolists:{[key: string]: []} = {}
      action.todolists.map(item => todolists[item.id] = [])
      return {...state, ...todolists}
    case 'GET_TASKS_FOR_TODOLIST': return {...state,
      [action.idTodolist]: [...action.tasks]
    }

    default: return state
  }
}

const getTasksForTodolistAC = (tasks: Array<TaskType>, idTodolist: string) => ({tasks, idTodolist, type: 'GET_TASKS_FOR_TODOLIST'} as const)
export const getTasksForTodolist = (idTodolist: string) => (dispatch: Dispatch) => {
  api.getTasksForTodolist(idTodolist)
    .then(data => {
      dispatch(getTasksForTodolistAC(data.items, idTodolist))
    })
}