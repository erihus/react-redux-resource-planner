import { combineReducers } from 'redux';
import { 
  SHOW_ACTION_EDITOR, 
  HIDE_ACTION_EDITOR, 
  UPDATE_SERVICE_ACTION, 
  CALCULATE_ENGINEERS, 
  UPDATE_SCRUBBER_TIME } from './actions';
import defaultData from './data';
import moment from 'moment';

const serviceActionReducer = (state = defaultData, action) => {
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
  switch(action.type) {
    case UPDATE_SCRUBBER_TIME:
      return {
        ...state,
        scrubber: moment(action.scrubber)
      }
    case CALCULATE_ENGINEERS:
      const time = state.scrubber;
      let activeEngineers = 0;
      state.serviceActions.map(sa => {
        let saStart = sa.start;
        let saEnd = moment(sa.start).add(sa.duration, 'hours');
        if(moment(time).isBetween(saStart, saEnd) || moment(time).isSame(saStart)) {
          activeEngineers += sa.engineers;
        }
        return activeEngineers;
      });
      
      return {
        ...state,
        totalEngineers: activeEngineers
      }          
    default:
      return state;
  }
}

const timelineApp = combineReducers({
  serviceActionReducer,
  totalEngineersReducer
})  

export default timelineApp