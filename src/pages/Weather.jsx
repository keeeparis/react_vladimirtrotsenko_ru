import React, { useContext, useEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'

import { AuthContext } from '../context'

import ApiRequest from '../API/ApiRequest'

import Form from '../components/weather/Form'
import List from '../components/weather/List'

import { useMessage } from '../hooks/message.hook'
import { useLocalStorage } from '../hooks/localstorage.hook'
import { useDictionary } from '../hooks/dictionary.hook'
import { useFetching } from '../hooks/fetching.hook'

import infoIcon from '../media/images/info.png'

export default function Weather() {
    const {cards, setCards, lang} = useContext(AuthContext)

    const [city, setCity] = useState('')
    const [labelForSelect, setLabelForSelect] = useState('')

    const {request, isLoading, isError, setIsError} = useFetching()
    const message = useMessage()
    const words = useDictionary(lang)

    const submitForm = async (e) => {
        e.preventDefault()
        try {
            if (!city.length) { throw new Error(words.errorNoSelectCity) }

            const coords = await request(() => ApiRequest.getCoords(city))
            const data = await request(() => ApiRequest.getData(coords))

            const isInCards = cards.city.items.filter(e => e.location.lat === data.location.lat && e.location.lon === data.location.lon)
            if (!!isInCards.length) { throw new Error(words.errorAlreadyInList) }

            const newCity = {city: city, location: data.location, current: data.current, lastUpdated: Date.now(), forecast: data.forecast, id: Date.now().toString()}
            const cityColumn = {...cards.city}
            const cityItems = cityColumn.items
            cityItems.splice(cityItems?.length, 0, newCity)
            
            setCards({...cards, city: cityColumn})
        } catch (e) {
            setIsError(e.message)
        } finally {
            setCity('')
            setLabelForSelect('')
        }
    }

    const onDragEnd = (result, columns, setColumns) => {
        if (!result.destination) return

        const { source, destination } = result

        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId]
            const destColumn = columns[destination.droppableId]
            const sourceItems = [...sourceColumn.items]
            const destItems = [...destColumn.items]
    
            const [removed] = sourceItems.splice(source.index, 1)
            destItems.splice(destination.index, 0, removed)
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn, 
                    items: destItems
                }
            })
        } else {
            const column = columns[source.droppableId]
            const copiedItems = [...column.items]
            const [removed] = copiedItems.splice(source.index, 1)
            copiedItems.splice(destination.index, 0, removed)
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems
                }
            })
        }
    }

    useEffect(() => {
        message(isError)
    }, [isError, message])

    useLocalStorage('vtru_cards', cards)

    return (
        <div className='content'>
            <h2 className='title'>Weather App</h2>
            <Form submitForm={submitForm} setCity={setCity} label={labelForSelect} setLabel={setLabelForSelect} isLoading={isLoading}/>
            <div className='city-list'>
                <DragDropContext
                    onDragEnd={(result) => onDragEnd(result, cards, setCards)}
                >
                    {Object.entries(cards).map(([columnId, column], index) => 
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
