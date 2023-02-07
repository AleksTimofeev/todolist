import {appReducer, RequestStatusType, setTaskStatus, setTodolistStatus} from "./appReducer";


let initialState: ReturnType<typeof appReducer> /*= {
  appStatus: 'idle' as RequestStatusType,
  todolistStatus: [],
  taskStatus: [],
  statusErrorMessage: null,
  appError: null
}*/


beforeEach(() => {
  initialState = {
    appStatus: 'idle' as RequestStatusType,
    todolistStatus: [],
    taskStatus: [],
    statusErrorMessage: null,
    appError: null,
    showTaskDescription: null
  }
})

test('set todolist status', () => {

  const newState1 = appReducer(initialState, setTodolistStatus({idTodolist: '123', status: 'loading'}))

  expect(newState1.todolistStatus.length).toBe(1)
  expect(newState1.todolistStatus[0]).toEqual({idTodolist: '123', status: 'loading'})

  const newState2 = appReducer(newState1, setTodolistStatus({idTodolist: '124', status: 'loading'}))

  expect(newState2.todolistStatus.length).toBe(2)
  expect(newState2.todolistStatus[1]).toEqual({idTodolist: '124', status: 'loading'})

  const newState3 = appReducer(newState2, setTodolistStatus({idTodolist: '123', status: 'succeeded'}))

  expect(newState3.todolistStatus[0]).toEqual({idTodolist: '123', status: 'succeeded'})
})

test('set task status', () => {
  const newState1 = appReducer(initialState, setTaskStatus({idTodolist: '123', idTask: '321', status: 'loading'}))

  expect(newState1.taskStatus.length).toBe(1)
  expect(newState1.taskStatus[0]).toEqual({idTodolist: '123', idTask: '321', status: 'loading'})

  const newState2 = appReducer(newState1, setTaskStatus({idTodolist: '124', idTask: '421', status: 'loading'}))

  expect(newState2.taskStatus.length).toBe(2)
  expect(newState2.taskStatus[1]).toEqual({idTodolist: '124', idTask: '421', status: 'loading'})

  const newState3 = appReducer(newState2, setTaskStatus({idTodolist: '123', idTask: '321', status: 'succeeded'}))

  expect(newState3.taskStatus[0]).toEqual({idTodolist: '123', idTask: '321', status: 'succeeded'})
})