import React, {useEffect, useState} from "react";
import {useHttp} from "../libs/api/hooks/useHttp";
import {NavBar} from "./partial/layout/NavBar";
import Footer from "./partial/layout/Footer";
import Drawer from "./partial/layout/Drawer";
import {WeatherHero} from "./core/weather-hero/WeatherHero";
import {useDispatch, useSelector} from "react-redux";
import {refreshWeatherForecast} from "../redux/AppRedux";
import {storeDataFiveDays, closeWeatherDetail} from "../redux/WeatherRedux"
import {fiveDaysWeatherMapper} from "../libs/utils"
import moment from 'moment'
import {WeatherStateType} from "../redux/dataModel";

type Props = {
    children?: React.ReactNode,
    selectedCity: string,
    refresh: boolean
}

export function Layout({children, selectedCity, refresh}: Props){
  const dispatch = useDispatch();
  const timeSelected = useSelector((state: WeatherStateType) => state.weather.timeSelected)

  const [showDrawer, setShowDrawer] = useState(false);
  const [{ data, loading, error }, fetchData, cancelRequest] = useHttp({}, { manual: true });

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if(refresh) {
      fetch5DaysForecast(selectedCity)
      return () => cancelRequest();
    }
  }, [selectedCity, refresh]);
  /* eslint-enabled react-hooks/exhaustive-deps */

  async function fetch5DaysForecast(q: string){
    try {
      await fetchData({
        url: '/forecast',
        params: {
          q,
        },
      }).then(({data}) => {
        dispatch(storeDataFiveDays(fiveDaysWeatherMapper(data)))
        dispatch(refreshWeatherForecast(false))
      });
    } catch (e) {
      // console.error('Failed to get weather data from the server!');
    }
  }

  return (
    <>
      <WeatherHero
        selectedDate={timeSelected}
        cityName={data ? data.city.name: ""}
        countryId={data ? data.city.country : ""}
      >
        <NavBar
          closeWeatherDetail={() => dispatch(closeWeatherDetail())}
          openDrawer={() => setShowDrawer(true)}
          day={moment(timeSelected).format('dddd')}
          city={data && data.city.name} />
      </WeatherHero>
      <div className="main mt-3">
        {data && children}
      </div>
      <Footer/>
      <Drawer show={showDrawer} handleClose={() => setShowDrawer(false)}/>
    </>
  )
}
