import { HEADER, DEFAULT } from "../Constants/Header"
const initialState = { headerDispay:'block', active:'home' }

function HeaderReducer(state = { headerDispay:'block', active:'home' }, action) {
  switch (action.type) {
    case HEADER:
      return { ...state, ...action.payload }
    case DEFAULT:
      return initialState
    default:
      return state
  }
}
export { HeaderReducer }