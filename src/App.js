import React, { Component } from 'react';
import moment from 'moment';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import PlannerTimeline from './PlannerTimeline';
import TotalEngineers from './TotalEngineers';
import ServiceEditors from './ServiceEditors';
import timelineApp from './reducers';
import './App.css';




// const reducer = (state = defaultData, action) => {
//   console.log(action);
//   switch (action.type) {
//     case 'SHOW_ACTION_EDITOR':
//       return {
//         ...state, 
//         serviceActions: state.serviceActions.map(sa => {
//           return {...sa, editing: sa.id === action.id ? true: false}
//         })
//       };
//       break;
//     case 'HIDE_ACTION_EDITOR':
//       return {
//         ...state, 
//         serviceActions: state.serviceActions.map(sa => {
//           return {...sa, editing: sa.id === action.id ? false: false}
//         })
//       };
//       break;
//     case 'UPDATE_SERVICE_ACTION':
//       if(action.field === 'engineers') {
//         action.value = parseInt(action.value);
//       }
//       return {
//         ...state,
//         serviceActions: state.serviceActions.map(sa => (sa.id === action.id ? 
//           Object.assign({}, sa, { [action.field]: action.value }) : sa   
//         ))
//       };
//       // const calcEngineers = this.calculateEngineers(newState);
//       // newState = {
//       //   ...newState,
//       //   totalEngineers: calcEngineers
//       // }
//       // this.setState(newState);
//       break;
//     default:
//       return state;
//   }
// }


const store = createStore(
  timelineApp,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

);
const unsubscribe = store.subscribe(() => console.log(store.getState()))


class App extends Component {

  toggleAutoScrubber(checked) {
    if(checked) {
      let timer = setInterval(() => {this.advanceScrubber()}, 6000);
      const newState = {
        ...this.state,
        autoAdvanceScrubber: true,
        scrubberInterval: timer
      }
      this.setState(newState);
    } else {
      clearInterval(this.state.scrubberInterval);
      this.setState({
        autoAdvanceScrubber: false,
        scrubberInterval: null
      });
    }
  }

  advanceScrubber() {
    let newTime = this.state.scrubber.add(6, 'h');
    newTime = (newTime.isAfter(this.state.weekEnd)) ? moment() : newTime
    let newState = {
      ...this.state,
        scrubber: newTime
    };
    const calcEngineers = this.calculateEngineers(newState)
    newState = {
      ...newState,
      totalEngineers: calcEngineers
    }
    this.setState(newState);
  }

  calculateEngineers(state) { //not using this.state because it may not have been updated yet, instead passing in temporary new state object
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
        
    return activeEngineers;
  }

  // hideActionEditor(id) {
  //   const newState = {
  //     serviceActions: this.state.serviceActions.map(sa => (
  //       Object.assign({}, sa, { editing: false }) : sa        
  //     ))
  //   };
  //   this.setState(newState);
  // }

  // updateServiceAction(id, field, value) {
  //   if(field === 'engineers') {
  //     value = parseInt(value);
  //   }
  //   let newState = {
  //     ...this.state,
  //     serviceActions: this.state.serviceActions.map(sa => (sa.id === id ? 
  //         Object.assign({}, sa, { [field]: value }) : sa   
  //       ))
  //   }
  //   const calcEngineers = this.calculateEngineers(newState);
  //   newState = {
  //     ...newState,
  //     totalEngineers: calcEngineers
  //   }
  //   this.setState(newState);
  // }

  updateServiceActionTime(timelineItem) {
    const newStart = moment(timelineItem.start)
    const newEnd = moment(timelineItem.end);
    const newDuration = newEnd.diff(newStart, 'hours');

    let newState = {
      ...this.state,
      serviceActions: this.state.serviceActions.map(sa => (sa.id === timelineItem.id ? 
        Object.assign({}, sa, { start: newStart, duration: newDuration }) : sa   
      ))
    }

    const calcEngineers = this.calculateEngineers(newState);
    newState = {
      ...newState,
      totalEngineers: calcEngineers
    } 
    this.setState(newState);
  }

  render() {
    return (
      <div className="App">

        <Provider store={store}>
          <PlannerTimeline />
        </Provider>
        {/*<Provider store={store}>
          <TotalEngineers />
        </Provider>*/}
        <Provider store={store}>
          <ServiceEditors />
        </Provider>
      </div>
    );
  }
}

export default App;
