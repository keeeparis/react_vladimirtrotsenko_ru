import React, { useContext, useEffect, useMemo, useRef } from 'react'
import ApiRequest from '../../API/ApiRequest'
import { AuthContext } from '../../context'
import { useDictionary } from '../../hooks/dictionary.hook'
import { Draggable } from 'react-beautiful-dnd'
import CardHeader from './CardHeader'
import CardDetails from './CardDetails'
import CardContent from './CardContent'

export default function Card({item, index, removeCard}) {
    const {cards, setCards, lang} = useContext(AuthContext)
    const words = useDictionary(lang)

    const isDayOrNightClasses = useMemo(() => {
        return item.current.is_day ? 'blue-grey lighten-2' : 'blue-grey darken-3 white-text'
    }, [item])

    // By default, using current API, it restricts to update more than one time in 180sec.
    const refreshData = async () => {
        const response = await ApiRequest.getData({lat: item.location.lat, lng: item.location.lon})
        const newColumn = {...cards.city}
        const newList = newColumn.items
        const finishList = newList.map(card => card.city === item.city ? {...card, location: response.location, current: response.current, lastUpdated: Date.now(), forecast: response.forecast} : card)
        setCards({...cards, city: {...newColumn, items: finishList}})
    }

    const refEl = useRef(null)

    useEffect(() => {
        window.M.Collapsible.init(refEl.current)
    })

    return (
        <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided, snapshot) => {
                return (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        
                        style={{...provided.draggableProps.style}}
                    >
                        <div className={'card card-item blue-grey '.concat(snapshot.isDragging ? 'darken-2': 'darken-1')}>
                            <CardHeader 
                                removeCard={removeCard}
                                refreshData={refreshData}
                                provided={provided}
                                index={index}
                            />
                            <CardContent 
                                item={item}
                                words={words}
                                refEl={refEl}
                                lang={lang}
                            />
                            <CardDetails 
                                className={'card-details card-action '.concat(isDayOrNightClasses)}
                                item={item}
                                words={words}
                            />
                        </div>
                    </div>
                )
            }}
        </Draggable>
    )
}
