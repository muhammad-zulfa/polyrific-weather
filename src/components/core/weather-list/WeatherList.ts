import PropTypes from 'prop-types';
import React from "react";

interface cityLists{
    [index: number]: string
}

interface IWeatherList extends React.HTMLAttributes<HTMLDivElement>{
    onNewCityAdded: () => void,
    onWeatherClicked: () => void,
    cities: cityLists
}
