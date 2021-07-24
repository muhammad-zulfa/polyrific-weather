import React from 'react';
import styles from './WeatherCard.module.scss'
import {HumidityIcon, WindIcon} from '../../partial/icons'

interface IWeatherCard extends React.HTMLAttributes<HTMLDivElement>{
    color: string
}

export const WeatherCard : React.FunctionComponent<IWeatherCard> = (props) => {
  return (
    <div className={`card shadow-sm mx-3 ${styles.WeatherContainer} flex-sm-grow-1 mt-sm-3 ${props.className}`}>
      <div className={`card-header border-0 text-center ${styles.CardHeader}`}>
        <h1 className="card-title">
          {props.color}
        </h1>
        <div className="card-subtitle">
          12 Agustus 1995
        </div>
      </div>
      <div className="card-body">
        <div className="d-flex justify-content-center flex-column">
          <img className={styles.WeatherIcon} src="https://openweathermap.org/img/wn/01d@2x.png" />
          <div className="d-flex justify-content-between">
            <span className={`${styles.Low}`}>24&#176; C</span>
            <span className={styles.WeatherTemp}>35&#176; C</span>
            <span className={`${styles.Hi}`}>35&#176; C</span>
          </div>
          <div className="d-flex justify-content-between text-dark">
            <div>
              <HumidityIcon color="black"/> <span className="mt-2">90%</span>
            </div>
            <div>
              <WindIcon color="black"/> 9 meters/s
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
