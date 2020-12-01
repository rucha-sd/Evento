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
  EVENT_GET_FAIL} from "../Constants/Event"

export const eventSortReducer = (state = { events: [] }, action) => {
    switch (action.type) {
      case EVENT_SORT_REQUEST:
        return { loading: true, events: [] }
      case EVENT_SORT_SUCCESS:
        return {
          loading: false,
          events: action.payload.sorted,
        }
      case EVENT_SORT_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

export const eventTypeandCatReducer = (state = { typesandcat: []}, action) => {
    switch (action.type) {
      case EVENT_TYPECAT_REQUEST:
        return { loading: true, typesandcat: [] }
      case EVENT_TYPECAT_SUCCESS:
        return {
          loading: false,
          typesandcat: action.payload,
        }
      case EVENT_TYPECAT_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const eventAddReducer = (state = {}, action) => {
    switch (action.type) {
      case EVENT_ADD_REQUEST:
        return { loading: true, event: {} }
      case EVENT_ADD_SUCCESS:
        return {
          loading: false,
          event: action.payload,
        }
      case EVENT_ADD_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const eventGetReducer = (state = {}, action) => {
    switch (action.type) {
      case EVENT_GET_REQUEST:
        return { loading: true, event: {} }
      case EVENT_GET_SUCCESS:
        return {
          loading: false,
          events: action.payload,
        }
      case EVENT_GET_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }