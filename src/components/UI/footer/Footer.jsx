import React from 'react'
import styles from './Footer.module.scss'

export default function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.social}>
                <a href="https://t.me/keeeparis" target='_blank' rel='noreferrer'>Telegram</a>
                <a href='https://vk.com/keeeparis' target='_blank' rel='noreferrer'>VK</a>
                <a href='https://www.instagram.com/keeeparis/' target='_blank' rel='noreferrer'>Instagram</a>
                <a href='https://music.yandex.ru/users/keeeparis/playlists' target='_blank' rel='noreferrer'>Yandex Music</a>
            </div>
            <div className={styles.name}>Vladimir Trotsenko, {new Date().getFullYear()}</div>
        </div>
    )
}
