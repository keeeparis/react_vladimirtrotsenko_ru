import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.scss'
import Button from '../button/Button'
import { AuthContext } from '../../../context'
import { useLocalStorage } from '../../../hooks/localstorage.hook'

export default function Navbar() {
    const {lang, setLang} = useContext(AuthContext)

    useLocalStorage('vtru_lang', lang)
    
    return (
        <>
            <div className={styles.navbar}>
                <h1>Vladimir Trotsenko</h1>
                <div className={styles.list}>
                    <Link to='/'>Home</Link> | {' '}
                    <Link to='weather'>Weather</Link> | {' '}
                    <Link to='todo'>Todo</Link> | {' '}
                    <Link to='timeto'>TimeTo</Link> 
                </div>
            </div>
            <div className={styles.language}>
                <Button onClick={() => setLang('en')}>EN</Button>
                <Button onClick={() => setLang('ru')}>RU</Button>
            </div>
        </>
    )
}
