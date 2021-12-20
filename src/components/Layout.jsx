import React from 'react'
import { Outlet } from 'react-router-dom'

import Navbar from './UI/navbar/Navbar'
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
