import React from 'react'
import { endsWith, addZeroIfOneNumber } from '../../utils'

export default function Showtime({d, h, mi, s, words}) {
    const dLast = endsWith(d)
    return (
        <div className='showtime'>
            <div className='days'>
                <span>{d}</span>
                <div className='text'> {dLast === 1 ? words.day1 : dLast > 1 && dLast < 5 ? words.daysS : words.daysM}</div>
            </div>
            <div className='time'>
                <div>
                    <span>{addZeroIfOneNumber(h)}{"\u003A"}</span>
                    <span>{addZeroIfOneNumber(mi)}{"\u003A"}</span>
                    <span>{addZeroIfOneNumber(s)}</span>
                </div>
            </div>
        </div>
    )
}
