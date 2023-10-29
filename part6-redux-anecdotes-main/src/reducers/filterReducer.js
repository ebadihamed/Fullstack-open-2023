import { createSlice } from "@reduxjs/toolkit"
import { anecdotesAtStart } from "./anecdoteReducer"

const initialState = anecdotesAtStart.filter
const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filterChange(state, action){
            return action.payload
        }
    }
})


export const {filterChange} = filterSlice.actions
export default filterSlice.reducer