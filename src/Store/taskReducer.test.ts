import {TaskType, TodolistType} from "../API/api";
import {addTaskAC, removeTaskAC, taskReducer, updateTaskAC} from "./taskReducer";
import {addTodolistsAC, removeTodolistAC} from "./todolistsReducer";

let initialState: { [key: string]: Array<TaskType> } = {}

beforeEach(() => {
 initialState = {
   ['86dcbe6e-611d-424e-b717-e90127370564']: [
     {
       addedDate: "2022-08-14T15:46:40.237",
       deadline: null,
       description: null,
       id: "b78ed2e4-c9e2-4dca-b9fd-d3ad1e6cb52b",
       order: -3,
       priority: 1,
       startDate: null,
       status: 0,
       title: "task 001",
       todoListId: "86dcbe6e-611d-424e-b717-e90127370564",
     },
     {
       addedDate: "2022-08-14T15:46:37.377",
       deadline: null,
       description: null,
       id: "52b9f7d9-5b25-48a8-8f94-b9081667c11e",
       order: -2,
       priority: 1,
       startDate: null,
       status: 0,
       title: "task 003",
       todoListId: "86dcbe6e-611d-424e-b717-e90127370564",
     },
     {
       addedDate: "2022-08-14T13:11:39.297",
       deadline: null,
       description: null,
       id: "517345bd-64ab-41cd-b080-53139cb57081",
       order: -1,
       priority: 1,
       startDate: null,
       status: 0,
       title: "task 004",
       todoListId: "86dcbe6e-611d-424e-b717-e90127370564",
     },
     {
       addedDate: "2022-08-14T13:11:36.183",
       deadline: null,
       description: null,
       id: "82b4bd3d-c2fd-4885-a69f-b8d878a7202b",
       order: 0,
       priority: 1,
       startDate: null,
       status: 0,
       title: "task 005",
       todoListId: "86dcbe6e-611d-424e-b717-e90127370564",
     }
   ]
 }
})

test('add task', () => {
  const newTask = {
    addedDate: "2022-08-14T15:46:40.237",
    deadline: null,
    description: null,
    id: "b78ed2e4",
    order: -3,
    priority: 1,
    startDate: null,
    status: 0,
    title: "task 001",
    todoListId: "86dcbe6e-611d-424e-b717-e90127370564",
  }
  const newState = taskReducer(initialState, addTaskAC(newTask))
  expect(newState['86dcbe6e-611d-424e-b717-e90127370564'].length).toBe(5)
  expect(newState[newTask.todoListId].find(item => item.id === newTask.id)).toEqual(newTask)
})
test('update task', () =>{
  const newTask = {
    addedDate: "2022-08-14T15:46:40.237",
    deadline: null,
    description: null,
    id: "b78ed2e4-c9e2-4dca-b9fd-d3ad1e6cb52b",
    order: -3,
    priority: 1,
    startDate: null,
    status: 0,
    title: "New title...",
    todoListId: "86dcbe6e-611d-424e-b717-e90127370564",
  }
  const newState = taskReducer(initialState, updateTaskAC(newTask))
  const newTitle = newState[newTask.todoListId].find(item => item.id === newTask.id)?.title
  expect(newState[newTask.todoListId].find(item => item.id === newTask.id)).toEqual(newTask)
  expect(newTitle).toBe('New title...')
})
test('remove task', () => {
  const idTodolist = '86dcbe6e-611d-424e-b717-e90127370564'
  const idTask = '52b9f7d9-5b25-48a8-8f94-b9081667c11e'
  const newState = taskReducer(initialState, removeTaskAC(idTodolist, idTask))
  expect(newState[idTodolist].length).toBe(3)
  expect(newState[idTodolist].find(item => item.id === idTask)).toBe(undefined)
})
test('add todolist', () => {
  const newTodolist: TodolistType = {
    id: '001',
    title: 'new todolist',
    addedDate: '01.01.01',
    order: 0
  }
  const newState = taskReducer(initialState, addTodolistsAC(newTodolist))
  expect(newState[newTodolist.id]).toEqual([])
})
test('remove todolist', () => {
  const newState = taskReducer(initialState, removeTodolistAC('86dcbe6e-611d-424e-b717-e90127370564'))
  expect(newState).toEqual({})
})