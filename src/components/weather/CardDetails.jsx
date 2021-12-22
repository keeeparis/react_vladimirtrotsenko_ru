import React from 'react'
import windIcon from '../../media/images/wind-solid.svg'
import humidIcon from '../../media/images/drop-line.svg'
import uvIcon from '../../media/images/ultraviolet.png'

export default function CardDetails({className, item, words}) {
    return (
        <div className={className}>
            <div className='info'>
                <img src={humidIcon} alt="humidity" className='small-icon'/>
                <p>{item.forecast.current.humidity}%</p>
            </div>
            <div className='info'>
                <img src={windIcon} alt="wind" className='small-icon'/>
                <p>{Math.round(item.forecast.current.wind_kph)} {words.kph}</p>
            </div>
            <div className='info'>
                <img src={uvIcon} alt="ultraviolet" className='small-icon'/>
                <p>{item.forecast.current.uv}</p>
            </div>
        </div>
    )
}
