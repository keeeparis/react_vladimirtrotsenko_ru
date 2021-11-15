import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import './styles/index.scss'
import 'materialize-css'
import {AuthContext} from './context/index'
import { useEffect, useState } from "react";
import ApiRequest from "./API/ApiRequest";

function App() {
    const [cards, setCards] = useState({
        city: {
            name: 'Weather',
            items: [
                // {id: '1', city: 'Nur-Sultan', location: '', current: '', lastUpdated: '', forecast: ''},
                // {id: '2', city: 'Moscow', location: '', current: '', lastUpdated: '', forecast: ''}
            ]
        }
    })
    const [tasks, setTasks] = useState({
        toDo: {
            name: 'To do',
            items: []
        },
        inProgress: {
            name: 'In progress',
            items: []
        },
        Done: {
            name: 'Done',
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
            const data = JSON.parse(localStorage?.getItem('vtru_cards'))
            if (!data.city.items.length) return
            
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
        <AuthContext.Provider
            value={{cards, setCards, tasks, setTasks, isLoaded, lang, setLang}}
        >
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;