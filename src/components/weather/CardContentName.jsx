import { useContext } from 'react'
import { format, formatDistanceStrict } from 'date-fns'
import { ru, enUS } from 'date-fns/locale'

import { AuthContext } from '../../context'
import { useDictionary } from '../../hooks/dictionary.hook'

export default function CardContentName({ item }) {
    const { lang } = useContext(AuthContext)
    const words = useDictionary(lang)

    const countryName = item.id
        .split(', ')
        .map((el, ind) => 
            (ind === 0) 
                ? <h4 key={ind}>{el},</h4> 
                : <h5 key={ind}>{el}</h5>
        )
    
    const distOptions = {
        unit: 'hour',
        locale: (lang === 'ru') ? ru : enUS
    }

    return (
        <div className='card-name white-text'>
            {countryName}
            <p className='black-text'>
                {words.localTime}
                {format(new Date(item.forecast.location.localtime), 'HH:mm')},&nbsp;
                {formatDistanceStrict(
                    new Date(item.forecast.location.localtime), 
                    new Date(item.lastUpdated), 
                    distOptions
                )}
            </p>
        </div>
    )
}
