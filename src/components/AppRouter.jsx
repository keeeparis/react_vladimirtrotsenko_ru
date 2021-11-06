import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './UI/navbar/Navbar'
import Weather from '../pages/Weather'
import Todo from '../pages/Todo'
import Index from '../pages/Index'
import { AuthContext } from '../context'
import Loader from './UI/loader/Loader'

export default function AppRouter() {
    const {isLoaded} = useContext(AuthContext)

    if (isLoaded) {
        return (
            <Loader />
        )
    }
    
    return (
        <Routes>
            <Route path='/' element={<Navbar />} >
                <Route index element={<Index />}/>
                <Route path='weather' element={<Weather />} />
                <Route path='todo' element={<Todo />} />
            </Route>
        </Routes>
    )
}
