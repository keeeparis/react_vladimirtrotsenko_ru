import React, { useContext, useState } from 'react'
import Button from '../UI/button/Button'
import { AuthContext } from '../../context/index'
import { useDictionary } from '../../hooks/dictionary.hook'
import { useMessage } from '../../hooks/message.hook'

export default function Form({create}) {
    const [post, setPost] = useState({id: '', content: ''})
    const {lang} = useContext(AuthContext)
    const words = useDictionary(lang)
    const message = useMessage()

    const addNewPost = (event) => {
        event.preventDefault()
        if (!post.content.trim()) { message(words.emptyInput); return }
        create({...post, id: Date.now().toString()})
        setPost({id: '', content: ''})
    }

    const handleChange = (event) => {
        setPost({...post, [event.target.name]: event.target.value})
    }

    return (
        <form>
            <div className='input-field'>
                <textarea 
                    type="text" 
                    value={post.content}
                    name='content'
                    onChange={handleChange}
                    className='materialize-textarea'
                    id='textarea'
                    required={true}
                />
                <label htmlFor="textarea">{words.enterTask}</label>
            </div>
            <Button onClick={addNewPost} style={{display: 'block', marginLeft: 'auto'}}>{words.create}</Button>
        </form>
    )
}
