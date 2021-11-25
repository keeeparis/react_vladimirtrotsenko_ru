import React, { useContext, useState } from 'react'
import Task from './Task'
import { Droppable } from 'react-beautiful-dnd'
import { AuthContext } from '../../context'
import FormColor from './FormColor'

export default function Column({columnId, column}) {
    const {tasks, setTasks, lang} = useContext(AuthContext)
    const [visibleColors, setVisibleColors] = useState(false)

    const removeTask = (index) => {
        const newList = {...tasks}
        newList[columnId]['items'].splice(index, 1)
        setTasks(newList)
    }

    const enableDefaultColors = () => {
        setTasks({...tasks, [columnId]: {...column, colorColumn: column.defaultColorColumn, colorTask: column.defaultColorTask}})
    }

    return (
        <div key={columnId} className='todo-column'>
            <div className='name'>
                <h3>{column.name[lang]}</h3>
                <button 
                    onClick={() => setVisibleColors(!visibleColors)} 
                    className={visibleColors?'btn-flat active': 'btn-flat'}
                >
                    <i className='material-icons' style={{fontSize: '1.3em'}}>color_lens</i>
                </button>
            </div>
            <FormColor 
                column={column}
                enableDefaultColors={enableDefaultColors}
                onSubmit={(e) => {
                    e.preventDefault()
                    setTasks({...tasks, [columnId]: {...column, [e.target[0].name]: e.target[0].value, [e.target[1].name]: e.target[1].value}})
                }}
                className={visibleColors ? 'active' : null}
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
    )
}
