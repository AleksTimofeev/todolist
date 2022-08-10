import axios from "axios";
import header from "../Components/Header/Header";

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    "API-KEY": "8ed048a9-5b01-4cf3-8598-4c1e9e24f244"
  }
})

type BaseRequestType<D={}> = {
  data: D,
  messages: [],
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

export const api = {
  authMe (){
    return axios.get<BaseRequestType<AuthMeRequestType>>('https://social-network.samuraijs.com/api/1.0/auth/me', {
      withCredentials: true,
      headers: {"API-KEY": "8ed048a9-5b01-4cf3-8598-4c1e9e24f244"}
    })
      .then(req => req.data)
  },
  getTodolists (){
    return instance.get<Array<TodolistType>>('todo-lists')
      .then(req => req.data)
  }
}