import React from 'react';
import styles from './WeatherCard.module.scss'
import {HumidityIcon, WindIcon} from '../../partial/icons'
import moment from "moment";

interface IWeatherCard extends React.HTMLAttributes<HTMLDivElement>{
  icon: string,
  date: string,
  maxTemp: number,
  temp: number,
  minTemp: number,
  humidity: number,
  wind: number,
  openWeatherDetail: (date: string) => void
}

export const WeatherCard : React.FunctionComponent<IWeatherCard> = (props) => {
  return (
    <div
      onClick={() => props.openWeatherDetail(props.date)}
      className={`card shadow-sm mx-3 ${styles.WeatherContainer} flex-sm-grow-1 mt-sm-3 ${props.className}`}>
      <div className={`card-header border-0 text-center ${styles.CardHeader}`}>
        <h1 className="card-title">
          {moment(props.date).format("dddd")}
        </h1>
        <div className="card-subtitle">
          {moment(props.date).format("MMMM D, Y")}
        </div>
      </div>
      <div className="card-body">
        <div className="d-flex justify-content-center flex-column">
          <img className={styles.WeatherIcon} src={`https://openweathermap.org/img/wn/${props.icon}@2x.png`} />
          <div className="d-flex justify-content-between">
            <span className={`${styles.Low}`}>{props.minTemp}&#176; C</span>
            <span className={styles.WeatherTemp}>{props.temp}&#176; C</span>
            <span className={`${styles.Hi}`}>{props.maxTemp}&#176; C</span>
          </div>
          <div className="d-flex justify-content-between text-dark">
            <div>
              <HumidityIcon color="black"/> <span className="mt-2">{props.humidity}%</span>
            </div>
            <div>
              <WindIcon color="black"/> {props.wind} meters/s
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
