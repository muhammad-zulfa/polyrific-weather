import React, {useState} from "react";
import {PageDataProvider} from "./core/PageDataProvider";
import {NavBar} from "./partial/layout/NavBar";
import Footer from "./partial/layout/Footer";
import Drawer from "./partial/layout/Drawer";
import {WeatherHero} from "./core/weather-hero/WeatherHero";
import {useDispatch} from "react-redux";
import {closeWeatherDetail} from "../redux/AppRedux";

type Props = {
    children?: React.ReactNode
}

export function Layout({children}: Props){
  const dispatch = useDispatch();
  const [showDrawer, setShowDrawer] = useState(false);


  return (
    <>
      <WeatherHero lon="1" lat="1" name="1">
        <NavBar closeWeatherDetail={() => dispatch(closeWeatherDetail())} openDrawer={() => setShowDrawer(true)} day="Today" city="Jakarta Pusat" />
      </WeatherHero>
      <div className="main mt-3">
        {children}
      </div>
      <Footer/>
      <Drawer show={showDrawer} handleClose={() => setShowDrawer(false)}/>
    </>
  )
}
