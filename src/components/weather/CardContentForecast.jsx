import React from 'react'
import { useContext } from 'react'

import ForecastItem from './ForecastItem'

import { AuthContext } from '../../context'
import { useDictionary } from '../../hooks/dictionary.hook'

export default function CardContentForecast({ item, refEl }) {
    const { lang } = useContext(AuthContext)
    const words = useDictionary(lang)

    return (
        <div className='card-forecast'>
            <ul className="collapsible" ref={refEl}>
                <li>
                    <div className="collapsible-header">
                        <i className="material-icons">filter_drama</i>
                        {words.forecast}
                    </div>
                    <div className="collapsible-body blue lighten-2">
                        <ForecastItem 
                            forecast={item.forecast.forecast} 
                            localTime={item.forecast.location.localtime} 
                            currentTemp={item.forecast.current.temp_c}
                        />
                    </div>
                </li>
            </ul>
        </div>
    )
}
