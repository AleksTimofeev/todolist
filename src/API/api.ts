import axios from "axios";

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
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

export const api = {
  authMe (){
    return instance.get<BaseRequestType<AuthMeRequestType>>('auth/me')
      .then(req => req.data)
  }
}