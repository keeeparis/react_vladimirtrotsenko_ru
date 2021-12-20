import { BrowserRouter } from "react-router-dom"

import './styles/index.scss'
import 'materialize-css'

import AppRouter from "./components/AppRouter"
import AuthProvider from "./components/AuthProvider"

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;