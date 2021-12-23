import React from 'react'
import { useContext } from 'react'

import { AuthContext } from '../../context'
import { useDictionary } from '../../hooks/dictionary.hook'
import { formatTime, timeDifference } from '../../utils'

export default function CardContentName({ item }) {
    const { lang } = useContext(AuthContext)
    const words = useDictionary(lang)

    return (
        <div className='card-name white-text'>
            {item.id
                .split(', ')
                .map((el, index) => 
                    (index === 0 ) 
                        ? <h4 key={index}>{el},</h4> 
                        : <h5 key={index+1}>{el}</h5>
                )
            }
            <p className='black-text'>
                {words.localTime}{formatTime(item.forecast.location.localtime, lang)}, {timeDifference(item.forecast.location.localtime, item.lastUpdated)}{words.hour}
            </p>
        </div>
    )
}
