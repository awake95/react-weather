import React, {useState, useEffect} from 'react';
import {weatherCardInterface} from "../../../../interfaces"

const WeatherCard = ({day, index, setCurDayIndex, curDayIndex, tempDimension}: weatherCardInterface) => {

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const [isActive, setIsActive] = useState<boolean>(false);
    const mintemp = 'mintemp_' + tempDimension;
    const maxtemp = 'maxtemp_' + tempDimension;

    useEffect(()=> {
        if (curDayIndex !== index) {
            setIsActive( false);
        }
    }, [curDayIndex, isActive, index])

    const getDay = (year: number, month: number, day: number) => {
        return new Date(year, month, day);
    }

    const dateMonth = day.date.split(' ')[0].split('-'),
        dayNumber = dateMonth[2],
        monthText = months[+dateMonth[1] - 1],
        currDay = getDay(+dateMonth[0], +dateMonth[1] - 1, +dateMonth[2]).getDay(),
        removedZeroFromDay = dayNumber.charAt(0) === '0' ? dayNumber.replace('0', '') : dayNumber ;

    const weatherCardClickHandler = () => {
        setCurDayIndex(index)
        setIsActive(true);
    }

    return (
        <div className={[`bg-indigo-100 rounded w-full sm:w-4/12 p-5 cursor-pointer transition ${index === 0 && curDayIndex === 0 ? 'bg-indigo-500 text-white' : '' } ${isActive ? 'bg-indigo-500 text-white' : '' }`].join('')} onClick={weatherCardClickHandler}>
            {index === 0 &&
            <span className='text-lg lowercase'>{days[currDay]}, {removedZeroFromDay} {monthText} <span className='block text-xs mb-2'>Today</span></span>
            }
            {index === 1 &&
            <span className='text-lg lowercase'>{days[currDay]}, {removedZeroFromDay} {monthText} <span className='block text-xs mb-2'>Tomorrow</span></span>
            }
            {index > 1 &&
            <span className='text-lg lowercase'>{days[currDay]}, {removedZeroFromDay} {monthText} <span className='block mb-2' style={{height: '16px'}}> </span></span>
            }
            <div className='flex'>
                <span className=''>{(day.day[mintemp]).toString().includes('-') ? day.day[mintemp] : '+' + day.day[mintemp]}°</span>
                <span className=''>{(day.day[maxtemp]).toString().includes('-') ? day.day[maxtemp] : '+' + day.day[maxtemp]}°</span>
            </div>


        </div>
    );
};

export default WeatherCard;
