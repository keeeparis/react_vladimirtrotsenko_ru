import React, { useState, useEffect } from 'react'
import { AuthContext } from '../context'
import ApiRequest from '../API/ApiRequest'

export default function AuthProvider({children}) {
    const [cards, setCards] = useState({
        city: {
            name: 'Weather',
            items: []
        }
    })
    const [tasks, setTasks] = useState({
        toDo: {
            name: { en: 'To do', ru: 'Задачи' },
            items: []
        },
        inProgress: {
            name: { en: 'In progress', ru: 'В процессе' },
            items: []
        },
        Done: {
            name: { en: 'Done', ru: 'Выполнено' },
            items: []
        }
    })
    const [isLoaded, setIsLoaded] = useState(true)
    const [lang, setLang] = useState('')

    useEffect(() => {
        if (localStorage.getItem('vtru_cards')) {
            setCards(JSON.parse(localStorage.getItem('vtru_cards')))
        }
        if (localStorage.getItem('vtru_tasks')) {
            setTasks(JSON.parse(localStorage.getItem('vtru_tasks')))
        }
        if (localStorage.getItem('vtru_lang')) {
            setLang(JSON.parse(localStorage.getItem('vtru_lang')))
        }
        setIsLoaded(false)
    }, [])

    useState(() => {
        const refreshUponReload = async () => {
            const data = JSON.parse(localStorage.getItem('vtru_cards'))
            if (!data?.city.items.length) return
            
            const cityColumn = {...data.city}
            const cityList = cityColumn.items

            const refsreshedCards = await Promise.all(cityList.map(async card => {
                const response = await ApiRequest.getData({lat: card.location.lat, lng: card.location.lon})
                return {...response, lastUpdated: Date.now(), city: card.city, id: Date.now().toString()}
            }))
            setCards({...data, city: {...cityColumn, items: refsreshedCards}})
        }
        refreshUponReload()
    }, [])

    return (
        <AuthContext.Provider value={{cards, setCards, tasks, setTasks, isLoaded, lang, setLang}}>
            {children}
        </AuthContext.Provider>
    )
}
