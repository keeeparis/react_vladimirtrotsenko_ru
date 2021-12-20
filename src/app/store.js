import { configureStore } from '@reduxjs/toolkit'
import cardsReducer from '../features/weather-cards/cardsSlice'

export const store = configureStore({
    reducer: {
        weather: cardsReducer,
    }
})