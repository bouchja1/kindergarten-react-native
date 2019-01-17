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
  const key = API_KEY;
  return {
    ...request,
    url: `${request.url}?apiKey=${key}`,
  }
})

export const loadCoordinates = (vusc, nvusc) => {
  return axios.get("/coordinates", {
    params: {
      vusc,
      nvusc
    },
  })
}

export const loadKindergartenDetail = (id) => {
  return axios.get(`/kindergartens/${id}`)
}

export const loadRegions = () => {
  return axios.get('/regions')
}
