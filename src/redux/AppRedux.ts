const ActionTypes = {
  SELECT_CITY: "SELECT_CITY",
  ADD_NEW_CITY: "ADD_NEW_CITY",
  REFRESH_WEATHER_FORECAST: "REFRESH_WEATHER_FORECAST",
}

export const selectCity = (lat: number, lon: number, name: string) => ({
  type: ActionTypes.SELECT_CITY,
  payload: {lat, lon, name}
})

export const refreshWeatherForecast = (data: boolean) => ({type: ActionTypes.REFRESH_WEATHER_FORECAST, payload: {data}})

interface cityLists{
  [index: number]: string
}

export type AppStateType = { app: {
    selectedCity: {
      lat: string,
      lon: string,
      name: string
    },
    refreshed: boolean,
    cities: cityLists,
  }
}

const INITIAL_STATE = {
  timeSelected: null,
  times: [],
  selectedCity: {
    lat: '18210',
    lon: '311',
    name: 'Bogor'
  },
  refreshed: false,
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
    case ActionTypes.REFRESH_WEATHER_FORECAST:
      return {...state, refreshed: action.payload.data}
    // case ActionTypes.STORE_DATA_FIVE_DAYS:
    //   localStorage.setItem('fiveDaysWeatherSelected',JSON.stringify(action.payload.data))
    //   localStorage.setItem('test', String(Number(localStorage.getItem('test')) + 1))
    //   const timeSelected = state.timeSelected
    //   return {
    //     ...state,
    //     times: Object.keys(action.payload.data),
    //     timeSelected: !timeSelected ? Object.keys(action.payload.data)[0] : timeSelected
    //   }
    default:
      return state
  }
}
