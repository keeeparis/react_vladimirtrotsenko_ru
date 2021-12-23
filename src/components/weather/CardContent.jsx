import { useRef, useEffect } from 'react'
import CardContentForecast from './CardContentForecast'

import CardContentName from './CardContentName'
import CardContentTemp from './CardContentTemp'

export default function CardContent({ item }) {
    const refEl = useRef(null)
    
    useEffect(() => {
        window.M.Collapsible.init(refEl.current)
    })

    return (
        <div className='card-content'>
            <CardContentName item={item}/>
            <CardContentTemp item={item} />
            <CardContentForecast item={item} refEl={refEl} />            
        </div>
    )
}
