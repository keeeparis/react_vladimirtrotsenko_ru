import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context'
import { useLocalStorage } from '../hooks/localstorage.hook'
import { useMessage } from '../hooks/message.hook'

export default function TimeTo() {
    const {timeto, setTimeto} = useContext(AuthContext)
    const [isFinish, setIsFinish] = useState(true)
    const message = useMessage()
    // TODO: Оптимизировать код
    let year, month, day, hour, min, sec
    
    const [[y, mo, d, h, mi, s], setCountdown] = useState([year=0, month=0, day=0, hour=0, min=0, sec=0])

    const findTimeTo = () => {
        const time = Date.parse(timeto.event) - Date.now()

        const yearFind = 12*30*24*60*60*1000
        const monthFind = 30*24*60*60*1000
        const daysFind = 24*60*60*1000
        const hourFind = 60*60*1000
        const minFind = 60*1000
        const secFind = 1000
        
        let remainder = time
        if (remainder < 0) {message('<p>Выберите <i>будущую</i> дату</p>'); return}

        if (time / yearFind > 1) {
            year = Math.floor(time / yearFind)
            remainder = time % yearFind
        }
        if (remainder / monthFind > 1) {
            month = Math.floor(remainder / monthFind)
            remainder = remainder % monthFind
        }
        if (remainder / daysFind > 1) {
            day = Math.floor(remainder / daysFind)
            remainder = remainder % daysFind
        }
        if (remainder / hourFind > 1) {
            hour = Math.floor(remainder / hourFind)
            remainder = remainder % hourFind
        }
        if (remainder / minFind > 1) {
            min = Math.floor(remainder / minFind)
            remainder = remainder % minFind
        }
        if (remainder / secFind > 1) {
            sec = Math.floor(remainder / secFind)
        }
        setCountdown([year, month, day, hour, min, sec])
        setIsFinish(false)
    }

    const tick = () => {
        if (h === 0 && mi === 0 && s === 0) {
            message('<p>Время пришло!!!!!</p>')
            setIsFinish(true)
        } else if (mi === 0 && s === 0) {
            setCountdown([y, mo, d, h - 1, 59, 59]);
        } else if (s === 0) {
            setCountdown([y, mo, d, h, mi - 1, 59]);
        } else {
            setCountdown([y, mo, d, h, mi, s - 1]);
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
            <input type="datetime-local"
                value={timeto.event} 
                onChange={(e) => {setTimeto({...timeto, event: e.target.value})}}
                style={{width: '50%'}}
                min={new Date().toISOString().slice(0, 16)}
            />
            <button
                onClick={findTimeTo}
            >
                Высчитать
            </button>
            <div>
                {`${y} years, ${mo} months, ${d} days, ${h} hours, ${mi} minutes, ${s} seconds.`}
            </div>
        </div>
    )
}
