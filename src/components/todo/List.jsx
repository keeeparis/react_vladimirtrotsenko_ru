import React from 'react'
import Post from './Post'

export default function List({posts, remove}) {
    if (posts.length === 0) {
        return (
            <div className='post-list'>
                <h3>Посты не найдены</h3>
            </div>
        )
    }

    return (
        <div className='post-list'>
            <h3>Список постов</h3>
            {posts.map((post, index) => 
                <Post post={post} key={post.id} num={index+1} remove={remove} />
            )}
        </div>
    )
}
