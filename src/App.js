import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import './styles/index.scss'
import 'materialize-css'
import {AuthContext} from './context/index'
import { useEffect, useState } from "react";

function App() {
    const [cards, setCards] = useState([])
    const [isLoaded, setIsLoaded] = useState(true)

    useEffect(() => {
        if (localStorage.getItem('vtru_cards')) {
            setCards(JSON.parse(localStorage.getItem('vtru_cards')))
        }
        setIsLoaded(false)
    }, [])

    return (
        <AuthContext.Provider
            value={{cards, setCards, isLoaded}}
        >
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;

// TODO: добавить разницу часовых поясов
