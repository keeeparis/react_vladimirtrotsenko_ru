import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"

const tasksAdapter = createEntityAdapter()
const initialState = tasksAdapter.getInitialState({})

const tasksSlice = createSlice({
    name: 'todo',
    initialState: {
        status: 'idle',
        error: null,
        columns: {
            toDo: initialState,
            inProgress: initialState,
            done: initialState,
        }
    },
    reducers: {
        addNewTask(state, action) {
            tasksAdapter.addOne(state.columns.toDo, action.payload)
        },
        handleDragEnd(state, action) {
            const updatedEntities = {}
            const updatedEntities2 = {}
            const {sourceColId, sourceItems, destColId = null, destItems = []} = action.payload
    
            sourceItems.forEach(entity => {
                updatedEntities[entity.id] = entity
            })

            destItems.forEach(entity => {
                updatedEntities2[entity.id] = entity
            })

            tasksAdapter.setAll(state.columns[sourceColId], updatedEntities)
            if (destColId) { tasksAdapter.setAll(state.columns[destColId], updatedEntities2) }
        }
    }
})

export default tasksSlice.reducer

export const { addNewTask, handleDragEnd } = tasksSlice.actions

export const getColumns = (state) => state.todo.columns