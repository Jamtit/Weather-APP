import React, { useEffect } from 'react';
import axios from 'axios';
import {Container, Card, Box, TextField, InputAdornment} from '@mui/material'
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import CompressIcon from '@mui/icons-material/Compress';
import AirIcon from '@mui/icons-material/Air';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PlaceIcon from '@mui/icons-material/Place';
import InputIcon from '@mui/icons-material/Input';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import LightModeIcon from '@mui/icons-material/LightMode';
import UmbrellaIcon from '@mui/icons-material/Umbrella';

import CardComp from './components/card';
import { faWindowRestore } from '@fortawesome/free-regular-svg-icons';


function App() {

  interface weatherInfo {
    city: string,
    currentTemperature: number,
    weather: string,
    weatherDesc: string,
    humidty: number,
    airPressure: number,
    windSpeed: number
  }

  interface mainStyles{
    backgroundImage: string,
  }
  
  const [weather, setWeather]= React.useState<weatherInfo>()
  const [futureWeather, setFutureWeather] = React.useState([])
  const [city, setCity] = React.useState("Berlin")

  const getWeatherData = async () =>{
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=c2654c8c929b4d3d3e6acc7b1029754c`)
  
    const result = response.data;
  
    return result
  }


  const onClickFetchData = async () =>{
    const testData = await getWeatherData();
    const neededInfo: weatherInfo = {
      city: testData["city"]["name"],
      currentTemperature: testData["list"][0]["main"]["temp"],
      weather: testData["list"][0]["weather"][0]["main"],
      weatherDesc: testData["list"][0]["weather"][0]["description"],
      humidty: testData["list"][0]["main"]["humidity"],
      airPressure: testData["list"][0]["main"]["pressure"],
      windSpeed: testData["list"][0]["wind"]["speed"]
    }
    setWeather(neededInfo)
    setFutureWeather(testData["list"])

    console.log(weather)
    console.log(futureWeather)
  }


  useEffect(()=>{
    (async () =>{
      const testData = await getWeatherData();
      const neededInfo: weatherInfo = {
        city: testData["city"]["name"],
        currentTemperature: testData["list"][0]["main"]["temp"],
        weather: testData["list"][0]["weather"][0]["main"],
        weatherDesc: testData["list"][0]["weather"][0]["description"],
        humidty: testData["list"][0]["main"]["humidity"],
        airPressure: testData["list"][0]["main"]["pressure"],
        windSpeed: testData["list"][0]["wind"]["speed"]
      }
      setWeather(neededInfo)
      setFutureWeather(testData["list"])
  
    })();
  }, []);


  const info = futureWeather.map(items =>{
    const timeString: string = items["dt_txt"]
    return <CardComp
      key = {items["dt"]}
      time = {timeString.slice(10,13)}
      temperature = {items["main"]["temp"]}
      feelsLikeTemperature = {items["main"]["feels_like"]}
      day = {timeString.slice(5, 10)}
      weather = {items["weather"][0]["description"]}
    />
  })


  const scrollLeft = () =>{
    var slider = document.getElementsByClassName('slider')[0]
    slider.scrollLeft -= 200
  }

  const scrollRight = () =>{
    var slider = document.getElementsByClassName('slider')[0]
    slider.scrollLeft += 200
  }

  function handleCityChange(event: { target: any; }){
    const value = event.target.value
    setCity(value)
  }


  const appStyle: mainStyles = {
    backgroundImage: 'url(sunny.png)'
  }
  var weatherIcon = <LightModeIcon sx={{
    typography:{
      fontSize: '56px'
    }
  }}/>

  if(weather?.weather === 'Snow'){
    appStyle.backgroundImage = 'url(snow.png)'
    weatherIcon = <AcUnitIcon sx={{
      typography:{
        fontSize: '56px'
      }
    }}/>

  }
  else if(weather?.weather === 'Rain'){
    appStyle.backgroundImage = 'url(rain.png)'
    weatherIcon = <UmbrellaIcon sx={{
        typography:{
          fontSize: '56px'
        }
      }}/>
  }
  else if(weather?.weather === 'Clouds'){
    appStyle.backgroundImage = 'url(cloudy.png)'
    weatherIcon = <CloudOutlinedIcon sx={{
        typography:{
          fontSize: '56px'
        }
      }}/>
  }

  let convertedTemperature: number = 0
  if(weather?.currentTemperature !== undefined){
    convertedTemperature = Math.trunc(weather.currentTemperature - 273.15)
  }

  return (
    <Container>
      <Card className='Data__card'
        style={appStyle}
        sx={{
          color: 'white',
          fontFamily: 'Roboto, Arial',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          width: '1100px',
          height: '600px',
          backgroundSize: 'cover'
        }}
        >
          <Box className='top' sx={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingInline: '20px'
          }}>
            <Box sx={{
              height: 'auto',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {weatherIcon}
              <Typography variant='h4' sx={{
              }}>{weather?.weather}</Typography>
              <Typography sx={{
                fontSize: '20px',
              }}>{weather?.city}</Typography>
              <Typography sx={{
                typography:{
                  fontSize: '36px',
                  fontWeight: 600
                }
              }}>{convertedTemperature} &deg;C</Typography>
            </Box>

            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
            }}>
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent:'left'
              }}>
                <Icon className='material-symbols-outlined' sx={{
                  typography:{
                    fontSize: '30px',
                    marginRight: '15px'
                  }
                }}>humidity_percentage</Icon>
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems:'flex-start',
                  width: '150px'
                }}>
                  <Typography sx={{
                    typography:{
                      fontSize: '20px'
                    }
                  }}>Humidity</Typography>
                  <Typography sx={{
                    typography:{
                      fontSize: '32px',
                    }
                  }}>{weather?.humidty}</Typography>
                </Box>
              </Box>

              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent:'left'
              }}>
                <CompressIcon sx={{
                  typography:{
                    fontSize: '30px',
                    marginRight:'15px'
                  }
                }}/>
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  width: '150px'
                }}>
                  <Typography sx={{
                    typography:{
                      fontSize: '20px'
                    }
                  }}>Air Pressure</Typography>
                  <Typography sx={{
                    typography:{
                      fontSize: '32px'
                    }
                  }}>{weather?.airPressure} PS</Typography>
                </Box>
              </Box>


              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent:'left'
              }}>
                <AirIcon sx={{
                  typography:{
                    fontSize: '30px',
                    marginRight: '15px'
                  }
                }}/>
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  width: '150px'
                }}>
                  <Typography sx={{
                    typography:{
                      fontSize: '20px'
                    }
                  }}>Wind Speed</Typography>
                  <Typography sx={{
                    typography:{
                      fontSize: '32px'
                    }
                  }}>{weather?.windSpeed} m/s</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{
            display: 'flex',
            alignItems: 'center'
          }}>
            <TextField
              id="input-with-icon-textfield"
              label="Pick your location"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PlaceIcon sx={{
                      color: 'white'
                    }}/>
                  </InputAdornment>
                  
                 ),
                 endAdornment: (
                  <InputAdornment position="end">
                    <InputIcon sx={{
                      opacity: '50%',
                      ":hover":{
                        cursor: 'pointer',
                        opacity: '100%',
                      },
                      color: 'white'
                    }} onClick={onClickFetchData}/>
                  </InputAdornment>
                 )
              }}
              variant="standard"
              sx={{
                position: 'relative',
                left: '20px',
                '& .MuiInputBase-root': {
                  color: 'white'
                },
                ":focused": {
                  color: 'white'
                }
              }}
              onChange={handleCityChange}
              value={city}
            />
          </Box>

          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <ArrowBackIosNewIcon sx={{
              marginInline: '5px',
              opacity: '50%',
              ":hover":{
                cursor: 'pointer',
                opacity: '100%'

              }
            }} onClick={scrollLeft}/>
            <Box className='slider' sx={{
              display: 'flex',
              flexDirection: 'row',
              overflowX: 'scroll',
              overflowY: 'hidden',
              scrollBehavior: 'smooth',
              scrollbarWidth: 'none'
            }}>
              {info}
            </Box>
            <ArrowForwardIosIcon sx={{
              marginInline: '10px',
              opacity: '50%',
              ":hover":{
                cursor: 'pointer',
                opacity: '100%'
              }
            }} onClick={scrollRight}/>
          </Box>
          
      </Card>
    </Container>
  );
}

export default App;
