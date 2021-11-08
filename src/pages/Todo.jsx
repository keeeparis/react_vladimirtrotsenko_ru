import React, { useContext, useState } from 'react'
import Filter from '../components/todo/Filter'
import Form from '../components/todo/Form'
import List from '../components/todo/List'
import Modal from '../components/UI/modal/Modal'
import Button from '../components/UI/button/Button'
import { AuthContext } from '../context'
import { useLocalStorage } from '../hooks/localstorage.hook'
import { usePosts } from '../hooks/sortingPosts.hook'
import { useDictionary } from '../utils/dictionary'

export default function Todo() {
    const {posts, setPosts, lang} = useContext(AuthContext)
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const words = useDictionary(lang)

    useLocalStorage('vtru_posts', posts)

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(e => e.id !== post.id))
    }

    return (
        <div className='content'>
            <Button onClick={() => setModal(true)} style={{width: 'fit-content'}} color={['green darken-4']}>{words.createPost}</Button>
            <Modal visible={modal} setVisible={setModal}>
                <Form create={createPost} />
            </Modal>
            <Filter filter={filter} setFilter={setFilter} />
            <List posts={sortedAndSearchedPosts} remove={removePost} />
        </div>
    )
}
