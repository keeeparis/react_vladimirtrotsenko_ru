export default function onDragEnd(result, columns, dispatch, handleDragEnd) {
    if (!result.destination) return
    const { source, destination } = result

    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId]
        const destColumn = columns[destination.droppableId]
        const sourceItems = [...Object.values(sourceColumn.entities)]
        const destItems = [...Object.values(destColumn.entities)]

        const [removed] = sourceItems.splice(source.index, 1)
        destItems.splice(destination.index, 0, removed)

        dispatch(handleDragEnd({
            sourceColId: source.droppableId,
            sourceItems: sourceItems,
            destColId: destination.droppableId,
            destItems: destItems
        }))
    } else {
        const column = columns[source.droppableId]
        const copiedItems = [...Object.values(column.entities)]
        const [removed] = copiedItems.splice(source.index, 1)
        copiedItems.splice(destination.index, 0, removed)

        dispatch(handleDragEnd({ 
            sourceColId: source.droppableId, 
            sourceItems: copiedItems
        }))
    }
}