import {appReducer, RequestStatusType, setStatusTodolistsAC} from "./appReducer";


let initialState = {
  statusTodolists: 'loading' as RequestStatusType,
  statusTasks: 'loading' as RequestStatusType
}


beforeEach(() => {
  initialState = {
    statusTodolists: 'loading',
    statusTasks: 'loading'
  }
})

test('loading todolists successfully',() => {
  const action = setStatusTodolistsAC('succeeded')
  const newState = appReducer(initialState, action)

  expect(newState.statusTodolists).toBe('succeeded')
})