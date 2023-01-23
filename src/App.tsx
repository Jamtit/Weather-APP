import React, { useEffect } from 'react';
import axios from 'axios';
import {Container, Card, Box} from '@mui/material'
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import CompressIcon from '@mui/icons-material/Compress';
import AirIcon from '@mui/icons-material/Air';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';

import CardComp from './components/card';

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



  async function dataGetter(){
    try{
      // const result = await axios.get('http://api.openweathermap.org/data/2.5/weather?id=524901&appid=c2654c8c929b4d3d3e6acc7b1029754c');
      const result = await axios.get('http://api.openweathermap.org/data/2.5/forecast?q=Jerusalem&appid=c2654c8c929b4d3d3e6acc7b1029754c')
      console.log(JSON.stringify(result.data["list"]))
      //to reach city data, we have to do result.data["city"]
      return result.data
    }catch(err){
      console.error(err)
    }
  }

  useEffect(()=>{
    (async () =>{
      const testData = await dataGetter();
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
    />
  })


  const appStyle: mainStyles = {
    backgroundImage: 'url(sunny.png)'
  }

  if(weather?.weather === 'Snow'){
    appStyle.backgroundImage = 'url(snow.png)'
  }
  else if(weather?.weather === 'Rain'){
    appStyle.backgroundImage = 'url(rain.png)'
  }
  else if(weather?.weather === 'Clouds'){
    appStyle.backgroundImage = 'url(cloudy.png)'
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
              <CloudOutlinedIcon sx={{
                typography:{
                  fontSize: '56px'
                }
              }}/>
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
            flexDirection: 'row',
            overflowX: 'scroll',
            overflowY: 'hidden'
          }}>
            {info}
          </Box>
      </Card>
    </Container>
  );
}

export default App;
