import React, { useState } from 'react'
import Modal from '../UI/modal/Modal'
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
                <button onClick={() => setModal(true)}>Редактировать</button>
                <button onClick={() => remove(post)}>Удалить</button>
            </div>
            <Modal visible={modal} setVisible={setModal}>
                <ChangePostForm post={post} setVisible={setModal}/>
            </Modal>
        </div>
    )
}
