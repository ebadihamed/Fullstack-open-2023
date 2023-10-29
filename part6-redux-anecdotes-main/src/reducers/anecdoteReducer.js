import {createSlice} from '@reduxjs/toolkit'
import noteService from '../services/notes'

export const anecdotesAtStart = {
  notes: [],
  filter: '',
  notification: ''
 }

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.notes.map(asObject)

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    noteUpdate (state, action){
      const id = action.payload.id
      return state.map(note => note.id !== id ? note : action.payload).sort((a,b) => b.votes - a.votes)
    },
    noteAppend(state, action){
      state.push(action.payload)

    },
    setNotes(state, action){
      return action.payload
    }
  }
})


export const {noteAppend, setNotes, noteUpdate} = noteSlice.actions

export const createNote = content => {
  return async dispatch => {
    const newNote = await noteService.createNew(content)
    dispatch(noteAppend(newNote))
  }
}

export const voter = id => {
  return async (dispatch, getState) => {
      const state = getState()
      const noteToChange = state.notes.find(n => n.id === id)
      const changedNote = {
          ...noteToChange,
          votes: noteToChange.votes + 1
      }
      console.log(changedNote)
      const updated = await noteService.updateNote(changedNote)
      dispatch(noteUpdate(updated)) 
  }
}

export default noteSlice.reducer