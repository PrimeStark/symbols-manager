import { combineReducers } from 'redux'

// Import reducers
import actions from './actions'
import logs from './logs'
import elements from './elements'
import playground from './playground'
import settings from './settings'

export default combineReducers({
  actions,
  logs,
  elements,
  playground,
  settings,
})
