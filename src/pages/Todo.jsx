import React, { useContext, useState } from 'react'
import Form from '../components/todo/Form'
import Modal from '../components/UI/modal/Modal'
import Button from '../components/UI/button/Button'
import { AuthContext } from '../context'
// import { useLocalStorage } from '../hooks/localstorage.hook'
import { useDictionary } from '../hooks/dictionary.hook'
import { DragDropContext } from 'react-beautiful-dnd'
import Column from '../components/todo/Column'
import infoIcon from '../media/images/info.png'

import { useDispatch, useSelector } from 'react-redux'
import { addNewTask, getColumns, handleDragEnd } from '../features/todo-tasks/tasksSlice'
import onDragEnd from '../utils/onDragEnd'

export default function Todo() {
    const {lang} = useContext(AuthContext)
    const [modal, setModal] = useState(false)
    const words = useDictionary(lang)

    const dispatch = useDispatch()
    const columns = useSelector(getColumns)
    
    const createTask = (newTask) => {
        dispatch(addNewTask(newTask))
        setModal(false)
    }

    const handleModalOn = () => {
        setModal(true)
    }

    return (
        <div className='content'>
            <h2 className='title'>Todo App</h2>
            <Button 
                onClick={handleModalOn} 
                style={{fontWeight: '500'}} 
            >
                {words.createTask}
            </Button>
            <Modal visible={modal} setVisible={setModal}>
                <Form create={createTask} />
            </Modal>
            <div className='todo-columns'>
                <DragDropContext
                    onDragEnd={(result) => onDragEnd(result, columns, dispatch, handleDragEnd)}    
                >
                    {Object.entries(columns).map(([columnId, column], index) => 
                        <Column key={columnId} column={column} columnId={columnId} />
                    )}
                </DragDropContext>
            </div>
            <div className='helper'>
                <img src={infoIcon} alt="Info" />
                <div>{words.helperTodo}</div>
            </div>
        </div>
    )
}
