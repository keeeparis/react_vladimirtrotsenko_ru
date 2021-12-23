import styled from 'styled-components'

export const CardWrapper = styled.div`
    background-color: ${props => props.snapshot.isDraggingOver ? 'lightblue' : 'inherit'};
    padding: 8px;
    display: flex;
    flex-direction: ${props => props.width > 1024 ? 'row' : 'column'};
    flex-wrap: wrap;
    justify-content: space-between;
    transition: background-color 0.5s ease-in-out;
`