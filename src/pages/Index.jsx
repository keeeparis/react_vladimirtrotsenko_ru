import React, { useContext } from 'react'
import {useDictionary} from '../hooks/dictionary.hook'
import mainImage from '../media/images/main.jpg'
import {AuthContext} from '../context/index'

export default function Index() {
    const {lang} = useContext(AuthContext)
    const words = useDictionary(lang)

    return (
        <div className='content'>
            <h2>{words.welcome}!</h2>
            <div className='main'>
                <img src={mainImage} alt="" />
                <div className='text'>
                    Меня зовут Владимир. Я такой-такой. Я такой-такой. Я такой-такой. Я такой-такой. Я такой-такой. Я такой-такой. Я такой-такой.
                    А еще я какой-какой-то. А еще я какой-какой-то. А еще я какой-какой-то. А еще я какой-какой-то. А еще я какой-какой-то. 
                    А еще я какой-какой-то. А еще я какой-какой-то. А еще я какой-какой-то. А еще я какой-какой-то. А еще я какой-какой-то. 
                </div>
            </div>
        </div>
    )
}
