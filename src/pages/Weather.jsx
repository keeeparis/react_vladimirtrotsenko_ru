import React, { useContext, useEffect, useState } from 'react'
import ApiRequest from '../API/ApiRequest'
import Form from '../components/weather/Form'
import List from '../components/weather/List'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context'
import { useLocalStorage } from '../hooks/localstorage.hook'

export default function Weather() {
    const [city, setCity] = useState('')
    const {cards, setCards} = useContext(AuthContext)
    const [suggestions, setSuggestions] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const message = useMessage()

    const submitForm = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)

            if (!city.length) { throw new Error('Вы не ввели город...') }

            const coords = await ApiRequest.getCoords(city)
            const data = await ApiRequest.getData(coords)

            const isInCards = cards.filter(e => e.location.lat === data.location.lat && e.location.lon === data.location.lon)
            if (!!isInCards.length) { throw new Error('Город уже в списке') }

            setCards([...cards, {city: city, location: data.location, current: data.current}])
        } catch (e) {
            setError(e.message)
        } finally {
            setIsLoading(false)
            setCity('')
        }
    }

    const remove = (cardCity) => {
        setCards(cards.filter(e => e.city !== cardCity))
    }

    useEffect(() => {
        message(error)
        setError(null)
    }, [error, setError, message])

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const result = await ApiRequest.getSuggestions(city)
                setSuggestions(result.suggestions)
            } catch (e) {
                setError(e.message)
            }
        }
        fetchSuggestions()
    }, [city])

    useLocalStorage(cards)

    return (
        <div className='content'>
            <h2>Weather JSX</h2>
            <Form submitForm={submitForm} city={city} setCity={setCity} suggestions={suggestions} isLoading={isLoading}/>
            <List cards={cards} remove={remove} />
        </div>
    )
}
