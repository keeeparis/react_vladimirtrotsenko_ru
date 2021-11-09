import React from 'react'
import { formatTime } from '../../utils'

export default function ForecastItem({forecast, localTime}) {
    const hours = forecast.forecastday[0].hour
    const selectedHours = hours.filter(hour => {
        switch (hour.time.split(' ')[1].split(':')[0]%2) {
            case 0: return true
            default: return false
        }
    })
    
    let flag = true

    return (
        <div className='row'>
            {selectedHours.map(el => {
                let divClasses = 'element col s3 '
                if (formatTime(localTime).split(':')[0] < el.time.split(' ')[1].split(':')[0] && flag===true) {
                    flag = false
                    divClasses = divClasses.concat('blue-grey lighten-5')
                }
                return (<div className={divClasses} key={el.time}>
                    <img src={el.condition.icon} alt='weather icon' />
                    <p>{Math.round(el.temp_c)}&#8451;</p>
                    <p>{el.time.split(' ')[1]}</p>
                </div>)                    
            })}
        </div>
    )
}
