import {WeatherCard} from "../components/core/weather/WeatherCard";
import {Layout} from "../components/Layout";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType, refreshWeatherForecast} from "../redux/AppRedux";
import {openWeatherDetail} from "../redux/WeatherRedux"
import {getMaxMinTemp} from "../libs/utils"
import {useEffect} from "react";
import {WeatherStateType} from "../redux/dataModel";

function Index(){
  const dispatch = useDispatch();
  const refreshed = useSelector((state: AppStateType) => state.app.refreshed)
  const selectedCityName = useSelector((state: AppStateType) => state.app.selectedCity.name)
  const data = useSelector((state: WeatherStateType) => state.weather.data)
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

            // @ts-ignore
            const wData = data[d]
            const maxMin = getMaxMinTemp(wData)
            return (
              i > 0 ?  
                <WeatherCard
                  className="order-2"
                  key={i}
                  color="red"
                  openWeatherDetail={(date: string) => dispatch(openWeatherDetail(date))}
                  date={wData[0].dt_txt.split(" ")[0]}
                  humidity={wData[0].main.humidity}
                  icon={wData[0].weather[0].icon}
                  temp={wData[0].main.temp}
                  maxTemp={maxMin.max}
                  minTemp={maxMin.min}
                  wind={wData[0].wind.speed}/> : null)
          })

        }
      </div>
    </Layout>
  )
}

export default Index;
