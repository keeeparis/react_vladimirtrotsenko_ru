import React, { useContext } from 'react'
import Task from './Task'
import { Droppable } from 'react-beautiful-dnd'
import { AuthContext } from '../../context'

export default function Column({columnId, column}) {
    const {tasks, setTasks, lang} = useContext(AuthContext)

    const removeTask = (index) => {
        const newList = {...tasks}
        newList[columnId]['items'].splice(index, 1)
        setTasks(newList)
    }

    return (
        <>
            <div key={columnId} className='todo-column'>
                <h3>{column.name[lang]}</h3>
                <div style={{margin: 8}}>
                    <Droppable droppableId={columnId} key={columnId} >
                        {(provided, snapshot) => {
                            return (
                                <div
                                    {...provided.droppableProps} 
                                    ref={provided.innerRef} 
                                    style={{ background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey', padding: 4, width: 300, minHeight: 300}}
                                >
                                    {column.items.map((item, index) => 
                                        <Task item={item} index={index} key={index} removeTask={removeTask} />
                                    )}
                                    {provided.placeholder}
                                </div>
                            )
                        }}
                    </Droppable>
                </div>
            </div>
        </>
    )
}
