import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import ApiRequest from "../../API/ApiRequest"

const cardsAdapter = createEntityAdapter()

const initialState = cardsAdapter.getInitialState({
    status: 'idle',
    error: null
})

export const addNewCard = createAsyncThunk(
    'weather/addNewCard',
    async initialCard => {
        if (!initialCard.city.length) { throw new Error('Error occured, try again')}
        
        const coords = await ApiRequest.getCoords(initialCard.city)
        const forecast = await ApiRequest.getData(coords)

        const data = {
            id: initialCard.city, 
            coords: coords, 
            forecast: forecast
        }

        return data
    }
)

const cardsSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(addNewCard.pending, (state, action) => {
                state.error = null
                state.status = 'loading'
            })
            .addCase(addNewCard.fulfilled, (state, action) => {
                state.status = 'succeeded'
                cardsAdapter.upsertOne(state, action.payload)
            })
            .addCase(addNewCard.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export default cardsSlice.reducer

// export const {  } = cardsSlice.actions

export const {
    selectAll: selectAllCards,
    selectById: selectCardById,
    selectIds: selectCardIds
} = cardsAdapter.getSelectors(state => state.weather)