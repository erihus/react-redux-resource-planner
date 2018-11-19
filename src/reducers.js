import { combineReducers } from 'redux';
import { SHOW_ACTION_EDITOR, HIDE_ACTION_EDITOR, UPDATE_SERVICE_ACTION } from './actions';
import defaultData from './data';


const serviceActionReducer = (state = defaultData, action) => {
  console.log(action);
  switch (action.type) {
    case SHOW_ACTION_EDITOR:
      return {
        ...state, 
        serviceActions: state.serviceActions.map(sa => {
          return {...sa, editing: sa.id === action.id ? true: false}
        })
      };
    case HIDE_ACTION_EDITOR:
      return {
        ...state, 
        serviceActions: state.serviceActions.map(sa => {
          return {...sa, editing: sa.id === action.id ? false: false}
        })
      };
    case UPDATE_SERVICE_ACTION:
      console.log(action);
      if(action.field === 'engineers') {
        action.value = parseInt(action.value);
      }
      return {
        ...state,
        serviceActions: state.serviceActions.map(sa => (sa.id === action.id ? 
          Object.assign({}, sa, { [action.field]: action.value }) : sa   
        ))
      };
      // const calcEngineers = this.calculateEngineers(newState);
      // newState = {
      //   ...newState,
      //   totalEngineers: calcEngineers
      // }
      // this.setState(newState);
    default:
      return state;
  }
}

const totalEngineersReducer = (state = defaultData, action) => {
  switch(action) {
    default:
      return state;
  }
}

const timelineApp = combineReducers({
  serviceActionReducer,
  totalEngineersReducer
})  

export default timelineApp