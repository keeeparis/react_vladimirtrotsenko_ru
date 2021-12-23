import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import ApiRequest from "../../API/ApiRequest"

const cardsAdapter = createEntityAdapter()

const initialState = cardsAdapter.getInitialState({})

export const addNewCard = createAsyncThunk(
    'weather/addNewCard',
    async initialCard => {
        if (!initialCard.city.length) { throw new Error('Error occured, try again')}
        
        const coords = await ApiRequest.getCoords(initialCard.city)
        const forecast = await ApiRequest.getData(coords)

        const data = {
            id: initialCard.city, 
            coords: coords, 
            forecast: forecast,
            lastUpdated: Date.now()
        }

        return data
    }
)

export const refreshCard = createAsyncThunk(
    'weather/refreshCard',
    async initialCard => {
        const coords = initialCard.coords
        const forecast = await ApiRequest.getData(coords)

        return { 
            id: initialCard.id, 
            forecast: forecast, 
            lastUpdated: Date.now() 
        }
    }
)

const cardsSlice = createSlice({
    name: 'weather',
    initialState: {
        status: 'idle',
        error: null,
        cards: {
            city: initialState
        }
    },
    reducers: {
        handleDragEnd(state, action) {
            const updatedEntities = {}

            action.payload.forEach(entity => {
                updatedEntities[entity.id] = entity
            })

            cardsAdapter.setAll(state.cards.city, updatedEntities)
        },
        removeCard(state, action) {
            cardsAdapter.removeOne(state.cards.city, action.payload)
        }
    },
    extraReducers(builder) {
        builder
            .addCase(addNewCard.pending, (state, action) => {
                state.error = null
                state.status = 'loading'
            })
            .addCase(addNewCard.fulfilled, (state, action) => {
                state.status = 'succeeded'
                cardsAdapter.upsertOne(state.cards.city, action.payload)
            })
            .addCase(addNewCard.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(refreshCard.fulfilled, (state, action) => {
                state.status = 'succeeded'
                cardsAdapter.updateOne(
                    state.cards.city, 
                    { 
                        id: action.payload.id, 
                        changes: { 
                            forecast: action.payload.forecast,
                            lastUpdated: action.payload.lastUpdated 
                        }  
                    } 
                )
            })
    }
})

export default cardsSlice.reducer

export const { handleDragEnd, removeCard } = cardsSlice.actions

export const {
    selectAll: selectAllCards,
    selectById: selectCardById,
    selectIds: selectCardIds
} = cardsAdapter.getSelectors(state => state.weather.cards.city)

export const getCards = state => state.weather.cards
export const getStatus = state => state.weather.status
export const getError = state => state.weather.error