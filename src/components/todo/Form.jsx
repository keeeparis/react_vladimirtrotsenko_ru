import React, { useContext, useState } from 'react'
import {useMessage} from '../../hooks/message.hook'
import Button from '../UI/button/Button'
import {AuthContext} from '../../context/index'
import { useDictionary } from '../../hooks/dictionary.hook'

export default function Form({create}) {
    const [post, setPost] = useState({title: '', body: '', id: ''})
    const {lang} = useContext(AuthContext)
    const words = useDictionary(lang)
    const message = useMessage()

    const addNewPost = (event) => {
        event.preventDefault()
        if (post.title === '' || post.body === '') {
            message(words.errorNoNameDesc)
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
                placeholder={words.enterName}
                name='title'
                onChange={handleChange}
            />
            <textarea 
                name="body" 
                value={post.body} 
                placeholder={words.enterDescription}
                cols="20" rows="10" 
                className='materialize-textarea'
                onChange={handleChange}
            />
            <Button onClick={addNewPost}>{words.create}</Button>
        </form>
    )
}
