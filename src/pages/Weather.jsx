import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext } from 'react-beautiful-dnd'

import Form from '../components/weather/Form'
import List from '../components/weather/List'
import Helper from '../components/weather/Helper'

import { useMessage } from '../hooks/message.hook'

import { getCards, getError, getStatus, handleDragEnd } from '../features/weather-cards/cardsSlice'
import onDragEnd from '../utils/onDragEnd'

export default function Weather() {
    const message = useMessage()

    const cards = useSelector(getCards)
    const status = useSelector(getStatus)
    const error = useSelector(getError)

    const dispatch = useDispatch()

    useEffect(() => {
        message(error)
    }, [error, message])

    return (
        <div className='content'>
            <h2 className='title'>Weather App</h2>
            <Form status={status}/>
            <div className='city-list'>
                <DragDropContext
                    onDragEnd={(result) => onDragEnd(result, cards, dispatch, handleDragEnd)}
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
