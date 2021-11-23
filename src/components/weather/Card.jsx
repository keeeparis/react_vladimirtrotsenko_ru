import React, { useContext, useEffect, useMemo, useRef } from 'react'
import ApiRequest from '../../API/ApiRequest'
import { AuthContext } from '../../context'
import { useDictionary } from '../../hooks/dictionary.hook'
import { useFetching } from '../../hooks/fetching.hook'
import { Draggable } from 'react-beautiful-dnd'
import CardHeader from './CardHeader'
import CardDetails from './CardDetails'
import CardContent from './CardContent'
import CardLoader from '../UI/loader/CardLoader'
import { useMessage } from '../../hooks/message.hook'

export default function Card({item, index, removeCard}) {
    const {cards, setCards, lang} = useContext(AuthContext)
    const {request, isLoading, isError} = useFetching()
    const message = useMessage()
    const words = useDictionary(lang)

    const isDayOrNightClasses = useMemo(() => {
        return item.current.is_day ? 'light-blue lighten-3' : 'blue darken-4 white-text'
    }, [item])

    // By default, using current API, it restricts to update more than one time in 180sec.
    const refreshData = async () => {
        try {
            const response = await request(() => ApiRequest.getData({lat: item.location.lat, lng: item.location.lon}))
            const newColumn = {...cards.city}
            const newList = newColumn.items
            const finishList = newList.map(card => card.city === item.city ? {...card, location: response.location, current: response.current, lastUpdated: Date.now(), forecast: response.forecast} : card)
            setCards({...cards, city: {...newColumn, items: finishList}})
        } catch (e) {}
    }

    const refEl = useRef(null)
    
    useEffect(() => {
        window.M.Collapsible.init(refEl.current)
    })

    useEffect(() => {
        message(isError)
    }, [isError, message])

    return (
        <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided, snapshot) => {
                return (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        
                        style={{...provided.draggableProps.style}}
                    >
                        <div className={'card card-item light-blue '.concat(snapshot.isDragging ? 'darken-3': 'darken-2')}>
                            <CardHeader 
                                removeCard={removeCard}
                                refreshData={refreshData}
                                provided={provided}
                                index={index}
                            />
                            {isLoading
                            ?   <CardLoader />
                            :   <>
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
                                </>
                            }
                        </div>
                    </div>
                )
            }}
        </Draggable>
    )
}
