import React, { useContext, useMemo } from 'react'
import windIcon from '../../media/images/wind-solid.svg'
import humidIcon from '../../media/images/drop-line.svg'
import closeIcon from '../../media/images/close-line.svg'
import refreshIcon from '../../media/images/refresh.svg'
import Button from '../UI/button/Button'
import { formatTime, timeDifference } from '../../utils'
import ApiRequest from '../../API/ApiRequest'
import { AuthContext } from '../../context'
import { useDictionary } from '../../utils/dictionary'

export default function Card({city, location, current, lastUpdated, remove}) {
    const {cards, setCards, lang} = useContext(AuthContext)
    const words = useDictionary(lang)

    const isDayOrNightClasses = useMemo(() => {
        return current.is_day ? 'blue-grey lighten-1' : 'blue-grey darken-2 white-text'
    }, [current.is_day])

    const removeCard = () => {
        remove(city)
    }

    // By default, using current API, it restricts to update more than one time in 180sec.
    const refreshData = async () => {
        const response = await ApiRequest.getData({lat: location.lat, lng: location.lon})
        setCards(cards.map(card => card.city === city ? {...card, location: response.location, current: response.current, lastUpdated: Date.now()} : card))
    }

    return (
        <div className='card card-item blue-grey darken-1'>
            <div className='card-content'>
                <div className='card-name white-text'>
                    {city.split(', ').map((el, index) => 
                        (index === 0 ) ? <h4 key={el}>{el},</h4> : <h5 key={el}>{el}</h5>
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
            </div>
            <div className={'card-details card-action '.concat(isDayOrNightClasses)}>
                <div className='info'>
                    <img src={humidIcon} alt="humidity" className='small-icon'/>
                    <p>{current.humidity} %</p>
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
                    style={{padding: 5}}
                >
                    <img src={refreshIcon} alt="refresh" className='close-icon' />
                </Button>
                <Button
                    onClick={removeCard}
                    btn={false}
                    color={['btn-flat', 'waves-red']}
                    style={{padding: 5}}
                >
                    <img src={closeIcon} alt="close" className='close-icon'/>
                </Button>
            </div>
        </div>
    )
}
