import React from 'react';
import {weatherHourInterface} from "../../../../interfaces";
import {ReactComponent as Rain} from '../../../../images/icons/309.svg'
import {ReactComponent as Cloud} from '../../../../images/icons/104.svg'
import {ReactComponent as Sun} from '../../../../images/icons/100.svg'
import {ReactComponent as Snow} from '../../../../images/icons/401.svg'

const WeatherHour = ({hour, tempDimension}:weatherHourInterface) => {
    const time = hour.time.split(' ')[1],
        reworkedTime = time.charAt(0) === '0' ? time.slice(1): time,
        firstPartOfTime = reworkedTime.split(':')[0],
        secondPartOfTime = reworkedTime.split(':')[1];

    const temp = 'temp_' + tempDimension;

    return (
        <div className='flex mr-3 sm:mr-0 mb-4 sm:mb-0 w-min justify-center items-center flex-col'>
            {
                hour.will_it_rain === 1 && hour.will_it_snow === 0 &&
                <Rain className='mb-3' style={{width: '30px', height: '30px', fill: '#6366f1'}}/>
            }

            {
                hour.will_it_rain === 0 && hour.will_it_snow === 1 &&
                <Snow className='mb-3' style={{width: '30px', height: '30px', fill: '#6366f1'}}/>
            }
            {
                hour.cloud > 80 && hour.will_it_rain === 0 && hour.will_it_rain === 0 &&
                    <Cloud className='mb-3' style={{width: '30px', height: '30px', fill: '#6366f1'}}/>
            }
            {
                hour.cloud < 80 && hour.will_it_rain === 0 && hour.will_it_snow === 0 &&
                    <Sun className='mb-3' style={{width: '30px', height: '30px', fill: '#6366f1'}}/>
            }
            <span className='flex text-gray-600 mb-4 text-center'>{firstPartOfTime} <span className='self-start ml-1' style={{fontSize: '10px'}}>{secondPartOfTime}</span></span>
            <span className='text-xl bg-indigo-50 p-1 rounded'>{(hour[temp]).toString().includes('-') ? Math.floor(+(hour[temp])) : '+' + Math.floor(+(hour[temp]))}°</span>
        </div>
    );
};

export default WeatherHour;
