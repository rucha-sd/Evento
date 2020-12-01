import axios from 'axios'
import { EVENT_SORT_REQUEST, 
  EVENT_SORT_SUCCESS, 
  EVENT_SORT_FAIL, 
  EVENT_TYPECAT_REQUEST, 
  EVENT_TYPECAT_SUCCESS,
  EVENT_TYPECAT_FAIL,
  EVENT_ADD_REQUEST,
  EVENT_ADD_SUCCESS,
  EVENT_ADD_FAIL,
  EVENT_GET_REQUEST,
  EVENT_GET_SUCCESS,
  EVENT_GET_FAIL} from '../Constants/Event'


export const sortEvents = (date, city, categories) => async (dispatch, getState) => {
    try {
      console.log(date, city)
      dispatch({ type: EVENT_SORT_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.post(
        `/api/event/sorted`,
        {date, city, categories},
        config,
      )
  
      dispatch({
        type: EVENT_SORT_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: EVENT_SORT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const typesAndCategories = () => async (dispatch) =>  {
    try {
        dispatch({ type: EVENT_TYPECAT_REQUEST })
  
        const { data } = await axios.get(
          '/api/typesAndCategories',
        )
    
        dispatch({
          type: EVENT_TYPECAT_SUCCESS,
          payload: data,
        })
      } catch (error) {
        dispatch({
          type: EVENT_TYPECAT_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
      }
}

export const add = (name, categories, type, description, price, organizer, startTime, endTime, noOfSeats, location, address) => async (dispatch, getState) =>  {
  try {
      dispatch({ type: EVENT_ADD_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.post(
        `/api/event/add`,
        {name, categories, type, description, price, organizer, startTime, endTime, noOfSeats, location, address},
        config
      )
  
      dispatch({
        type: EVENT_ADD_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: EVENT_ADD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
}

export const getEvents = () => async(dispatch) => {
  try {
    dispatch({ type: EVENT_GET_REQUEST })

    const { data } = await axios.get(
      '/api/event/',
    )

    dispatch({
      type: EVENT_GET_SUCCESS,
      payload: data.events,
    })
  } catch (error) {
    dispatch({
      type: EVENT_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}