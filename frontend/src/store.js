import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  userLoginReducer,
  userRegisterReducer,
  userLikeEventReducer,
  userDislikeEventReducer,
  userBookEventReducer,
  userReviewEventReducer,
  userFavouritesReducer,
  userBookedCompletedReducer,
  userBookedUpcomingReducer,
  userRegisteredCompletedReducer,
  userRegisteredUpcomingReducer,
  userProfileReducer,
  userLogoutReducer,
  userUpdateReducer
} from './Reducers/User'
import { HeaderReducer } from './Reducers/Header'
import { eventSortReducer, eventTypeandCatReducer, eventAddReducer, eventGetReducer } from './Reducers/Event'

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  header: HeaderReducer,
  filteredevents : eventSortReducer,
  likeEvent : userLikeEventReducer,
  dislikedEvent : userDislikeEventReducer,
  bookEvent : userBookEventReducer,
  reviewEvent : userReviewEventReducer,
  favourites : userFavouritesReducer,
  bookedCompleted : userBookedCompletedReducer,
  bookedUpcoming : userBookedUpcomingReducer,
  registeredCompleted : userRegisteredCompletedReducer,
  registeredUpcoming : userRegisteredUpcomingReducer,
  typeandCat : eventTypeandCatReducer,
  addEvent : eventAddReducer,
  profile : userProfileReducer,
  update : userUpdateReducer,
  allEvents : eventGetReducer,
})

const middleware = [thunk]


const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
