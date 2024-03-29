import axios from "axios";
import {RequestStatusType} from "../Store/appReducer";

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    "API-KEY": "8ed048a9-5b01-4cf3-8598-4c1e9e24f244"
  }
})

type BaseRequestType<D = {}> = {
  data: D,
  messages: Array<string>,
  fieldsErrors: [],
  resultCode: number
}
export type AuthMeRequestType = {
  id: number | null
  login: string | null
  email: string | null
}
export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}
export type TaskType = {
  id: string
  title: string
  description: string | null
  todoListId: string
  order: number
  status: number
  priority: number
  startDate: string | null
  deadline: string | null
  addedDate: string

}
export type TasksForTodolistType = {
  items: Array<TaskType>
  totalCount: number
  error: null
}

export const api = {
  authMe() {
    return axios.get<BaseRequestType<AuthMeRequestType>>('https://social-network.samuraijs.com/api/1.0/auth/me', {
      withCredentials: true,
      headers: {"API-KEY": "8ed048a9-5b01-4cf3-8598-4c1e9e24f244"}
    })
      .then(res => res.data)
  },
  login(email: string, password: string, rememberMe: boolean) {
    return axios.post<BaseRequestType<{ userId: number }>>('https://social-network.samuraijs.com/api/1.0/auth/login',
      {email, password, rememberMe},
      {
      withCredentials: true,
      headers: {"API-KEY": "8ed048a9-5b01-4cf3-8598-4c1e9e24f244"}
    })
      .then(res => res.data)
  },
  logout(){
    return axios.delete<BaseRequestType>('https://social-network.samuraijs.com/api/1.0/auth/login', {
      withCredentials: true,
      headers: {"API-KEY": "8ed048a9-5b01-4cf3-8598-4c1e9e24f244"}
    })
      .then(res => res.data)
  },
  getTodolists() {
    return instance.get<Array<TodolistType>>('todo-lists')
      .then(res => res.data)
  },
  addTodolist(title: string) {
    return instance.post<BaseRequestType<{ item: TodolistType }>>('todo-lists', {title: title})
      .then(res => res.data)
  },
  updateTodolist(data: {idTodolist: string, title: string}) {
    return instance.put<BaseRequestType>(`todo-lists/${data.idTodolist}`, {title: data.title})
      .then(res => res.data)
  },
  removeTodolist(idTodolist: string) {
    return instance.delete<BaseRequestType>(`todo-lists/${idTodolist}`)
      .then(res => res.data)
  },
  getTasksForTodolist(idTodolist: string) {
    return instance.get<TasksForTodolistType>(`todo-lists/${idTodolist}/tasks`)
      .then(res => res.data)
  },
  addTask(idTodolist: string, titleTask: string) {
    return instance.post<BaseRequestType<{item: TaskType}>>(`todo-lists/${idTodolist}/tasks`, {title: titleTask})
      .then(res => res.data)
  },
  updateTask (task: TaskType){
    return instance.put<BaseRequestType<{item: TaskType}>>(`todo-lists/${task.todoListId}/tasks/${task.id}`, {...task})
      .then(res => res.data)
  },
  removeTask (idTodolist: string, idTask: string){
    return instance.delete<BaseRequestType>(`todo-lists/${idTodolist}/tasks/${idTask}`)
      .then(res => res.data)
  },
}