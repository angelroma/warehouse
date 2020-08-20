import axios from 'axios'
let token = localStorage.getItem("token")

export const api = axios.create(
  {
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
)

