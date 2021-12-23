import React from 'react'
import { useContext } from 'react'

import { AuthContext } from '../../context'
import { useDictionary } from '../../hooks/dictionary.hook'

export default function CardContentTemp({ item }) {
    const { lang } = useContext(AuthContext)
    const words = useDictionary(lang)

    return (
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
    )
}
