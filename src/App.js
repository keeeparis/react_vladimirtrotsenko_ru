import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import './styles/index.scss'
import 'materialize-css'
import {AuthContext} from './context/index'
import { useEffect, useState } from "react";

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