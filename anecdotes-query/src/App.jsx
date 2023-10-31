import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery,  useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useContext } from 'react'
import { useNotificationDispatch, useNotificationValue } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const notification = useNotificationValue()

  const updateAnecdoteMutation = useMutation({mutationFn:updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  const anecdotes = result.data


  const handleVote = (anecdote) => {
    let votes_ = anecdote.votes
    votes_ = ++votes_
    updateAnecdoteMutation.mutate({...anecdote, votes: votes_})
    dispatch({ type:'NOTE', payload:`anecdote '${anecdote.content}' voted` })
    setTimeout(()=>{
      dispatch({type:'CLEAR'})
   }, 5000)
  }

  // const anecdotes = [
  //   {
  //     "content": "If it hurts, do it more often",
  //     "id": "47145",
  //     "votes": 0
  //   },
  // ]

  return (
    <div>
    {result.error && <h1>anecdote service not available due to problems in server</h1>}
    {!result.error && <div>
      <h3>Anecdote app</h3>
    
     {notification && <Notification />}
      <AnecdoteForm />
    
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
    </div>}
    </div>
  )
}

export default App
