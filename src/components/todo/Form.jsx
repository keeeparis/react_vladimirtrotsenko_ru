import React, { useState } from 'react'
import {useMessage} from '../../hooks/message.hook'
import Button from '../UI/button/Button'

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
            <textarea 
                name="body" 
                value={post.body} 
                placeholder='Введите содержимое...' 
                cols="20" rows="10" 
                className='materialize-textarea'
                onChange={handleChange}
            />
            <Button onClick={addNewPost}>Создать</Button>
        </form>
    )
}
