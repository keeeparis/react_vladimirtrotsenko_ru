import React from 'react'
import Navbar from './UI/navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './UI/footer/Footer'

export default function Wrapper() {
    return (
        <div className='layout'>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}
