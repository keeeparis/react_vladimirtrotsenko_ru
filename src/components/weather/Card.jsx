import React, { useContext, useEffect, useMemo, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Draggable } from 'react-beautiful-dnd'

import ApiRequest from '../../API/ApiRequest'
import { AuthContext } from '../../context'

import { useDictionary } from '../../hooks/dictionary.hook'
import { useFetching } from '../../hooks/fetching.hook'
import { useMessage } from '../../hooks/message.hook'

import CardHeader from './CardHeader'
import CardDetails from './CardDetails'
import CardContent from './CardContent'
import CardLoader from '../UI/loader/CardLoader'
import { refreshCard } from '../../features/weather-cards/cardsSlice'

export default function Card({item, index, removeCard}) {
    const {lang} = useContext(AuthContext)
    const words = useDictionary(lang)
    const {isLoading, isError} = useFetching()
    const message = useMessage()

    const dispatch = useDispatch()

    const isDayOrNightClasses = useMemo(() => {
        return item.forecast.current.is_day ? 'light-blue lighten-3' : 'blue darken-4 white-text'
    }, [item])

    const refreshData = () => {
        dispatch(refreshCard(item))
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
