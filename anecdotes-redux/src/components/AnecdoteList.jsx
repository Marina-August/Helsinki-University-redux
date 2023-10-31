import { useSelector, useDispatch } from 'react-redux'
import { updateAnecdote} from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () =>{
    // let anecdotes = useSelector(state => state.anecdote.filter(el=>el.content.toLowerCase().includes(state.filter.toLowerCase())))
    const anecdotes_ = useSelector(state => state.anecdote)
    const filter = useSelector(state => state.filter)
    const filteredAnecdotes = anecdotes_.filter(el=>el.content.toLowerCase().includes(filter.toLowerCase()))
    const anecdotes = [...filteredAnecdotes].sort((a, b) =>  b.votes-a.votes )
  
    const dispatch = useDispatch()
  
    const vote = (anecdote, content) => {
      let anecdote_ = {...anecdote}
      console.log(anecdote_.votes)
      const updatedVotes = ++anecdote_.votes
      console.log(updatedVotes)
      anecdote_={...anecdote_, votes:updatedVotes}
      console.log(anecdote_)
      dispatch(updateAnecdote(anecdote_))
      dispatch(setNotification({message:`you voted ${content}`, time:10}))
      console.log(content)
    }
    return(
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                  <div>
                  {anecdote.content}
                 </div>
                <div>
                 has {anecdote.votes}
               <button onClick={() => vote(anecdote, anecdote.content)}>vote</button>
               </div>
              </div>
            )}
        </div>

    )
}

export default AnecdoteList