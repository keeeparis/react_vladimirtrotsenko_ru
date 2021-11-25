import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import Button from '../UI/button/Button'

export default function Task({item, index, removeTask, colorTask}) {
    return (
        <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided, snapshot) => {
                return (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className='task'
                        style={{ backgroundColor: snapshot.isDragging ? '#263b4a' : colorTask, ...provided.draggableProps.style }}
                    >
                        {item.content}
                        <Button onClick={() => { removeTask(index) }} style={{minWidth: 'fit-content', padding: '0 10px', border: '1px solid lightgray'}} btn={false}>
                            <i className='material-icons' style={{filter: 'invert(1)'}}>close</i>
                        </Button>
                    </div>
                )
            }}
        </Draggable>
    )
}
