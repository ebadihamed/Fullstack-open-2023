import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query' 
import { createNote } from '../requests'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const newNoteMutation = useMutation({mutationFn: createNote, onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
  }
})
  
  const onCreate = (event) => {
    event.preventDefault()
    const content = asObject(event.target.anecdote.value)
    event.target.anecdote.value = ''
    newNoteMutation.mutate(content)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
