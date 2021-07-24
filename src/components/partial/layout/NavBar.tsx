import React from "react";
import Link from "next/link"
import {BurgerIcon} from "../icons"
import {closeWeatherDetail} from "../../../redux/AppRedux";
import {useSelector} from "react-redux";

type PropsType = {
  openDrawer: () => void,
  closeWeatherDetail: () => void,
  day: string,
  city: string
}


export function NavBar({openDrawer, day, city, closeWeatherDetail}: PropsType){
  const closeButton = useSelector((state => state.app.todayShow))
  return (
    <div className="navbar navbar-light navbar-expand text-white">
      <div className="container">
        <Link href="/">
          <span className="navbar-brand text-brand text-white">{day} in {city}</span>
        </Link>

        <div className="d-flex">
          <div className="navbar-expand-lg pointer-cursor">
            {closeButton &&
              <a className="btn btn-outline-light" href="#" role="button" onClick={closeWeatherDetail}>
                <BurgerIcon color="white"/>
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
