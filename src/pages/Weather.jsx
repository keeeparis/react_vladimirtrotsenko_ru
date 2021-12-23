import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext } from 'react-beautiful-dnd'

import Form from '../components/weather/Form'
import List from '../components/weather/List'
import Helper from '../components/weather/Helper'

import { useMessage } from '../hooks/message.hook'

import { getCards, getError, getStatus, handleDragEnd } from '../features/weather-cards/cardsSlice'

export default function Weather() {
    const message = useMessage()

    const cards = useSelector(getCards)
    const loading = useSelector(getStatus)
    const error = useSelector(getError)

    const dispatch = useDispatch()

    // TODO: вынести функцию, так как она повторно используется в todo компоненте
    // третьим аргументом передать dispatch функцию(-и)?
    const onDragEnd = (result, columns) => {
        if (!result.destination) return

        const { source, destination } = result

        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId]
            const destColumn = columns[destination.droppableId]
            const sourceItems = [...Object.values(sourceColumn.entities)]
            const destItems = [...Object.values(destColumn.entities)]
    
            const [removed] = sourceItems.splice(source.index, 1)
            destItems.splice(destination.index, 0, removed)
            // TODO:
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
            const copiedItems = [...Object.values(column.entities)]
            const [removed] = copiedItems.splice(source.index, 1)
            copiedItems.splice(destination.index, 0, removed)

            dispatch(handleDragEnd(copiedItems))
        }
    }

    useEffect(() => {
        message(error)
    }, [error, message])

    return (
        <div className='content'>
            <h2 className='title'>Weather App</h2>
            <Form state={loading}/>
            <div className='city-list'>
                <DragDropContext
                    onDragEnd={(result) => onDragEnd(result, cards)}
                >
                    {Object.entries(cards).map(([ columnId, column ], index) => 
                        <List key={columnId} column={column} columnId={columnId} />
                    )}
                </DragDropContext>
            </div>
            <Helper/>
        </div>
    )
}
