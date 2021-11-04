import React, { useEffect, useMemo, useState } from 'react'
import ApiRequest from '../API/ApiRequest'
import Form from '../components/weather/Form'
import List from '../components/weather/List'
import Loader from '../components/loader/Loader'
import {useMessage} from '../hooks/message.hook'

export default function Weather() {
    const [city, setCity] = useState('')
    const [cards, setCards] = useState([])
    const [suggestions, setSuggestions] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const message = useMessage()

    const submitForm = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const coords = await ApiRequest.getCoords(city)
            const data = await ApiRequest.getData(coords)
            const isInCards = cards.filter(e => e.lat === data.location.lat && e.lon === data.location.lon)

            if (!!isInCards.length) {
                setError('Город уже в списке')
                return
            }

            setCards([...cards, {city: city, location: data.location, current: data.current}])

        } catch (e) {
            setError(e.message)
        } finally {
            setIsLoading(false)
        }
    }

    const remove = (cardCity) => {
        setCards(cards.filter(e => e.city !== cardCity))
    }

    useEffect(() => {
        message(error)
        setError(null)
    }, [error, setError, message])

    useMemo(async () => {
        try {
            const result = await ApiRequest.getSuggestions(city)
            setSuggestions(result.suggestions)
        } catch (e) {
            setError(e.message)
        }
    }, [city])

    return (
        <div className='content'>
            <h2>Weather JSX</h2>
            {isLoading && <Loader />}
            <Form submitForm={submitForm} city={city} setCity={setCity} suggestions={suggestions}/>
            <List cards={cards} remove={remove} />
        </div>
    )
}
