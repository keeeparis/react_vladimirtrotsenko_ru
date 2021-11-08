import React, { useState } from 'react'
import Modal from '../UI/modal/Modal'
import Button from '../UI/button/Button'
import ChangePostForm from './ChangePostForm'

export default function Post({post, num, remove}) {
    const [modal, setModal] = useState(false)

    return (
        <div className='post-item'>
            <div className='details'>
                <h4>{num}. {post.title}</h4>
                <p>{post.body}</p>
            </div>
            <div className='buttons'>
                <Button onClick={() => setModal(true)}>Редактировать</Button>
                <Button onClick={() => remove(post)}>Удалить</Button>
            </div>
            <Modal visible={modal} setVisible={setModal}>
                <ChangePostForm post={post} setVisible={setModal}/>
            </Modal>
        </div>
    )
}
