import { createAnecdote } from '../requests'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch} from '../NotificationContext'

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({ mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: ()=>{
      dispatch({ type:'NOTE', payload:'too short anecdote, must have length 5 or more'})
    setTimeout(()=>{
      dispatch({type:'CLEAR'})
   }, 5000)
    }
   })
  const queryClient = useQueryClient()


  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const getId = () => (100000 * Math.random()).toFixed(0)
    newAnecdoteMutation.mutate({ content, id:getId(), votes: 0 })
    dispatch({ type:'NOTE', payload:`anecdote '${content}' created` })
    setTimeout(()=>{
      dispatch({type:'CLEAR'})
   }, 5000)
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
