import React, { useContext, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import clx from 'classnames'

import { AuthContext } from '../../context'

import CardHeader from './CardHeader'
import CardDetails from './CardDetails'
import CardContent from './CardContent'
import CardLoader from '../UI/loader/CardLoader'

import { useDictionary } from '../../hooks/dictionary.hook'


export default function Card({ item, index }) {
    const { lang } = useContext(AuthContext)
    const words = useDictionary(lang)

    const [loading, setLoading] = useState(false)
    
    const innerCardClasses = (snapshot) => 
        clx('card', 'card-item', 'light-blue', { 'darken-3': snapshot.isDragging }, { 'darken-2': !snapshot.isDragging })

    return (
        <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided, snapshot) => {
                return (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={{...provided.draggableProps.style}}
                    >
                        <div className={innerCardClasses(snapshot)}>
                            <CardHeader
                                provided={provided}
                                item={item}
                                setLoading={setLoading}
                            />
                            {loading
                            ?   <CardLoader />
                            :   <>
                                    <CardContent item={item} />
                                    <CardDetails item={item} words={words} />
                                </>
                            }
                        </div>
                    </div>
                )
            }}
        </Draggable>
    )
}
