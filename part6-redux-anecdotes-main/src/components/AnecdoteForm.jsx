import { useDispatch } from "react-redux"
import {createNote} from '../reducers/anecdoteReducer'
import { showNotification } from "../reducers/notificationReducer"


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addNote = async (event) => {
        event.preventDefault()
        const content = event.target.new.value 
        event.target.new.value = ''
        dispatch(createNote(content))
        dispatch(showNotification(`New note '${content}' is added`))
      }
    
    return (
        <div>
            <h2>Create New Note:</h2>
            <form onSubmit={addNote}>
                <div>
                    <input name='new'/>
                </div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm 