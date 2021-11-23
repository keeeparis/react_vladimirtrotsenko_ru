import React, { useContext } from 'react'
import Task from './Task'
import { Droppable } from 'react-beautiful-dnd'
import { AuthContext } from '../../context'
import FormColor from './FormColor'

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
                <FormColor 
                    column={column}
                    onSubmit={(e) => {
                        e.preventDefault()
                        setTasks({...tasks, [columnId]: {...column, [e.target[0].name]: e.target[0].value, [e.target[1].name]: e.target[1].value}})
                    }}
                />
                <div className='list'>
                    <Droppable droppableId={columnId} key={columnId} >
                        {(provided, snapshot) => {
                            return (
                                <div
                                    {...provided.droppableProps} 
                                    ref={provided.innerRef} 
                                    style={{ background: snapshot.isDraggingOver ? 'lightblue' : column.colorColumn, padding: 4, width: 300, minHeight: 300}}
                                >
                                    {column.items.map((item, index) => 
                                        <Task item={item} index={index} key={index} removeTask={removeTask} colorTask={column.colorTask} />
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
