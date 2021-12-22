import React from 'react'
import {formatTime, timeDifference} from '../../utils'
import ForecastItem from './ForecastItem'

export default function CardContent({words, item, refEl, lang}) {
    return (
        <div className='card-content'>
            <div className='card-name white-text'>
                {item.id.split(', ').map((el, index) => 
                    (index === 0 ) ? <h4 key={index}>{el},</h4> : <h5 key={index+1}>{el}</h5>
                )}
                <p className='black-text'>{words.localTime}{formatTime(item.forecast.location.localtime, lang)}, {timeDifference(item.forecast.location.localtime, item.lastUpdated)}{words.hour}</p>
            </div>
            <div className='card-temp'>
                <div className='info'>
                    <h1> {Math.round(item.forecast.current.temp_c)}&deg; </h1>
                    <div className='max-min'>
                        <div className='max'>
                            <i className='material-icons'>arrow_upward</i>
                            <p>{Math.ceil(item.forecast.forecast.forecastday[0].day.maxtemp_c)}&deg;</p>
                        </div>
                        <div className='min'>
                            <i className='material-icons'>arrow_downward</i>
                            <p>{Math.floor(item.forecast.forecast.forecastday[0].day.mintemp_c)}&deg;</p>
                        </div>
                    </div>
                    <p>{words.feelsLike}{Math.round(item.forecast.current.feelslike_c)}&deg;</p>
                </div>
                <img src={item.forecast.current.condition.icon} alt="weather icon" className='big-icon'/>
            </div>
            <div className='card-forecast'>
                <ul className="collapsible" ref={refEl}>
                    <li>
                        <div className="collapsible-header"><i className="material-icons">filter_drama</i>{words.forecast}</div>
                        <div className="collapsible-body blue lighten-2">
                            <ForecastItem forecast={item.forecast.forecast} localTime={item.forecast.location.localtime} currentTemp={item.forecast.current.temp_c}/>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}
