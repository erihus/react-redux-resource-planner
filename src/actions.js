/*
 * action types
 */
export const SHOW_ACTION_EDITOR = 'SHOW_ACTION_EDITOR'
export const HIDE_ACTION_EDITOR = 'HIDE_ACTION_EDITOR'
export const UPDATE_SERVICE_ACTION = 'UPDATE_SERVICE_ACTION'

/*
* action creators
*/
export function showActionEditor(id) {
  return {type: SHOW_ACTION_EDITOR, id: id}
}

export function hideActionEditor(id) {
  return {type: HIDE_ACTION_EDITOR, id: id}
}


export function updateServiceAction(id, field, value) {
  return {type: UPDATE_SERVICE_ACTION, id: id, field: field, value: value }
} 