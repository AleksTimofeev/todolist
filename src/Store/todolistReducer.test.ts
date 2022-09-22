
import {
  addTodolistsAC,
  FullTodolistType,
  removeTodolistAC,
  todolistsReducer,
  updateTodolistAC
} from "./todolistsReducer";


let initialState: FullTodolistType = []

beforeEach(() => {
  initialState = [
    {id: '001', title: 'title 001', addedDate: '01.01.01',
      order: 1, statusGetTaskForTodolist: "idle", statusRemoveTodolist: "idle", statusRemoveTask: 'idle',
      statusAddTask: "idle", statusUpdateTodolist: 'idle'
    },
    {id: '002', title: 'title 002', addedDate: '01.01.01',
      order: 1, statusGetTaskForTodolist: "idle", statusRemoveTodolist: "idle", statusRemoveTask: 'idle',
      statusAddTask: "idle", statusUpdateTodolist: 'idle'
    },
    {id: '003', title: 'title 003', addedDate: '01.01.01',
      order: 1, statusGetTaskForTodolist: "idle", statusRemoveTodolist: "idle", statusRemoveTask: 'idle',
      statusAddTask: "idle", statusUpdateTodolist: 'idle'
    },
    {id: '004', title: 'title 004', addedDate: '01.01.01',
      order: 1, statusGetTaskForTodolist: "idle", statusRemoveTodolist: "idle", statusRemoveTask: 'idle',
      statusAddTask: "idle", statusUpdateTodolist: 'idle'
    },
  ]
})

// test('add todoolist', () => {
//   const newTodolist = {id: '005', title: 'title 005', addedDate: '01.01.01', order: 1}
//   const newState = todolistsReducer(initialState, addTodolistsAC(newTodolist))
//   expect(newState.length).toBe(5)
//   expect(newState.find(item => item.id === newTodolist.id)).toEqual(newTodolist)
// })
// test('update todolist', () => {
//   const newState = todolistsReducer(initialState, updateTodolistAC('001', 'new title'))
//   expect(newState.find(item => item.id === '001')?.title).toBe('new title')
// })
// test('remove todolist', () => {
//   const newState = todolistsReducer(initialState, removeTodolistAC('003'))
//   expect(newState.length).toBe(3)
//   expect(newState.find(item => item.id === '003')).toBe(undefined)
// })