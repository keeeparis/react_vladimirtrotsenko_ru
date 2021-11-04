import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import './styles/index.scss'
import 'materialize-css'

function App() {
    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    );
}

export default App;
