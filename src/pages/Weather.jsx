import React, { useContext, useEffect, useState } from 'react'
import ApiRequest from '../API/ApiRequest'
import Form from '../components/weather/Form'
import List from '../components/weather/List'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context'
import { useLocalStorage } from '../hooks/localstorage.hook'
import { useDictionary } from '../utils/dictionary'

export default function Weather() {
    const {cards, setCards, lang} = useContext(AuthContext)
    const [city, setCity] = useState('')
    const [labelForSelect, setLabelForSelect] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const message = useMessage()
    const words = useDictionary(lang)

    const submitForm = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)

            if (!city.length) { throw new Error(words.errorNoSelectCity) }

            const coords = await ApiRequest.getCoords(city)
            const data = await ApiRequest.getData(coords)

            const isInCards = cards.filter(e => e.location.lat === data.location.lat && e.location.lon === data.location.lon)
            if (!!isInCards.length) { throw new Error(words.errorAlreadyInList) }

            setCards([...cards, {city: city, location: data.location, current: data.current, lastUpdated: Date.now()}])
        } catch (e) {
            setError(e.message)
        } finally {
            setIsLoading(false)
            setCity('')
            setLabelForSelect('')
        }
    }

    const remove = (cardCity) => {
        setCards(cards.filter(e => e.city !== cardCity))
    }

    useEffect(() => {
        message(error)
        setError(null)
    }, [error, setError, message])

    useLocalStorage('vtru_cards', cards)

    return (
        <div className='content'>
            <h2>Weather JSX</h2>
            <Form submitForm={submitForm} setCity={setCity} label={labelForSelect} setLabel={setLabelForSelect} isLoading={isLoading}/>
            <List cards={cards} remove={remove} />
        </div>
    )
}
