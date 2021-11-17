import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import './styles/index.scss'
import 'materialize-css'
import AuthProvider from "./components/AuthProvider";

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