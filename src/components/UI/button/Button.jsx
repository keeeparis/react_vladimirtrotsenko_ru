import React from 'react'
import styles from './Button.module.scss'

export default function Button({children, btn=true, color, ...props}) {
    let result = ['waves-effect']
    result = (btn) ? [...result, 'btn', styles.color] : [...result, 'btn-flat']
    
    return (
        <button {...props} className={[...result].join(' ')}>
            {children}
        </button>
    )
}
