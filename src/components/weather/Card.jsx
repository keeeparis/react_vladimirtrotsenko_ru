import React, { useContext } from 'react'
import windIcon from '../../media/images/wind-solid.svg'
import humidIcon from '../../media/images/drop-line.svg'
import closeIcon from '../../media/images/close-line.svg'
import refreshIcon from '../../media/images/refresh.svg'
import { formatTime } from '../../utils'
import ApiRequest from '../../API/ApiRequest'
import { AuthContext } from '../../context'

export default function Card({city, location, current, remove}) {
    const {cards, setCards} = useContext(AuthContext)

    const removeCard = () => {
        remove(city)
    }

    const refreshData = async () => {
        const response = await ApiRequest.getData({lat: location.lat, lng: location.lon})
        setCards(cards.map(card => card.city === city ? {...card, location: response.location, current: response.current} : card))
    }

    return (
        <div className='card-item'>
            <div className='card-name'>
                <h4>{city}</h4>
            </div>
            <p>{formatTime(location.localtime)}</p>
            <div className='card-temp'>
                <div className='info'>
                    <h2>
                        {current.temp_c}&#8451;
                    </h2>
                    <p>
                        Ощущается как: {current.feelslike_c}&#8451;
                    </p>
                </div>
                <img src={current.condition.icon} alt="weather icon" className='big-icon'/>
            </div>
            <div className='card-details'>
                <div className='info'>
                    <img src={humidIcon} alt="humidity" className='small-icon'/>
                    <p>{current.humidity} %</p>
                </div>
                <div className='info'>
                    <img src={windIcon} alt="wind" className='small-icon'/>
                    <p>{current.wind_kph} км/ч</p>
                </div>
            </div>
            <div className='card-close'>
                <button
                    onClick={refreshData}
                >
                    <img src={refreshIcon} alt="refresh" className='close-icon' />
                </button>
                <button
                    onClick={removeCard}
                >
                    <img src={closeIcon} alt="close" className='close-icon'/>
                </button>
            </div>
        </div>
    )
}
