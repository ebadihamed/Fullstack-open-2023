import { createSlice } from "@reduxjs/toolkit"
import { anecdotesAtStart } from "./anecdoteReducer"

const initialState = anecdotesAtStart.notification
const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers : {
        showNotification(state, action) {
            return action.payload
    }
    }
})

export const {showNotification} = notificationSlice.actions
export default notificationSlice.reducer