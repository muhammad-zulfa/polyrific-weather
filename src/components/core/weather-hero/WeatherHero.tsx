import React, {useState} from "react";
import styles from './WeatherHero.module.scss';
import {HumidityIcon, WindIcon} from '../../partial/icons'

interface IWeatherHero{
    lon: string,
    lat: string,
    name: string,
    children: React.ReactNode
}

export const WeatherHero: React.FunctionComponent<IWeatherHero> = ({lon,lat,name,children}) => {
  const [activeTimeline, setActiveTimeline] = useState(-1);
  return (
    <div className={`position-relative ${styles.Container} ${styles.Storm}`}>
      <div className={`main position-absolute w-100 h-100 ${styles.Night}`}>
        {children}
        <div className="container d-flex flex-column">
          <div className="position-relative d-flex justify-content-between text-white">
            <div className="d-flex flex-column">
              <div className={`${styles.Title}`}>18&#176; C</div>
              <div className={`${styles.Subtitle}`}>Jakarta Pusat</div>
              <div className="text-white-50">ID</div>
            </div>

            <img className={styles.WeatherIcon} src="https://openweathermap.org/img/wn/01n@2x.png" />
            <div className="position-absolute align-self-end end-0 mb-3">
              18&#176;/30&#176; C
            </div>
          </div>
          <div className="d-flex justify-content-between text-white">
            <div>
              <HumidityIcon color="white"/> <span className="mt-2">90%</span>
            </div>
            <div>
              <WindIcon color="white"/> 9 meters/s
            </div>
          </div>  
            
          <div className="flex-parent">
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
  )
}
