import axios from 'axios'
import { USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGIN_FAIL, 
    USER_REGISTER_REQUEST, 
    USER_REGISTER_SUCCESS, 
    USER_REGISTER_FAIL, 
    USER_LIKE_EVENT_REQUEST, 
    USER_LIKE_EVENT_SUCCESS, 
    USER_LIKE_EVENT_FAIL, 
    USER_DISLIKE_EVENT_REQUEST, 
    USER_DISLIKE_EVENT_SUCCESS, 
    USER_DISLIKE_EVENT_FAIL, 
    USER_BOOK_SUCCESS,
    USER_BOOK_FAIL,
    USER_BOOK_REQUEST,
    USER_REVIEW_REQUEST,
    USER_REVIEW_SUCCESS,
    USER_REVIEW_FAIL,
    USER_FAVOURITES_REQUEST,
    USER_FAVOURITES_SUCCESS,
    USER_FAVOURITES_FAIL,
    USER_BOOKED_COMPLETED_REQUEST,
    USER_BOOKED_COMPLETED_SUCCESS,
    USER_BOOKED_COMPLETED_FAIL,
    USER_BOOKED_UPCOMING_SUCCESS,
    USER_BOOKED_UPCOMING_FAIL,
    USER_BOOKED_UPCOMING_REQUEST,
    USER_REGISTERED_COMPLETED_REQUEST,
    USER_REGISTERED_COMPLETED_SUCCESS,
    USER_REGISTERED_COMPLETED_FAIL,
    USER_REGISTERED_UPCOMING_REQUEST,
    USER_REGISTERED_UPCOMING_SUCCESS,
    USER_REGISTERED_UPCOMING_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_LOGOUT_FAIL,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT,
    USER_UPDATE_FAIL,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_REQUEST} from "../Constants/User"

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data } = await axios.post(
            '/api/user/login',
            { email, password },
            config
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const logout = (displayAlert = true) => (dispatch ) => {
  localStorage.removeItem('userInfo')
  if(displayAlert)
    alert('Logged out successfully')
  dispatch({ type: USER_LOGOUT })
}


export const register = (name, email, password, contactNumber) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data } = await axios.post(
            '/api/user/register',
            { name, email, password, contactNumber},
            config
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const like = (eventId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_LIKE_EVENT_REQUEST,
        })

        const {
            userLogin: { userInfo },
          } = getState()


      
          const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }

        const { data } = await axios.post(
            '/api/user/events/like',
            { eventId },
            config
        )

        dispatch({
            type: USER_LIKE_EVENT_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: USER_LIKE_EVENT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const dislike = (eventId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DISLIKE_EVENT_REQUEST,
        })

        const {
            userLogin: { userInfo },
          } = getState()

          console.log(userInfo)
        
          const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
            data : { eventId },
          }

        const { ddata } = await axios.delete(
            '/api/user/events/dislike',
            config,
        )

        dispatch({
            type: USER_DISLIKE_EVENT_SUCCESS,
            payload: ddata,
        })

    } catch (error) {
        dispatch({
            type: USER_DISLIKE_EVENT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const book = (eventId, noOfPeople) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_BOOK_REQUEST,
        })

        const {
            userLogin: { userInfo },
          } = getState()

          console.log(userInfo)
        
          const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            }
          }

        const { ddata } = await axios.post(
            '/api/user/book',
            {eventId, noOfPeople},
            config,
        )

        dispatch({
            type: USER_BOOK_SUCCESS,
            payload: ddata,
        })

    } catch (error) {
        dispatch({
            type: USER_BOOK_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const review = (eventId, comment, rating) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_REVIEW_REQUEST,
        })

        const {
            userLogin: { userInfo },
          } = getState()

          console.log(userInfo)
        
          const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            }
          }

        const { data } = await axios.post(
            '/api/user/events/review',
            {eventId, comment, rating},
            config,
        )

        dispatch({
            type: USER_REVIEW_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: USER_REVIEW_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const favourites = () => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_FAVOURITES_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.get(
        `/api/user/events/liked`,
        config,
      )
  
      dispatch({
        type: USER_FAVOURITES_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: USER_FAVOURITES_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const bookedCompleted = () => async (dispatch, getState) =>  {
    try {
        dispatch({ type: USER_BOOKED_COMPLETED_REQUEST })
  
        const {
          userLogin: { userInfo },
        } = getState()
    
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
        const { data } = await axios.get(
          `/api/user/events/booked/completed`,
          config,
        )
    
        dispatch({
          type: USER_BOOKED_COMPLETED_SUCCESS,
          payload: data,
        })
      } catch (error) {
        dispatch({
          type: USER_BOOKED_COMPLETED_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
      }
}

export const bookedUpcoming = () => async (dispatch, getState) =>  {
    try {
        dispatch({ type: USER_BOOKED_UPCOMING_REQUEST })
  
        const {
          userLogin: { userInfo },
        } = getState()
    
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
        const { data } = await axios.get(
          `/api/user/events/booked/upcoming`,
          config,
        )
    
        dispatch({
          type: USER_BOOKED_UPCOMING_SUCCESS,
          payload: data,
        })
      } catch (error) {
        dispatch({
          type: USER_BOOKED_UPCOMING_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
      }
}

export const registeredCompleted = () => async (dispatch, getState) =>  {
    try {
        dispatch({ type: USER_REGISTERED_COMPLETED_REQUEST })
  
        const {
          userLogin: { userInfo },
        } = getState()
    
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
        const { data } = await axios.get(
          `/api/user/events/registered/completed`,
          config,
        )
    
        dispatch({
          type: USER_REGISTERED_COMPLETED_SUCCESS,
          payload: data,
        })
      } catch (error) {
        dispatch({
          type: USER_REGISTERED_COMPLETED_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
      }
}

export const registeredUpcoming = () => async (dispatch, getState) =>  {
    try {
        dispatch({ type: USER_REGISTERED_UPCOMING_REQUEST })
  
        const {
          userLogin: { userInfo },
        } = getState()
    
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
        const { data } = await axios.get(
          `/api/user/events/registered/upcoming`,
          config,
        )
    
        dispatch({
          type: USER_REGISTERED_UPCOMING_SUCCESS,
          payload: data,
        })
      } catch (error) {
        dispatch({
          type: USER_REGISTERED_UPCOMING_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
      }
}

export const profile = () => async (dispatch, getState) =>  {
  try {
      dispatch({ type: USER_DETAILS_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.get(
        `/api/user/me`,
        config,
      )
  
      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data.user,
      })
    } catch (error) {
      dispatch({
        type: USER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
}


export const updateUser = (name, contactNumber, password) => async (dispatch, getState) =>  {
  try {
      dispatch({ type: USER_UPDATE_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.patch(
        `/api/user/update`,
        { name, contactNumber, password },
        config,
      )
  
      dispatch({
        type: USER_UPDATE_SUCCESS,
        payload: data,
      })

      alert('Save changes!')
    } catch (error) {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
}