import { combineReducers } from 'redux'

// Import reducers
import actions from './actions'
import elements from './elements'
import settings from './settings'

export default combineReducers({
  actions,
  elements,
  settings,
})
