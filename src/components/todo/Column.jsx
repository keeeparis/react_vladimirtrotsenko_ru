import React, { useContext } from 'react'
import Tasks from './Tasks'
import { Droppable } from 'react-beautiful-dnd'
import { AuthContext } from '../../context'

export default function Column({columnId, column}) {
    const {tasks, setTasks} = useContext(AuthContext)

    const removeTask = (index) => {
        const newList = {...tasks}
        newList[columnId]['items'].splice(index, 1)
        setTasks(newList)
    }

    return (
        <div key={columnId} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h2>{column.name}</h2>
            <div style={{margin: 8}}>
                <Droppable droppableId={columnId} key={columnId} >
                    {(provided, snapshot) => {
                        return (
                            <div
                                {...provided.droppableProps} 
                                ref={provided.innerRef} 
                                style={{ background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey', padding: 4, width: 250, minHeight: 300}}
                            >
                                {column.items.map((item, index) => 
                                    <Tasks item={item} index={index} key={index} removeTask={removeTask} />
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
