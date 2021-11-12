import React, { useContext } from 'react'
import Button from '../UI/button/Button'
import { AuthContext } from '../../context'
import { useDictionary } from '../../hooks/dictionary.hook'

export default function Post({post, num, remove}) {
    const {lang} = useContext(AuthContext)
    const words = useDictionary(lang)

    return (
        <div className='post-item'>
            <div className='details'>
                <h4>{num}. {post.content}</h4>
            </div>
            <div className='buttons'>
                <Button onClick={() => remove(post)} color={['red darken-2']}>{words.deletePost}</Button>
            </div>
        </div>
    )
}
