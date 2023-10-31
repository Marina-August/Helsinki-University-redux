import { createSlice } from '@reduxjs/toolkit';

const initialnotificationState = {message: '', duration: ''}
const notificationSlice = createSlice({
    name:'notification',
    initialState: initialnotificationState,
    reducers: {
        removeNotification (state){
            state.message = ''
        },
        setAnecdoteNotification (state, action){
            state.message = action.payload
        }
    }
}) 

export const { setAnecdoteNotification, removeNotification } = notificationSlice.actions

export const setNotification = ({message, time}) => {
    return  dispatch => {
      dispatch(setAnecdoteNotification(message))
      setTimeout(()=>{
       dispatch(removeNotification())
    }, time*1000)
    }
  }



export default notificationSlice.reducer