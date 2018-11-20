/*
 * action types
 */
export const SHOW_ACTION_EDITOR = 'SHOW_ACTION_EDITOR'
export const HIDE_ACTION_EDITOR = 'HIDE_ACTION_EDITOR'
export const UPDATE_SERVICE_ACTION = 'UPDATE_SERVICE_ACTION'
export const CALCULATE_ENGINEERS = 'CALCULATE_ENGINEERS'
export const UPDATE_SCRUBBER_TIME = 'UPDATE_SCRUBBER_TIME'

/*
* action creators
*/
export function showActionEditor(id) {
  return {type: SHOW_ACTION_EDITOR, id: id}
}

export function hideActionEditor(id) {
  return {type: HIDE_ACTION_EDITOR, id: id}
}

export function updateServiceAction(id, update) {
  return {type: UPDATE_SERVICE_ACTION, id: id, update: update }
}

export function updateCurrentTime(pos) {
  return {type: UPDATE_SCRUBBER_TIME, scrubber: pos }
}

export function calculateEngineers() {
  return {type: CALCULATE_ENGINEERS}
}