import axios from "axios";

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WEATHER_API_URL,
  params:{
    appid: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
    units: 'metric'
  }
})
