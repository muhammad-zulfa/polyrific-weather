const ActionTypes = {
  SELECT_CITY: "SELECT_CITY",
  OPEN_WEATHER_DETAIL: "OPEN_WEATHER_DETAIL",
  ADD_NEW_CITY: "ADD_NEW_CITY",
  CLOSE_WEATHER_DETAIL: "CLOSE_WEATHER_DETAIL",
  REFRESH_WEATHER_FORECAST: "REFRESH_WEATHER_FORECAST"
}

export const openWeatherDetail = (lat: number, lon: number, name: string) => ({
  type: ActionTypes.OPEN_WEATHER_DETAIL,
  payload: {lat, lon, name}
})
export const closeWeatherDetail = () => ({type: ActionTypes.CLOSE_WEATHER_DETAIL})
export const refreshWeatherForecast = () => ({type: ActionTypes.REFRESH_WEATHER_FORECAST})

const INITIAL_STATE = {
  defaultCurrent: {
    lat: '18210',
    lon: '311',
    name: 'Bogor'
  },
  selected: {
    lat: '18210',
    lon: '311',
    name: 'Bogor'
  },
  cities: [
    'Bogor',
    'Jakarta Pusat',
    'Manhattan'
  ],
  todayShow: false
}

export const AppReducer = (state = INITIAL_STATE, action: { type: string, payload?: any }) => {
  switch (action.type){
    case ActionTypes.SELECT_CITY:
      return {
        ...state,
        selected: {
          lat: action.payload.lat,
          lon: action.payload.lon,
          name: action.payload.name
        },
        todayShow: true
      }
    case ActionTypes.CLOSE_WEATHER_DETAIL:
      return {
        ...state,
        todayShow: false,
        selected: {
          lat: state.defaultCurrent.lat,
          lon: state.defaultCurrent.lon,
          name: state.defaultCurrent.name
        }
      }
    case ActionTypes.REFRESH_WEATHER_FORECAST:
      return state
    default:
      return state
  }
}
