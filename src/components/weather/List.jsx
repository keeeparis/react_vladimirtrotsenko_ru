import React from 'react'
import { Droppable } from 'react-beautiful-dnd'

import useWindowDimensions from '../../hooks/windowDimensions.hook'

import Card from './Card'

export default function List({ columnId, column }) {
    const {width} = useWindowDimensions()

    const removeCard = (index) => {
        // const newList = {...cards}
        // newList[columnId]['items'].splice(index, 1)
        // setCards(newList)
    }

    return (
        <Droppable droppableId={columnId} key={columnId} direction={width > 1024 ? 'horizontal' : 'vertical'}>
            {(provided, snapshot) => {
                return (
                    <div
                        {...provided.droppableProps} 
                        ref={provided.innerRef}
                        style={{ background: snapshot.isDraggingOver ? 'lightblue' : 'inherit', 
                            padding: 8, 
                            display: 'flex', 
                            flexWrap: 'wrap', 
                            justifyContent: 'space-between', 
                            transition: 'background-color 0.5s ease-in-out',
                            flexDirection: width > 1024 ? 'row' : 'column'
                        }} 
                    >
                        {Object.values(column.entities).map((item, index) => 
                            <Card item={item} index={index} key={index} removeCard={removeCard}/>
                        )}
                        {provided.placeholder}
                    </div>
                )
            }}
        </Droppable>
    )
}
