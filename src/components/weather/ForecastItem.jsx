import React from 'react'

import { formatTime } from '../../utils'

export default function ForecastItem({forecast, localTime, currentTemp}) {
    const todayHours = forecast.forecastday[0].hour
    const tomorrowHours = forecast.forecastday[1].hour

    const thisDayArrayOfHours = todayHours.filter(hour => hour.time.split(' ')[1].split(':')[0] >= formatTime(localTime).split(':')[0])
    const totalHours = (thisDayArrayOfHours.length < 12) 
    ?   thisDayArrayOfHours.concat(tomorrowHours.slice(0, 12 - thisDayArrayOfHours.length))
    :   thisDayArrayOfHours.slice(0, 12)

    return (
        <div className='row'>
            {totalHours.map((el, index) => {
                let divClasses = (index === 0) ? 'element col s3 blue-grey lighten-5' : 'element col s3'
                let temp = (index === 0) ? currentTemp : el.temp_c
                return (
                    <div className={divClasses} key={el.time}>
                        <img src={el.condition.icon} alt='weather icon' />
                        <p>{Math.round(temp)}&deg;</p>
                        {/* FIXME: */}
                        <p>{el.time.split(' ')[1].split(':')[0].split('')[0] !== '0' // get out first 0
                            ? el.time.split(' ')[1].split(':')[0] 
                            : el.time.split(' ')[1].split(':')[0].split('')[1]
                        }</p>
                    </div>
                )
            })}
        </div>
    )
}
