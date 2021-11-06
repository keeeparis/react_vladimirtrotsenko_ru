import React, { useState } from 'react'
import {useMessage} from '../../hooks/message.hook'

export default function Form({create}) {
    const [post, setPost] = useState({title: '', body: '', id: ''})
    const message = useMessage()

    const addNewPost = (event) => {
        event.preventDefault()
        if (post.title === '' || post.body === '') {
            message('Введите название и описание')
            return
        }
        create({...post, id: Date.now()})
        setPost({title: '', body: ''})
    }

    const handleChange = (event) => {
        setPost({...post, [event.target.name]: event.target.value})
    }

    return (
        <form>
            <input 
                type="text" 
                value={post.title}
                placeholder='Введите заголовок...'
                name='title'
                onChange={handleChange}
            />
            <input 
                type="text" 
                value={post.body}
                placeholder='Введите содержимое...'
                name='body'
                onChange={handleChange}
            />
            <button onClick={addNewPost}>Создать</button>
        </form>
    )
}
