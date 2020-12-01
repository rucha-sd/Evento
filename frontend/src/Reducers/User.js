import { USER_REGISTER_REQUEST,
     USER_REGISTER_SUCCESS, 
     USER_REGISTER_FAIL, 
     USER_LOGIN_REQUEST,
     USER_LOGIN_SUCCESS,
     USER_LOGIN_FAIL,
     USER_LOGOUT,
     USER_LIKE_EVENT_SUCCESS,
     USER_LIKE_EVENT_REQUEST,
     USER_LIKE_EVENT_FAIL,
     USER_DISLIKE_EVENT_REQUEST,
     USER_DISLIKE_EVENT_SUCCESS,
     USER_DISLIKE_EVENT_FAIL,
     USER_BOOK_REQUEST,
     USER_BOOK_SUCCESS,
     USER_BOOK_FAIL,
     USER_REVIEW_REQUEST,
     USER_REVIEW_SUCCESS,
     USER_REVIEW_FAIL,
     USER_FAVOURITES_REQUEST,
     USER_FAVOURITES_SUCCESS,
     USER_FAVOURITES_FAIL,
     USER_BOOKED_COMPLETED_REQUEST,
     USER_BOOKED_COMPLETED_SUCCESS,
     USER_BOOKED_COMPLETED_FAIL,
     USER_BOOKED_UPCOMING_REQUEST,
     USER_BOOKED_UPCOMING_SUCCESS,
     USER_BOOKED_UPCOMING_FAIL,
     USER_REGISTERED_UPCOMING_REQUEST,
     USER_REGISTERED_UPCOMING_SUCCESS,
     USER_REGISTERED_UPCOMING_FAIL,
     USER_REGISTERED_COMPLETED_REQUEST,
     USER_REGISTERED_COMPLETED_SUCCESS,
     USER_REGISTERED_COMPLETED_FAIL,
     USER_DETAILS_REQUEST,
     USER_DETAILS_SUCCESS,
     USER_DETAILS_FAIL,
     USER_LOGOUT_REQUEST,
     USER_LOGOUT_SUCCESS,
     USER_LOGOUT_FAIL,
     USER_UPDATE_FAIL,
     USER_UPDATE_SUCCESS,
     USER_UPDATE_REQUEST} from "../Constants/User"

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_LOGIN_REQUEST:
        return { loading: true }
      case USER_LOGIN_SUCCESS:
        return { loading: false, userInfo: action.payload }
      case USER_LOGIN_FAIL:
        return { loading: false, error: action.payload }
      case USER_LOGOUT:
        return {}
      default:
        return state
    }
  }
  
  export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_REGISTER_REQUEST:
        return { loading: true }
      case USER_REGISTER_SUCCESS:
        return { loading: false, userInfo: action.payload }
      case USER_REGISTER_FAIL:
        return { loading: false, error: action.payload }
      case USER_LOGOUT:
          return {}
      default:
        return state
    }
  }

export const userLikeEventReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LIKE_EVENT_REQUEST:
      return { loading: true }
    case USER_LIKE_EVENT_SUCCESS:
      return { loading: false, liked: action.payload }
    case USER_LIKE_EVENT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userDislikeEventReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DISLIKE_EVENT_REQUEST:
      return { loading: true }
    case USER_DISLIKE_EVENT_SUCCESS:
      return { loading: false, disliked: action.payload }
    case USER_DISLIKE_EVENT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userBookEventReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_BOOK_REQUEST:
      return { loading: true }
    case USER_BOOK_SUCCESS:
      return { loading: false, booking: action.payload }
    case USER_BOOK_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userReviewEventReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REVIEW_REQUEST:
      return { loading: true }
    case USER_REVIEW_SUCCESS:
      return { loading: false, review: action.payload }
    case USER_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userFavouritesReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FAVOURITES_REQUEST:
      return { loading: true }
    case USER_FAVOURITES_SUCCESS:
      return { loading: false, favourites: action.payload }
    case USER_FAVOURITES_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userBookedUpcomingReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_BOOKED_UPCOMING_REQUEST:
      return { loading: true }
    case USER_BOOKED_UPCOMING_SUCCESS:
      return { loading: false, bookedUpcoming: action.payload }
    case USER_BOOKED_UPCOMING_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userBookedCompletedReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_BOOKED_COMPLETED_REQUEST:
      return { loading: true }
    case USER_BOOKED_COMPLETED_SUCCESS:
      return { loading: false, bookedCompleted: action.payload }
    case USER_BOOKED_COMPLETED_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userRegisteredUpcomingReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTERED_UPCOMING_REQUEST:
      return { loading: true }
    case USER_REGISTERED_UPCOMING_SUCCESS:
      return { loading: false, registeredUpcoming: action.payload }
    case USER_REGISTERED_UPCOMING_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userRegisteredCompletedReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTERED_COMPLETED_REQUEST:
      return { loading: true }
    case USER_REGISTERED_COMPLETED_SUCCESS:
      return { loading: false, registeredCompleted: action.payload }
    case USER_REGISTERED_COMPLETED_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true }
    case USER_DETAILS_SUCCESS:
      return { loading: false, profile: action.payload }
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}


export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true }
    case USER_UPDATE_SUCCESS:
      return { loading: false, profileupdate: action.payload }
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
