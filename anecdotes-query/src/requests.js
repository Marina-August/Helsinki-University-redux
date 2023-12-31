import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)
  
export const createAnecdote = newAnecdote =>{
  if (newAnecdote.content.trim.length() < 5){
    return Promise.reject('too short anecdote, must have length 5 or more');
  } else{
  axios.post(baseUrl, newAnecdote).then(res => res.data)
}
}

export const updateAnecdote = updatedAnecdote =>
  axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote).then(res => res.data)