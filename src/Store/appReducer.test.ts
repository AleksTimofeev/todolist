import {appReducer, RequestStatusType, setStatusAC} from "./appReducer";


let initialState = {
  status: 'loading' as RequestStatusType
}


beforeEach(() => {
  initialState = {
    status: 'loading'
  }
})

test('loading todolists successfully',() => {
  const action = setStatusAC('succeeded')
  const newState = appReducer(initialState, action)

  expect(newState.status).toBe('succeeded')
})