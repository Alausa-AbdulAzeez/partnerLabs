import axios from 'axios'

const BASE_URL = 'https://app.biopathonline.com/api/'
export const BASE_FRONTEND_URL = 'http://localhost:5173/'

// const TOKEN = localStorage.getItem('token')

export const publicRequest = axios.create({
  baseURL: BASE_URL,
})

export const publicRequestWithHeaders = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})

// export const privateRequest = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${TOKEN}`,
//   },
// })
