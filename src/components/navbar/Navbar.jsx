import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import styles from './Navbar.module.scss'

export default function Navbar() {
    return (
        <>
            <div className={styles.navbar}>
                <h1>Vladimir Trotsenko</h1>
                <div className={styles.list}>
                    <Link to='/'>Home</Link> | {' '}
                    <Link to='weather'>Weather</Link> | {' '}
                    <Link to='todo'>Todo</Link>
                </div>
            </div>
            <Outlet />
        </>
    )
}
