import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import './styles/index.scss'
import 'materialize-css'
import {AuthContext} from './context/index'
import { useEffect, useState } from "react";
import ApiRequest from "./API/ApiRequest";

function App() {
    const [cards, setCards] = useState([])
    const [posts, setPosts] = useState([])
    const [isLoaded, setIsLoaded] = useState(true)
    const [lang, setLang] = useState('')

    useEffect(() => {
        if (localStorage.getItem('vtru_cards')) {
            setCards(JSON.parse(localStorage.getItem('vtru_cards')))
        }
        if (localStorage.getItem('vtru_posts')) {
            setPosts(JSON.parse(localStorage.getItem('vtru_posts')))
        }
        if (localStorage.getItem('vtru_lang')) {
            setLang(JSON.parse(localStorage.getItem('vtru_lang')))
        }
        setIsLoaded(false)
    }, [])

    useState(() => {
        const refreshUponReload = async () => {
            let dataCards = JSON.parse(localStorage?.getItem('vtru_cards'))
            if (!dataCards?.length) return
            
            const refsreshedPosts = await Promise.all(dataCards.map(async post => {
                const response = await ApiRequest.getData({lat: post.location.lat, lng: post.location.lon})
                return {...response, lastUpdated: Date.now(), city: post.city}
            }))
            setCards(refsreshedPosts)
        }
        refreshUponReload()
    }, [])

    return (
        <AuthContext.Provider
            value={{cards, setCards, posts, setPosts, isLoaded, lang, setLang}}
        >
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;