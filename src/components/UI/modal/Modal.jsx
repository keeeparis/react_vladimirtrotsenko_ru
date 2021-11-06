import React from 'react'
import styles from './Modal.module.scss'

export default function Modal({children, visible, setVisible}) {
    const stylesClasses = [styles.modal]

    if (visible) {
        stylesClasses.push(styles.active)
    }
    
    return (
        <div className={stylesClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}
