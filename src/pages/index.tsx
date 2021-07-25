import {WeatherCard} from "../components/core/weather/WeatherCard";
import {Layout} from "../components/Layout";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType, refreshWeatherForecast} from "../redux/AppRedux";
import {openWeatherDetail} from "../redux/WeatherRedux"
import {getFiveDaysWeatherMapper, getMaxMinTemp} from "../libs/utils"
import {useEffect, useState} from "react";

type listType = {
  date: [object]
}

function Index(){
  const dispatch = useDispatch();
  const refreshed = useSelector((state: AppStateType) => state.app.refreshed)
  const selectedCityName = useSelector((state: AppStateType) => state.app.selectedCity.name)
  const data = useSelector((state) => state.weather.data)
  useEffect(() => {
    dispatch(refreshWeatherForecast(true))
    const interval = setInterval(() => {

      if(!refreshed){
        dispatch(refreshWeatherForecast(true))
      }
    }, 1000 * 5 * 60);
    return () => clearInterval(interval);
  },[])

  return (
    <Layout selectedCity={selectedCityName} refresh={refreshed}>
      <div className="d-flex justify-content-between flex-lg-wrap flex-xl-nowrap flex-sm-wrap flex-wrap">
        {
          data && Object.keys(data).map((d, i) => {
            const maxMin = getMaxMinTemp(data[d])
            return (
              i > 0 ?  
                <WeatherCard
                  className="order-2"
                  key={i}
                  color="red"
                  openWeatherDetail={(date: string) => dispatch(openWeatherDetail(date))}
                  date={data[d][0].dt_txt.split(" ")[0]}
                  humidity={data[d][0].main.humidity}
                  icon={data[d][0].weather[0].icon}
                  temp={data[d][0].main.temp}
                  maxTemp={maxMin.max}
                  minTemp={maxMin.min}
                  wind={data[d][0].wind.speed}/> : null)
          })
        }
      </div>
    </Layout>
  )
}

export default Index;
