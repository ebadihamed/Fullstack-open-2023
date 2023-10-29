import axios from "axios"
import { asObject } from "../reducers/anecdoteReducer"

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const newObject = asObject(content)
    const response =  await axios.post(baseUrl, newObject)
    return response.data
}

const updateNote = async (newObject) => {
    const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject)
    return response.data
}
export default {getAll, createNew, updateNote}