import axios from "axios";

export const http = axios.create({
  baseURL: process.env.WEATHER_API_URL,
  params:{
    appid: process.env.WEATHER_API_KEY,
    units: 'metric'
  }
})
