import React, { useContext, useState } from 'react'
import Button from '../UI/button/Button'
import { AuthContext } from '../../context/index'
import { useDictionary } from '../../hooks/dictionary.hook'

export default function Form({create}) {
    const [post, setPost] = useState({id: '', content: ''})
    const {lang} = useContext(AuthContext)
    const words = useDictionary(lang)

    const addNewPost = (event) => {
        event.preventDefault()
        create({...post, id: Date.now().toString()})
        setPost({id: '', content: ''})
    }

    const handleChange = (event) => {
        setPost({...post, [event.target.name]: event.target.value})
    }

    return (
        <form>
            <input 
                type="text" 
                value={post.content}
                placeholder={words.enterName}
                name='content'
                onChange={handleChange}
            />
            <Button onClick={addNewPost}>{words.create}</Button>
        </form>
    )
}
