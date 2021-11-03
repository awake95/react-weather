import React, {ChangeEvent, MouseEvent, FormEvent, useState, useEffect} from 'react';
import {weatherData} from "../../../interfaces";
import {fetchWeather} from "../../../helpers/fetchWeather";
import WeatherCard from "./WeatherCard/WeatherCard";
import WeatherHour from "./WeatherHour/WeatherHour";
import {Button} from "@mui/material";
import {DebounceInput} from 'react-debounce-input';
import {fetchCities} from "../../../helpers/fetchCities";
import SearchIcon from '@mui/icons-material/Search';
import {CSSTransition} from 'react-transition-group';
import {ReactComponent as Cloud} from '../../../images/icons/104.svg'
import {ReactComponent as Rain} from '../../../images/icons/309.svg'
import {ReactComponent as Sun} from '../../../images/icons/100.svg'
import {ReactComponent as Snow} from '../../../images/icons/401.svg'

const Weather = ({forecast, current, location, getData}: weatherData) => {
    /**
     * State
     */
    const [curDayIndex, setCurDayIndex] = useState<number>(0);
    const [searchValue, setSearchValue] = useState<string>('');
    const [tempDimension, setTempDimension] = useState<string>('c');
    const [isDimensionChanged, setIsDimensionChanged] = useState<boolean>(false);
    const [isListShown, setIsListShown] = useState<boolean>(false);
    const [cityList, setCityList] = useState<{ city:string }[]>([])
    const [isVisibleFeelsTemp, setIsVisibleFeelsTemp] = useState<boolean>(false);
    const [isHoursChanged, setIsHoursChanged] = useState<boolean>(false);

    const hours = [];
    const avgtemp = ('avgtemp_' + tempDimension);
    const temp = ('temp_' + tempDimension);
    const feelsTemp = ('feelslike_' + tempDimension);

    const curDayIndexTemp = (forecast.forecastday[curDayIndex].day[avgtemp]).toString().includes('-') ? Math.floor(+(forecast.forecastday[curDayIndex].day[avgtemp])) : '+' + Math.floor(+(forecast.forecastday[curDayIndex].day[avgtemp]));
    const initializedCurTemp = (current[temp]).toString().includes('-') ? Math.floor(+(current[temp])) : '+' + Math.floor(+(current[temp]));
    const feelsLikeTemp = (current[feelsTemp]).toString().includes('-') ? Math.floor(+(current[feelsTemp])) : '+' + Math.floor(+(current[feelsTemp]));
    const dayOfForecast = forecast.forecastday[curDayIndex].day;
    for (let i = 0; i < forecast.forecastday[curDayIndex].hour.length; i += 3) {
        hours.push(forecast.forecastday[curDayIndex].hour[i]);
    }

    const searchByTownHandler = (event: FormEvent) => {
        event.preventDefault();
        if (!searchValue) return;
        if (process.env.REACT_APP_WEATHER_API) {
            const weatherData = fetchWeather(process.env.REACT_APP_WEATHER_API, {city: searchValue});
            weatherData.then((res) => {
                getData(res)
                console.log(res)
                setSearchValue('')
            }).catch(err => {
                console.error(err);
            })
        }
    }

    const changeDimensionHandler = () => {
        setIsDimensionChanged(prev => !prev)

        if (isDimensionChanged) {
            setTempDimension('c')
        }else {
            setTempDimension('f')
        }
    }

    const searchChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchValue(value)

        if (value.length === 0) {
            setIsListShown(false);
        }

        if (value.length > 3) {
            fetchCities(value)
                .then(res => {
                    setCityList([...res.data])
                })
                .catch(err => console.error(err));
            setIsListShown(prev => !prev);

        }
    }

    const clickOnChosenValue = (event:MouseEvent) => {
        const target = event.target as Element;
        if (target.textContent) {
            setSearchValue(target.textContent)
            setIsListShown(false);
        }
    }

    useEffect(() => {
        if (curDayIndex > 0) {
            setIsVisibleFeelsTemp(false);
        } else {
            setIsVisibleFeelsTemp(true);
        }
    }, [curDayIndex, setIsVisibleFeelsTemp])

    useEffect(() => {
        setIsHoursChanged(true);
    }, [curDayIndex, setIsHoursChanged])

    return (
        <div className='max-w-xl bg-white w-full m-auto p-5 rounded relative dark:text-black transition delay-300'>
            <div
                className='flex items-center flex-wrap sm:flex-nowrap justify-center sm:justify-between text-gray-400 mb-4 dark:text-gray-400 transition delay-300'>
                <div className='mb-2 sm:mb-0 pr-0 sm:pr-2'>
                    <span className='mr-3'>{location.localtime.split(' ')[1]}</span>
                    <span>{location.country}, {location.name}</span>
                </div>
                <form onSubmit={searchByTownHandler} className='flex items-end w-full sm:w-48 relative'>
                    <DebounceInput
                        minLength={2}
                        debounceTimeout={1000}
                        value={searchValue}
                        className='search-input px-4 py-1 rounded focus:outline-0 w-full'
                        placeholder='Change country'
                        onChange={searchChangeHandler}
                    />
                    <SearchIcon className='absolute bg-white right-1 text-gray-600 top-1/2 transform -translate-y-1/2 z-index-5 cursor-pointer' onClick={searchByTownHandler}/>
                    {
                        <CSSTransition
                            in={ isListShown }
                            timeout={400}
                            unmountOnExit
                            classNames={'some'}>
                            <ul className='city-list absolute top-full bg-white border w-full'>
                                {cityList &&
                                    cityList.map((city, index) => {
                                        return <li key={city.city + index} className='city-list__item px-2 text-gray-600 py-1 cursor-pointer hover:bg-gray-100 hover:text-gray-600' onClick={clickOnChosenValue}>{city.city ?? ''}</li>
                                    })
                                }
                            </ul>

                        </CSSTransition>
                    }
                </form>
            </div>
            <div className='flex items-center'>
                <span className='block text-4xl text-black dark:text-black mb-4'>{curDayIndex > 0 ? curDayIndexTemp : initializedCurTemp}°</span>
                <Button style={{minWidth: 0, minHeight: 0, padding: '5px'}} onClick={changeDimensionHandler}>{tempDimension === 'c' ? 'С' : 'F'}</Button>
                {
                    curDayIndex === 0 && current.cloud > 80 && forecast.forecastday[curDayIndex].day.daily_will_it_rain === 0 &&
                        <Cloud className='svg ml-5' style={{width: '50px', height: '50px' ,fill: '#6366f1'}}/>
                }
                {   curDayIndex === 0 && dayOfForecast.daily_will_it_rain > 0 && dayOfForecast.daily_will_it_snow === 0 &&
                        <Rain className='svg ml-5' style={{width: '50px', height: '50px' ,fill: '#6366f1'}}/>
                }
                {
                    curDayIndex === 0 && dayOfForecast.daily_will_it_snow > 0 && dayOfForecast.daily_will_it_rain === 0 &&
                        <Snow className='svg ml-5' style={{width: '50px', height: '50px' ,fill: '#6366f1'}}/>
                }
                {
                    curDayIndex > 0 && dayOfForecast.daily_will_it_snow > 0 && dayOfForecast.daily_will_it_rain === 0 &&
                    <Snow className='svg ml-5' style={{width: '50px', height: '50px' ,fill: '#6366f1'}}/>
                }
                {
                    curDayIndex > 0 && dayOfForecast.daily_will_it_snow === 0 && dayOfForecast.daily_will_it_rain > 0 &&
                    <Snow className='svg ml-5' style={{width: '50px', height: '50px' ,fill: '#6366f1'}}/>
                }

                {
                    curDayIndex > 0 && dayOfForecast.daily_will_it_snow === 0 && dayOfForecast.daily_will_it_rain === 0 &&
                    <Sun className='svg ml-5' style={{width: '50px', height: '50px' ,fill: '#6366f1'}}/>
                }
            </div>
            {
                <CSSTransition
                    in={isVisibleFeelsTemp}
                    timeout={400}
                    unmountOnExit
                    classNames={'some'}>
                    <span>Feels like {feelsLikeTemp}°</span>
                </CSSTransition>
            }
            <div className='hours-overflow flex mt-5 sm:space-x-0 sm:justify-between overflow-x-auto'>
                {hours && hours.map((hour, i) => {
                    return <CSSTransition    key={hour.time_epoch}
                                             in={isHoursChanged}
                                             timeout={400}
                                             unmountOnExit
                                             classNames='hours'>
                        <WeatherHour key={hour.time_epoch} hour={hour} tempDimension={tempDimension}/>
                    </CSSTransition>
                })}
            </div>
            <div className='flex flex-wrap sm:flex-nowrap sm:justify-between mt-10 space-y-3 sm:space-y-0 sm:space-x-3'>
                {forecast.forecastday.map((day, index: number) => {
                    return <WeatherCard key={day.date_epoch} day={day} index={index} curDayIndex={curDayIndex}
                                        setCurDayIndex={setCurDayIndex} tempDimension={tempDimension}/>
                })
                }
            </div>
        </div>
    );
};

export default Weather;
