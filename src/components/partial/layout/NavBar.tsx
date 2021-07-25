import React from "react";
import Link from "next/link"
import {BurgerIcon} from "../icons"
import styles from './NavBar.module.scss'
import {useSelector} from "react-redux";
import {WeatherStateType} from "../../../redux/dataModel";

type PropsType = {
  openDrawer: () => void,
  closeWeatherDetail: () => void,
  day: string,
  city: string
}


export function NavBar({openDrawer, day, city, closeWeatherDetail}: PropsType){
  const closeButton = useSelector((state: WeatherStateType) => state.weather.todayShow)
  return (
    <div className="navbar navbar-light navbar-expand text-white">
      <div className="container">
        <Link href="/">
          <span className={`navbar-brand text-brand text-white ${styles.Title}`}>{day} in {city}</span>
        </Link>

        <div className="d-flex">
          <div className="navbar-expand-lg pointer-cursor">
            {closeButton &&
              <a className={`btn btn-outline-light me-3 ${styles.CloseWeatherButton}`} href="#" role="button" onClick={closeWeatherDetail}>
                <span>Show Today</span>
              </a>
            }

            <a data-toggle="collapse" href="#" role="button" onClick={openDrawer}>
              <BurgerIcon color="white"/>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
