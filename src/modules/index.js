import { combineReducers } from 'redux'
import reddit from './reddit'
import user from './user'

export default combineReducers({
  reddit,
  user
})
