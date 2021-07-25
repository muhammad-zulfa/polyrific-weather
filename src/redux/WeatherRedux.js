const weatherActionType = {
  STORE_DATA_FIVE_DAYS: "STORE_DATA_FIVE_DAYS",
  OPEN_WEATHER_DETAIL: "OPEN_WEATHER_DETAIL",
  CLOSE_WEATHER_DETAIL: "CLOSE_WEATHER_DETAIL",
}

export const storeDataFiveDays = (data) => ({type: weatherActionType.STORE_DATA_FIVE_DAYS, payload: {data}})
export const openWeatherDetail = (date) => ({
  type: weatherActionType.OPEN_WEATHER_DETAIL,
  payload: {date}
})

export const closeWeatherDetail = () => ({type: weatherActionType.CLOSE_WEATHER_DETAIL})

const INITIAL_STATE = {
  timeSelected: null,
  times: [],
  data: {},
  todayShow: false
}

export const WeatherReducer = (state = INITIAL_STATE, action) => {
  switch (action.type){
    case weatherActionType.STORE_DATA_FIVE_DAYS:
      const timeSelected = state.timeSelected
      return {
        ...state,
        data: action.payload.data,
        times: Object.keys(action.payload.data),
        timeSelected: !timeSelected ? Object.keys(action.payload.data)[0] : timeSelected
      }
    case weatherActionType.OPEN_WEATHER_DETAIL:
      return {
        ...state,
        timeSelected: action.payload.date,
        todayShow: true
      }
    case weatherActionType.CLOSE_WEATHER_DETAIL:
      return {
        ...state,
        todayShow: false,
        timeSelected: state.times[0]
      }
    default:
      return state
  }
}
