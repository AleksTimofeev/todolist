import {appReducer, RequestStatusType, setAppError, setStatusTodolistsAC} from "./appReducer";


let initialState = {
  statusTodolists: 'idle' as RequestStatusType,
  statusTasks: 'idle' as RequestStatusType,
  statusUpdateTodolist: 'idle' as RequestStatusType,
  statusErrorMessage: null,
  appError: null
}


beforeEach(() => {
  initialState = {
    statusTodolists: 'loading',
    statusTasks: 'loading',
    statusUpdateTodolist: 'loading',
    statusErrorMessage: null,
    appError: null
  }
})

test('loading todolists successfully',() => {
  const action = setStatusTodolistsAC({status: 'succeeded'})
  const newState = appReducer(initialState, action)

  expect(newState.statusTodolists).toBe('succeeded')
})
test('set app error', () => {
  const action = setAppError('Some Error')
  const newState = appReducer(initialState, action)

  expect(newState.appError).toBe('Some Error')
})