import React from 'react'
import Navbar from './UI/navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './UI/footer/Footer'

export default function Wrapper() {
    return (
        <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}
