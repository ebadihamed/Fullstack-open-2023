import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = () => {
    axios.get('http://localhost:3001/anecdotes').then(res => res.data)
}

export const createNote = (newNote) => {
    axios.post(baseUrl, newNote).then(res => res.data)
}

export const updateNote = updatedNote => {
    axios.put(`${baseUrl}/${updatedNote.id}`, updatedNote).then(res => res.data)
}