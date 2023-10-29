import { useQuery, useMutation, useQueryClient} from '@tanstack/react-query' 
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import axios from 'axios'
import {getAll, updateNote} from './requests'

const App = () => {
  const queryClient = useQueryClient()
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => axios.get('http://localhost:3001/anecdotes').then(res => res.data),
    retry: 1
  })

  const updateNoteMutation = useMutation({mutationFn: updateNote, onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
  }})

  if (result.isLoading) {
    return <div>loading data...</div>
  }
  if (result.status === 'error') {
    return <div>anecdote service not availble due to problems in server</div>
  }
  const anecdotes = result.data

  const handleVote = (anecdote) => {
    const votes = anecdote.votes
    updateNoteMutation.mutate({...anecdote, votes: votes + 1})
  }


  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm/>
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
