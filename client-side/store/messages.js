import axios from 'axios'
import socket from '../socket'

//Action Types
const GET_NEW_MESSAGE = 'GET_NEW_MESSAGE'
const GET_ALL_MESSAGES = 'GET_ALL_MESSAGES'



//Action Creator
const getNewMessage = (message) => ({
  type: GET_NEW_MESSAGE,
  message
})

const getAllMessages = (messages) => ({
  type: GET_ALL_MESSAGES,
  messages
})


//Thunk Creators
export const fetchMessages = (tripId) => async dispatch => {
  try {
    const messages = await axios.get(`/api/messages/trip/${tripId}`)
    dispatch(getAllMessages(messages.data))
  } catch (error) {
    console.error(error)
  }
}

export const sendMessage = (message, tripId, userId) => async dispatch => {
  try {
    const newMessage = await axios.post(`/api/messages/trip/${tripId}/user/${userId}`, message)
    dispatch(getNewMessage(newMessage.data))
  } catch (error) {
    console.error(error)
  }
}
//Initial State
const initialState = []


//Reducer
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_NEW_MESSAGE:
      return [...state, action.message]
    case GET_ALL_MESSAGES:
      return action.messages
    default:
      return state
  }
}
