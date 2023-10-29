import { useDispatch, useSelector } from "react-redux"
import {voter} from '../reducers/anecdoteReducer'
import { showNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(state => state.notes)
    const filter = useSelector(state => state.filter)

    let filteredNotes = anecdotes.filter((note) =>
     note.content.toLowerCase().includes(filter.toLowerCase()))
    filteredNotes = filteredNotes.sort((a, b) => b.votes - a.votes)
    const vote = (id) => {
        dispatch(voter(id))
        dispatch(showNotification(`note with id ${id} is voted`))
      }
    
      return (
        <div>
          {filteredNotes.map(note =>
            <div key={note.id}>
              <div>
                {note.content}
              </div>
              <div>
                has {note.votes}
                <button onClick={() => vote(note.id)}>vote</button>
              </div>
            </div>
          )}
        </div>
      )
}

export default AnecdoteList
