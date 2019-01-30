import axiosLib from "axios"

import { API_KEY } from "react-native-dotenv"

const axios = axiosLib.create({
  baseURL: "http://185.8.165.64:3001/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

axios.interceptors.request.use(request => {
  const key = API_KEY
  return {
    ...request,
    url: `${request.url}?apiKey=${key}`,
  }
})

export const loadCoordinates = (vusc, nvusc) => axios.get("/coordinates", {
  params: {
    vusc,
    nvusc,
  },
})

export const loadKindergartenDetail = (id) => axios.get(`/kindergartens/${id}`)

export const loadKindergartenRadius = (latitude, longitude, kindergartenId, radius) => axios.get("/radius", {
  params: {
    latitude,
    longitude,
    kindergartenId,
    radius,
  },
})

export const loadRegions = () => axios.get("/regions")

export const loadKindergartenCounts = (id, radius = 3) => axios.get(`/kindergartens/${id}/counts`, {
    params: {
      radius,
    },
  },
)