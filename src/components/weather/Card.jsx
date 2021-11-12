import React, { useContext, useEffect, useMemo, useRef } from 'react'
import windIcon from '../../media/images/wind-solid.svg'
import humidIcon from '../../media/images/drop-line.svg'
import closeIcon from '../../media/images/close-line.svg'
import refreshIcon from '../../media/images/refresh.svg'
import Button from '../UI/button/Button'
import { formatTime, timeDifference } from '../../utils'
import ApiRequest from '../../API/ApiRequest'
import { AuthContext } from '../../context'
import { useDictionary } from '../../hooks/dictionary.hook'
import ForecastItem from './ForecastItem'

export default function Card({city, location, current, forecast, lastUpdated, remove}) {
    const {cards, setCards, lang} = useContext(AuthContext)
    const words = useDictionary(lang)

    const isDayOrNightClasses = useMemo(() => {
        return current.is_day ? 'blue-grey lighten-2' : 'blue-grey darken-3 white-text'
    }, [current.is_day])

    const removeCard = () => {
        remove(city)
    }

    // By default, using current API, it restricts to update more than one time in 180sec.
    const refreshData = async () => {
        const response = await ApiRequest.getData({lat: location.lat, lng: location.lon})
        setCards(cards.map(card => card.city === city ? {...card, location: response.location, current: response.current, lastUpdated: Date.now(), forecast: response.forecast} : card))
    }

    const refEl = useRef(null)

    useEffect(() => {
        window.M.Collapsible.init(refEl.current)
    })

    return (
        <div className='card card-item blue-grey darken-1'>
            <div className='card-content'>
                <div className='card-name white-text'>
                    {city.split(', ').map((el, index) => 
                        (index === 0 ) ? <h4 key={index}>{el},</h4> : <h5 key={index+1}>{el}</h5>
                    )}
                    <p className='black-text'>{words.localTime}{formatTime(location.localtime, lang)}, {timeDifference(location.localtime, lastUpdated)}{words.hour}</p>
                </div>
                <div className='card-temp'>
                    <div className='info'>
                        <h2>
                            {Math.round(current.temp_c)}&#8451;
                        </h2>
                        <p>{words.feelsLike}{Math.round(current.feelslike_c)}&#8451;</p>
                    </div>
                    <img src={current.condition.icon} alt="weather icon" className='big-icon'/>
                </div>
                <div className='card-forecast'>
                    <ul className="collapsible" ref={refEl}>
                        <li>
                            <div className="collapsible-header"><i className="material-icons">filter_drama</i>{words.forecast}</div>
                            <div className="collapsible-body blue-grey lighten-1"><ForecastItem forecast={forecast} localTime={location.localtime}/></div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={'card-details card-action '.concat(isDayOrNightClasses)}>
                <div className='info'>
                    <i className='material-icons'>arrow_upward</i>
                    <p>{Math.ceil(forecast.forecastday[0].day.maxtemp_c)}&#8451;</p>
                </div>
                <div className='info'>
                    <i className='material-icons'>arrow_downward</i>
                    <p>{Math.floor(forecast.forecastday[0].day.mintemp_c)}&#8451;</p>
                </div>
                <div className='info'>
                    <img src={humidIcon} alt="humidity" className='small-icon'/>
                    <p>{current.humidity}%</p>
                </div>
                <div className='info'>
                    <img src={windIcon} alt="wind" className='small-icon'/>
                    <p>{Math.round(current.wind_kph)} {words.kph}</p>
                </div>
            </div>
            <div className='card-close'>
                <Button
                    onClick={refreshData}
                    btn={false}
                    color={['btn-flat', 'waves-green']}
                >
                    <img src={refreshIcon} alt="refresh" className='close-icon' />
                </Button>
                <Button
                    onClick={removeCard}
                    btn={false}
                    color={['btn-flat', 'waves-red']}
                >
                    <img src={closeIcon} alt="close" className='close-icon'/>
                </Button>
            </div>
        </div>
    )
}