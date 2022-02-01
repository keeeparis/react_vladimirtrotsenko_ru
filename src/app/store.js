import { configureStore } from '@reduxjs/toolkit'
import cardsReducer from '../features/weather-cards/cardsSlice'
import datesReducer from '../features/timeto-date/datesSlice'
import tasksReducer from '../features/todo-tasks/tasksSlice'

export const store = configureStore({
    reducer: {
        weather: cardsReducer,
        todo: tasksReducer,
        timeto: datesReducer,
    }
})