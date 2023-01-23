import React from "react";
import {Box} from '@mui/material';


interface futureWeatherInfo{
  time: string,
  temperature: number,
  feelsLikeTemperature: number
}

const KandCDifference: number = 273.15

function cardComp(props: futureWeatherInfo){
  let convertedTime: number = parseInt(props.time);
  let noonOrMidnight = "AM"

  if(parseInt(props.time) > 12){
    convertedTime = convertedTime - 12;
    noonOrMidnight = "PM"
  }

  if(parseInt(props.time) === 0){
    convertedTime = 12
    noonOrMidnight = "AM"
  }

  if(parseInt(props.time) === 12){
    noonOrMidnight = "PM"
  }



  return(
    <Box className="day_weather">
      <h3 className="day_weather__time">{convertedTime} {noonOrMidnight}</h3>
      <h3 className="day_weather__temp">{Math.trunc(props.temperature - KandCDifference)} &deg;C</h3>
      <h3 className="day_weather__feels">Feels like {Math.trunc(props.feelsLikeTemperature - KandCDifference)} &deg;C</h3>
    </Box>
  )
}

export default cardComp;