export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  statusTodolists: 'idle' as RequestStatusType,
  statusTasks: 'idle' as RequestStatusType,
  statusUpdateTodolist: 'idle' as RequestStatusType
}

export type AppActionsType = ReturnType<typeof setStatusTodolistsAC> | ReturnType<typeof setStatusUpdateTodolistAC>

export const appReducer = (state = initialState, action: AppActionsType) => {

  switch (action.type) {
    case "SET_STATUS_TODOLISTS": return {...state,
      statusTodolists: action.status
    }
    case "SET_STATUS_TASKS": return {...state}
  }
  return state
}

export const setStatusTodolistsAC = (status: RequestStatusType) => ({type: 'SET_STATUS_TODOLISTS', status})
export const setStatusUpdateTodolistAC = (status: RequestStatusType, idTodolist: string) => (
  {type: 'SET_STATUS_UPDATE_TODOLIST', status, idTodolist}
)
