import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './navbar/Navbar'
import Weather from '../pages/Weather'
import Todo from '../pages/Todo'
import Index from '../pages/Index'

export default function AppRouter() {
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
