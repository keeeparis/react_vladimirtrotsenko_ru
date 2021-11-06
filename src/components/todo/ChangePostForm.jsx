import React, { useContext, useState } from 'react'
import {AuthContext} from '../../context/index'

export default function ChangePostForm({post, setVisible}) {
    const {posts, setPosts} = useContext(AuthContext)
    const [current, setCurrent] = useState({title: post.title, body: post.body, id: post.id})

    const updatePost = (event) => {
        event.preventDefault()
        setPosts(posts.map(el => el.id === post.id ? {...el, title: current.title, body: current.body} : el))
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
            <input 
                type="text" 
                value={current.body}
                onChange={handleChange}
                name='body'
            />
            <button onClick={updatePost}>Редактировать</button>
        </form>
    )
}
