import React, { useContext, useState } from 'react'
import Form from '../components/todo/Form'
// import List from '../components/todo/List'
import Modal from '../components/UI/modal/Modal'
import Button from '../components/UI/button/Button'
import { AuthContext } from '../context'
import { useLocalStorage } from '../hooks/localstorage.hook'
import { useDictionary } from '../hooks/dictionary.hook'
import { DragDropContext } from 'react-beautiful-dnd'
import Column from '../components/todo/Column'


export default function Todo() {
    const {tasks, setTasks, lang} = useContext(AuthContext)
    const [modal, setModal] = useState(false)
    const words = useDictionary(lang)
    
    useLocalStorage('vtru_tasks', tasks)
    
    const createTask = (newTask) => {
        const toDoList = {...tasks.toDo}
        const newList = toDoList.items
        newList.splice(newList?.length, 0, newTask)
        setTasks({...tasks, toDo: toDoList})
        setModal(false)
    }
    
    const onDragEnd = (result, columns, setColumns) => {
        if (!result.destination) return
        const { source, destination } = result
    
        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId]
            const destColumn = columns[destination.droppableId]
            const sourceItems = [...sourceColumn.items]
            const destItems = [...destColumn.items]
    
            const [removed] = sourceItems.splice(source.index, 1)
            destItems.splice(destination.index, 0, removed)
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn, 
                    items: destItems
                }
            })
        } else {
            const column = columns[source.droppableId]
            const copiedItems = [...column.items]
            const [removed] = copiedItems.splice(source.index, 1)
            copiedItems.splice(destination.index, 0, removed)
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems
                }
            })
        }
    }

    return (
        <div className='content'>
            <Button onClick={() => setModal(true)} style={{width: 'fit-content'}} color={['green darken-4']}>{words.createTask}</Button>
            <Modal visible={modal} setVisible={setModal}>
                <Form create={createTask} />
            </Modal>

            <div style={{display: 'flex', justifyContent: 'center', height: '100%'}}>
                <DragDropContext
                    onDragEnd={(result) => onDragEnd(result, tasks, setTasks)}    
                >
                    {Object.entries(tasks).map(([columnId, column], index) => 
                        <Column key={columnId} column={column} columnId={columnId} />
                    )}
                </DragDropContext>
            </div>
        </div>
    )
}
