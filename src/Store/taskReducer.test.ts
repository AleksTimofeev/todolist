import {addTask, getTasksForTodolist, taskReducer, TaskReducerInitialType} from "./taskReducer";
import {TaskType, TodolistType} from "../API/api";
import {addTodolist, removeTodolist} from "./todolistsReducer";


let initialState: TaskReducerInitialType = {}
let tasks: TaskType[] = []
let todolist: TodolistType = {
  id: 'string', title: 'string', addedDate: 'string', order: 0
}

beforeEach(() => {
  tasks = [
    {
      id: '321',
      title: 'title 123',
      description: null,
      todoListId: '123',
      order: 0,
      status: 0,
      priority: 0,
      startDate: null,
      deadline: null,
      addedDate: '12.12.12'
    },
    {
      id: '421',
      title: 'title 124',
      description: null,
      todoListId: '124',
      order: 0,
      status: 0,
      priority: 0,
      startDate: null,
      deadline: null,
      addedDate: '14.14.14'
    },
    {
      id: '521',
      title: 'title 125',
      description: null,
      todoListId: '125',
      order: 0,
      status: 0,
      priority: 0,
      startDate: null,
      deadline: null,
      addedDate: '15.15.15'
    }
  ]
  todolist = {
    id: '123',
    title: 'title 123',
    addedDate: 'string',
    order: 0
  }
  initialState = {
    '001': tasks
  }
})

test('add todolist', () => {
  const action = addTodolist.fulfilled({todolist}, '', '')
  const newState = taskReducer(initialState, action)
  expect(Object.keys(newState).length).toBe(2)
  expect(newState['001']).toEqual(tasks)
  expect(newState['123']).toEqual([])
})
test('remove todolist', () => {
  const action = removeTodolist.fulfilled({idTodolist: '001'}, '', {idTodolist: '001'})
  const newState = taskReducer(initialState, action)
  expect(newState['001']).toBe(undefined)
})

test('get tasks for todolist', () => {
  const action = getTasksForTodolist.fulfilled({idTodolist: '123', tasks}, '', '')
  const newState = taskReducer(initialState, action)
  expect(newState['123'].length).toBe(3)
  expect(newState['123'][1]).toEqual(tasks[1])
  expect(newState['123'][2]).toEqual(tasks[2])
})