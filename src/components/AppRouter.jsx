import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'

import Weather from '../pages/Weather'
import Todo from '../pages/Todo'
import Index from '../pages/Index'
import TimeTo from '../pages/TimeTo'
import Layout from './Layout'

import { AuthContext } from '../context'
import CardLoader from './UI/loader/CardLoader'

export default function AppRouter() {
    const {isLoaded} = useContext(AuthContext)

    return (isLoaded) 
    ?   <CardLoader /> 
    :   <Routes>
            <Route path='/' element={<Layout />} >
                <Route index element={<Index />} />
                <Route path='weather' element={<Weather />} />
                <Route path='todo' element={<Todo />} />
                <Route path='timeto' element={<TimeTo/>} />
            </Route>
        </Routes>
}
