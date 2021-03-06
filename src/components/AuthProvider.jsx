import React, { useState, useEffect } from 'react'
import { AuthContext } from '../context'
// import Cookies from 'universal-cookie'

export default function AuthProvider({children}) {
    /* TODO: убрать timeto state */
    const [timeto, setTimeto] = useState({
        event: '2023-01-01T00:00'
    })
    const [tasks, setTasks] = useState({
        toDo: {
            name: { en: 'To do', ru: 'Задачи' },
            items: [{id: '1', content: 'Погулять с собакой'}],
            colorColumn: '#FBF1DA',
            colorTask: '#374167',
            defaultColorColumn: '#FBF1DA',
            defaultColorTask: '#374167'
        },
        inProgress: {
            name: { en: 'In progress', ru: 'В процессе' },
            items: [{id: '3', content: 'Do housework'}],
            colorColumn: '#FBF1DA',
            colorTask: '#6b016b',
            defaultColorColumn: '#FBF1DA',
            defaultColorTask: '#6b016b'
        },
        Done: {
            name: { en: 'Done', ru: 'Выполнено' },
            items: [{id: '2', content: 'Сходить в кино'}],
            colorColumn: '#FBF1DA',
            colorTask: '#00c26e',
            defaultColorColumn: '#FBF1DA',
            defaultColorTask: '#00c26e'
        }
    })
    const [isLoaded, setIsLoaded] = useState(true)
    const [lang, setLang] = useState(navigator.language.substr(0, 2) || navigator.userLanguage.substr(0, 2) || '')

    useEffect(() => {
        // if (localStorage.getItem('vtru_cards')) {
        //     setCards(JSON.parse(localStorage.getItem('vtru_cards')))
        // }
        // saving task items and color preferences
        if (localStorage.getItem('vtru_tasks')) {
            const t = JSON.parse(localStorage.getItem('vtru_tasks'))
            let saved_t = {...tasks}
            for (let col in t) {
                const saveItems = t[col]['items']
                const savecolorColumn = t[col]['colorColumn']
                const savecolorTask = t[col]['colorTask']
                saved_t = {...saved_t, [col]: {...tasks[col], items: saveItems, colorColumn: savecolorColumn, colorTask: savecolorTask}}
            }
            setTasks(saved_t)
        }
        if (localStorage.getItem('vtru_lang')) {
            setLang(JSON.parse(localStorage.getItem('vtru_lang')))
        }
        /* TODO: убрать */
        if (localStorage.getItem('vtru_timeto')) {
            setTimeto(JSON.parse(localStorage.getItem('vtru_timeto')))
        }
        setIsLoaded(false)
        // eslint-disable-next-line
    }, [])

    // useState(() => {
    //     const refreshUponReload = async () => {
    //         const data = JSON.parse(localStorage.getItem('vtru_cards'))
    //         if (!data?.city.items.length) return
            
    //         const cityColumn = {...data.city}
    //         const cityList = cityColumn.items

    //         const refsreshedCards = await Promise.all(cityList.map(async card => {
    //             const response = await ApiRequest.getData({lat: card.location.lat, lng: card.location.lon})
    //             return {...response, lastUpdated: Date.now(), city: card.city, id: Date.now().toString()}
    //         }))
    //         setCards({...data, city: {...cityColumn, items: refsreshedCards}})
    //     }
    //     refreshUponReload()
    // }, [])

    return (
        <AuthContext.Provider /* TODO: убрать переменные timeto and settimeto */
            value={{tasks, setTasks, isLoaded, lang, setLang, timeto, setTimeto}}
        >
            {children}
        </AuthContext.Provider>
    )
}
