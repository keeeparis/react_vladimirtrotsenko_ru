import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import Button from '../UI/button/Button'

export default function Tasks({item, index, removeTask}) {
    return (
        <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided, snapshot) => {
                return (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{userSelect: 'none', padding: 16, margin: '0 0 8px 0', minHeight: '50px',
                        backgroundColor: snapshot.isDragging ? '#263b4a' : '#456c86', color: 'white', display: 'flex', justifyContent: 'space-between',
                        alignItems: 'center',
                        ...provided.draggableProps.style}}
                    >
                        {item.content}
                        <Button onClick={() => { removeTask(index) }}>Delete</Button>
                    </div>
                )
            }}
        </Draggable>
    )
}
