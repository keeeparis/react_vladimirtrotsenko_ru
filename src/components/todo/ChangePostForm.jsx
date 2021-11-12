import React, { useContext, useState } from 'react'
import {AuthContext} from '../../context/index'
import { useDictionary } from '../../hooks/dictionary.hook'
import Button from '../UI/button/Button'

export default function ChangePostForm({post, setVisible}) {
    const {posts, setPosts, lang} = useContext(AuthContext)
    const [current, setCurrent] = useState({title: post.title, id: post.id})
    const words = useDictionary(lang)

    const updatePost = (event) => {
        event.preventDefault()
        setPosts(posts.map(el => el.id === post.id ? {...el, title: current.title} : el))
        setVisible(false)
    }

    const handleChange = (event) => {
        setCurrent({...current, [event.target.name]: event.target.value})
    }

    return (
        <form>
            <input 
                type="text"
                value={current.title} 
                onChange={handleChange}
                name='title'
            />
            <Button onClick={updatePost}>{words.changePost}</Button>
        </form>
    )
}
