import React, {useEffect, useState} from "react";
import styles from './WeatherHero.module.scss';
import {HumidityIcon, WindIcon} from '../../partial/icons'
import {getMaxMinTemp} from "../../../libs/utils";
import {useSelector} from "react-redux";

interface IWeatherHero{
  selectedDate: string,
  cityName: string,
  countryId: string,
  children: React.ReactNode
}

export const WeatherHero: React.FunctionComponent<IWeatherHero> = ({cityName, countryId, selectedDate, children}) => {
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [data, setData] = useState([])
  const [temp, setTemp] = useState({max: 0, min: 0})
  const [dayOrNight, setDayOrNight] = useState("d");
  const weatherData = useSelector((state) => state.weather.data)

  useEffect(() => {
    if(selectedDate != null) {
      setData(weatherData[selectedDate])
      const maxMin = getMaxMinTemp(weatherData[selectedDate])
      setTemp(maxMin)
      setActiveTimeline(0)
      if(weatherData[selectedDate]) {
        const time = weatherData[selectedDate][0].dt_txt.split(" ")[1].split(':')[0];
        if (time >= 18 || time < 6) {
          setDayOrNight("n")
        } else {
          setDayOrNight("d");
        }
      }
    }
  },[selectedDate,weatherData])

  const RenderIcon = () => {
    if(data[activeTimeline] && data[activeTimeline].weather.length > 0){
      return (<img className={styles.WeatherIcon} src={`https://openweathermap.org/img/wn/${data[activeTimeline].weather[0].icon.substring(0,2)+dayOrNight}@2x.png`} />)
    }else{
      return null;
    }
  }

  const setTimeline = (value: number) => {
    const d = [...data]
    if(d[value]) {
      const time = d[value].dt_txt.split(" ")[1].split(':')[0];
      if (time >= 18 || time < 6) {
        setDayOrNight("n")
      } else {
        setDayOrNight("d");
      }
      setActiveTimeline(value)
    }
  }

  const RenderLoading = () => {
    return (
      <div className={`position-relative ${styles.Container} ${styles.Storm}`}>
        <div className={`main position-absolute w-100 h-100 ${styles.Night}`}>
          {children}
          <div className="container d-flex flex-column">
            <div className="position-relative d-flex justify-content-between text-white">
              <div className="d-flex flex-column" aria-live="assertive" aria-label="Loading Content...">
              </div>
              <img className={styles.WeatherIcon} src="https://openweathermap.org/img/wn/01n@2x.png" />
              <div className="position-absolute align-self-end end-0 mb-3" aria-live="assertive" aria-label="Loading Content...">
                18&#176;/30&#176; C
              </div>
            </div>
            <div className="d-flex justify-content-between text-white" aria-live="assertive" aria-label="Loading Content...">
              <div>
                <HumidityIcon color="white"/> <span className="mt-2">90%</span>
              </div>
              <div>
                <WindIcon color="white"/> 9 meters/s
              </div>
            </div>

            <div className="flex-parent" aria-live="assertive" aria-label="Loading Content...">
              <div className="input-flex-container">
                {[1,2,3,4,5,6,7,8].map((v,index) => {
                  return (
                    <div
                      key={index}
                      className={`input ${activeTimeline === index+1 ? 'active' : ''}`}
                      onClick={() => {setActiveTimeline(index+1)}}>
                      <span data-time="19:00" data-temp="35"></span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    !data[activeTimeline] ?
      <RenderLoading /> :

      <div className={`position-relative ${styles.Container} ${styles[data[activeTimeline].weather[0].main]}`}>
        <div className={`main position-absolute w-100 h-100 ${ dayOrNight === "n" ? styles.Night : ''}`}>
          {children}
          <div className="container d-flex flex-column">
            <div className="position-relative d-flex justify-content-between text-white">
              <div className="d-flex flex-column">
                <div className={`${styles.Title}`}>{ data[activeTimeline].main.temp }&#176; C</div>
                <div className={`${styles.Subtitle}`}>{cityName}</div>
                <div className="text-white-50">{countryId}</div>
              </div>
              <RenderIcon/>
              <div className="position-absolute align-self-end end-0 mb-3">
                { temp.min }&#176;/{ temp.max }&#176; C
              </div>
            </div>
            <div className="d-flex justify-content-between text-white">
              <div>
                <HumidityIcon color="white"/> <span className="mt-2">{data[activeTimeline].main.humidity}%</span>
              </div>
              <div>
                <WindIcon color="white"/> { data[activeTimeline].wind.speed } meters/s
              </div>
            </div>  
            
            <div className="flex-parent">
              <div className="input-flex-container">
                {data.map((v,index) => {
                  return (
                    <div
                      key={index}
                      className={`input ${activeTimeline === index ? 'active' : ''}`}
                      onClick={() => {setTimeline(index)}}>
                      <span data-time={v.dt_txt.split(" ")[1]} data-temp={v.main.temp}></span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
