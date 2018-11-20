import React, { Component } from 'react';
import moment from 'moment';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import PlannerTimeline from './PlannerTimeline';
import TotalEngineers from './TotalEngineers';
import ServiceEditors from './ServiceEditors';
import reducer from './reducers';
import './App.css';


const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
// const unsubscribe = store.subscribe(() => console.log(store.getState()))


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


  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <PlannerTimeline />
        </Provider>
        <Provider store={store}>
          <TotalEngineers />
        </Provider>
        <Provider store={store}>
          <ServiceEditors />
        </Provider>
      </div>
    );
  }
}

export default App;
