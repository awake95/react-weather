import React, {FC, useState, useEffect} from 'react';
import {fetchWeather} from "../../helpers/fetchWeather";
import {weatherData} from "../../interfaces";
import Weather from "./Weather/Weather";
import CircularProgress from '@mui/material/CircularProgress';
import {Switch} from "@mui/material";
import DarkModeIcon from '@mui/icons-material/DarkMode';

const App: FC = () => {
    const [data, getData] = useState<weatherData>()
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    useEffect(() => {
        if (process.env.REACT_APP_WEATHER_API) {
            const weatherData = fetchWeather(process.env.REACT_APP_WEATHER_API, {city: 'Saint Petersburg'});

            weatherData.then((res) => {
                getData(res)
                console.log(res)
            }).catch(err => {
                console.error(err);
            })
        }
    }, [])

    const localStorageTheme = () => {
        const theme = localStorage.getItem('theme');
        if (theme) {
            if (theme === 'dark') {
                document.querySelector('html')?.classList.add('dark')
                setIsDarkMode(true)
            }
        }
    }

    const darkModeChangeHandler = () => {
        setIsDarkMode(darkMode => !darkMode)
        localStorage.setItem('theme', 'dark');
        document.querySelector('html')?.classList.add('dark')
        if (isDarkMode) {
            localStorage.setItem('theme', 'light');
            document.querySelector('html')?.classList.remove('dark')
        }
    }

    useEffect(() => {
        localStorageTheme();
    }, []);


    return (
        <div className={[`bg-gray-50 w-full relative flex justify-center items-center px-4 sm:px-0 dark:bg-gray-800 transition delay-300`].join('')}
            style={{height: window.innerHeight + 'px'}}>
            <span className='absolute top-10 right-10'>
                <DarkModeIcon className='dark:text-yellow-300 transition delay-300'/>
                <Switch
                    checked={isDarkMode}
                    onChange={darkModeChangeHandler}
                    inputProps={{'aria-label': 'controlled'}}
                />
            </span>
            <div className='w-full'>
                {data && Object.keys(data).length > 0 ?
                    <Weather forecast={data.forecast} current={data.current} location={data.location}
                             getData={getData}/>
                    : <span
                        className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'><CircularProgress/></span>}
            </div>
            <a className='absolute bottom-5 left-1/2 transform -translate-x-1/2' href="https://www.weatherapi.com/"
               title="Free Weather API">
                <img style={{width: '80px'}} src='//cdn.weatherapi.com/v4/images/weatherapi_logo.png'
                     alt="Weather data by WeatherAPI.com"/>
            </a>
        </div>
    );
}

export default App;
