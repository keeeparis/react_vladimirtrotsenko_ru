import React, { useContext, useEffect, useState } from 'react'

import { AuthContext } from '../context'

import Button from '../components/UI/button/Button'
import Showtime from '../components/timeto/Showtime'

import { useLocalStorage } from '../hooks/localstorage.hook'
import { useDictionary } from '../hooks/dictionary.hook'
import { useMessage } from '../hooks/message.hook'

import { calculateTime } from '../utils'

export default function TimeTo() {
    const {timeto, setTimeto, lang} = useContext(AuthContext)
    const [isFinish, setIsFinish] = useState(true)
    const message = useMessage()
    const words = useDictionary(lang)

    let day, hour, min, sec
    
    const [[d, h, mi, s], setCountdown] = useState([day=0, hour=0, min=0, sec=10])

    const findTimeTo = () => {
        const timeDifference = Date.parse(timeto.event) - Date.now()
        if (timeDifference < 0) {message('<p>Выберите <i>будущую</i> дату</p>'); return}
        
        const timeArray = calculateTime(timeDifference, day, hour, min, sec)
        
        setCountdown(timeArray)
        setIsFinish(false)
    }

    const tick = () => {
        if (d === 0 && h === 0 && mi === 0 && s === 0) {
            message('<p>Время пришло!!!!!</p>')
            setIsFinish(true)
        } else if (h === 0 && mi === 0 && s === 0) {
            setCountdown([d-1, 23, 59, 59]);
        } else if (mi === 0 && s === 0) {
            setCountdown([d, h - 1, 59, 59]);
        } else if (s === 0) {
            setCountdown([d, h, mi - 1, 59]);
        } else {
            setCountdown([d, h, mi, s - 1]);
        }
    }

    useEffect(() => {
        let timerId
        if (isFinish) {
            clearInterval(timerId)
        } else {
            timerId = setInterval(() => tick(), 1000)
        }
        return () => clearInterval(timerId)
    })

    useLocalStorage('vtru_timeto', timeto)

    return (
        <div className='content'>
            <Showtime 
                d={d} h={h} mi={mi} s={s}
                words={words}
            />
            <input 
                type="datetime-local"
                value={timeto.event} 
                onChange={(e) => {setTimeto({...timeto, event: e.target.value})}}
                className='showtime-input'
                min={new Date().toISOString().slice(0, 16)}
            />
            <Button onClick={findTimeTo} style={{fontFamily: 'Poiret One'}}> {words.calculate} </Button>
        </div>
    )
}
