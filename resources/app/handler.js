/* globals window */
import {
  ADD_LOG,
  CLEAR_LOGS,
  SET_TREE,
  SET_PAGE_METADATA,
  SET_LAYER_METADATA,
  ADD_ACTION,
  GROUP,
  GROUP_END,
  SET_SCRIPT_RESULT,
} from '../../shared-actions'
import { addAction } from './redux/ducks/actions'
import { addLog, clearLogs, group, groupEnd } from './redux/ducks/logs'
import {
  setTree,
  setLayerMetadata,
  setPageMetadata,
} from './redux/ducks/elements'
import { setScriptResult } from './redux/ducks/playground'

export default function(dispatch) {
  /**
   * Bridge function that allows the plugin to send data to the
   * web view by calling this function.
   * It is globally defined on the window object in index.js!
   */
  window.sketchBridge = jsonData => {
    switch (jsonData.name) {
      case ADD_LOG:
        return dispatch(addLog(jsonData.payload))
      case CLEAR_LOGS:
        return dispatch(clearLogs(jsonData.payload))
      case SET_TREE:
        return dispatch(setTree(jsonData.payload))
      case SET_PAGE_METADATA:
        return dispatch(setPageMetadata(jsonData.payload))
      case SET_LAYER_METADATA:
        return dispatch(setLayerMetadata(jsonData.payload))
      case ADD_ACTION:
        return dispatch(addAction(jsonData.payload))
      case GROUP:
        return dispatch(group(jsonData.payload))
      case GROUP_END:
        return dispatch(groupEnd(jsonData.payload))
      case SET_SCRIPT_RESULT:
        return dispatch(setScriptResult(jsonData.payload))
      default:
        return console.error(
          new Error('unknown action received from the bridge')
        )
    }
  }
}
