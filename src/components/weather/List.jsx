import React from 'react'
import { Droppable } from 'react-beautiful-dnd'

import Card from './Card'
import useWindowDimensions from '../../hooks/windowDimensions.hook'

import { CardWrapper } from './styles'

export default function List({ columnId, column }) {
    const { width } = useWindowDimensions()

    const handleDroppableDirection = (width) => width > 1024 ? 'horizontal' : 'vertical'

    return (
        <Droppable droppableId={columnId} key={columnId} direction={handleDroppableDirection(width)}>
            {(provided, snapshot) => {
                return (
                    <CardWrapper
                        {...provided.droppableProps} 
                        ref={provided.innerRef}
                        width={width}
                        snapshot={snapshot}
                    >
                        {Object.values(column.entities).map((item, index) => 
                            <Card item={item} index={index} key={index} />
                        )}
                        {provided.placeholder}
                    </CardWrapper>
                )
            }}
        </Droppable>
    )
}
