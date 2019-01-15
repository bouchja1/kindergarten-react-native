import axiosLib from "axios"

import { API_KEY } from 'react-native-dotenv'

const axios = axiosLib.create({
  baseURL: "http://185.8.165.64:3001/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

axios.interceptors.request.use(request => {
  return {
    ...request,
    url: `${request.url}?apiKey=${API_KEY}`,
  }
})

export const loadCoordinates = () => {
  return axios.get("/coordinates")
}

export const loadRegions = () => {
  return axios.get('/regions')
}
