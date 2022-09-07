export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  status: 'loading' as RequestStatusType
}

type ActionsType = ReturnType<typeof setStatusAC>

export const appReducer = (state = initialState, action: ActionsType) => {

  switch (action.type) {
    case "SET_STATUS": return {...state,
      status: action.status
    }
  }
  return state
}

export const setStatusAC = (status: RequestStatusType) => ({type: 'SET_STATUS', status})