import React from 'react'
// import styles from './Button.module.scss'

export default function Button({children, btn=true, color, ...props}) {
    let result = ['waves-effect']
    result = (btn) ? [...result, 'btn'] : result
    const standardColor = ['indigo', 'lighten-2']
    result = (color) ? [...result, ...color] : [...result, ...standardColor]
    
    return (
        <button {...props} className={result.join(' ')}>
            {children}
        </button>
    )
}
