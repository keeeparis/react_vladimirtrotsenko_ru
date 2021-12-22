import React, { useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext } from 'react-beautiful-dnd'

import { AuthContext } from '../context'

import Form from '../components/weather/Form'
import List from '../components/weather/List'

import { useMessage } from '../hooks/message.hook'
import { useDictionary } from '../hooks/dictionary.hook'

import infoIcon from '../media/images/info.png'
import { getError, getStatus, handleDragEnd } from '../features/weather-cards/cardsSlice'

export default function Weather() {
    const { lang } = useContext(AuthContext)
    const words = useDictionary(lang)

    const message = useMessage()

    const cards = useSelector(state => state.weather.cards)
    const loading = useSelector(getStatus)
    const error = useSelector(getError)

    const dispatch = useDispatch()

    const onDragEnd = (result, columns) => {
        if (!result.destination) return

        const { source, destination } = result

        console.log(source)
        console.log(destination)

        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId]
            const destColumn = columns[destination.droppableId]
            const sourceItems = [...sourceColumn.items]
            const destItems = [...destColumn.items]
    
            const [removed] = sourceItems.splice(source.index, 1)
            destItems.splice(destination.index, 0, removed)
            dispatch(handleDragEnd({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn, 
                    items: destItems
                }
            }))
        } else {
            const column = columns[source.droppableId]
            console.log(column)
            // Object.values(column.entities)
            // const copiedItems = [...column.items]
            // const [removed] = copiedItems.splice(source.index, 1)
            // copiedItems.splice(destination.index, 0, removed)
            // dispatch(handleDragEnd({
            //     ...columns,
            //     [source.droppableId]: {
            //         ...column,
            //         items: copiedItems
            //     }
            // }))
        }
    }

    useEffect(() => {
        message(error)
    }, [error, message])

    return (
        <div className='content'>
            <h2 className='title'>Weather App</h2>
            <Form isLoading={loading}/>
            <div className='city-list'>
                <DragDropContext
                    onDragEnd={(result) => onDragEnd(result, cards)}
                >
                    {Object.entries(cards).map(([ columnId, column ], index) => 
                        <List key={columnId} column={column} columnId={columnId} />
                    )}
                </DragDropContext>
            </div>
            <div className='helper'>
                <img src={infoIcon} alt="Info" />
                <div>{words.helperWeather}</div>
            </div>
        </div>
    )
}
