import React, { useContext, useState } from 'react'
import styles from './Navbar.module.scss'
import { AuthContext } from '../../../context'
import { useLocalStorage } from '../../../hooks/localstorage.hook'
import CustomLink from '../customLink/CustomLink'

export default function Navbar() {
    const {lang, setLang} = useContext(AuthContext)
    const [btnClicked, setBtnClicked] = useState(lang==='en'?0:1)

    useLocalStorage('vtru_lang', lang)
    
    return (
        <>
            <div className={styles.navbar}>
                <h1>Vladimir Trotsenko</h1>
                <div className={styles.list}>
                    <CustomLink to='/'>Home</CustomLink>
                    <CustomLink to='weather'>Weather</CustomLink>
                    <CustomLink to='todo'>Todo</CustomLink>
                    <CustomLink to='timeto'>TimeTo</CustomLink>
                </div>
            </div>
            <div className={styles.language}>
                <button onClick={() => { setLang('en'); setBtnClicked(0) }} className={btnClicked===0?styles.active:null}>EN</button>
                <button onClick={() => { setLang('ru'); setBtnClicked(1) }} className={btnClicked===1?styles.active:null}>RU</button>
            </div>
            
        </>
    )
}
