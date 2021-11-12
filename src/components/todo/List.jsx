import React, { useContext } from 'react'
import { AuthContext } from '../../context'
import { useDictionary } from '../../hooks/dictionary.hook'
import Post from './Post'

export default function List({posts, remove}) {
    const {lang} = useContext(AuthContext)
    const words = useDictionary(lang)

    if (posts.length === 0) {
        return (
            <div className='post-list'>
                <h3>{words.noPosts}</h3>
            </div>
        )
    }

    return (
        <div className='post-list'>
            <h3>{words.postList}</h3>
            {posts.tasks.map((post, index) => 
                <Post post={post} key={post.id} num={index+1} remove={remove} />
            )}
        </div>
    )
}
