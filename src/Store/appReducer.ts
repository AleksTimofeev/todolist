export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  statusTodolists: 'loading' as RequestStatusType,
  statusTasks: 'loading' as RequestStatusType,
}

type ActionsType = ReturnType<typeof setStatusTodolistsAC>

export const appReducer = (state = initialState, action: ActionsType) => {

  switch (action.type) {
    case "SET_STATUS_TODOLISTS": return {...state,
      statusTodolists: action.status
    }

    case "SET_STATUS_TASKS": return {...state}
  }
  return state
}

export const setStatusTodolistsAC = (status: RequestStatusType) => ({type: 'SET_STATUS_TODOLISTS', status})
