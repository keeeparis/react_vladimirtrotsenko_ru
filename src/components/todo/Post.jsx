import React, { useContext, useState } from 'react'
import Modal from '../UI/modal/Modal'
import Button from '../UI/button/Button'
import ChangePostForm from './ChangePostForm'
import { AuthContext } from '../../context'
import { useDictionary } from '../../hooks/dictionary.hook'

export default function Post({post, num, remove}) {
    const [modal, setModal] = useState(false)
    const {lang} = useContext(AuthContext)
    const words = useDictionary(lang)

    return (
        <div className='post-item'>
            <div className='details'>
                <h4>{num}. {post.title}</h4>
                <p>{post.body}</p>
            </div>
            <div className='buttons'>
                <Button onClick={() => setModal(true)} color={['yellow darken-1 black-text']}>{words.changePost}</Button>
                <Button onClick={() => remove(post)} color={['red darken-2']}>{words.deletePost}</Button>
            </div>
            <Modal visible={modal} setVisible={setModal}>
                <ChangePostForm post={post} setVisible={setModal}/>
            </Modal>
        </div>
    )
}
