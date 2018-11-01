import React, { Component } from 'react';
// import Timeline from 'react-visjs-timeline';
// import moment from 'moment';
import PlannerTimeline from './PlannerTimeline.component';
import {PlannerContext} from './Planner.context';
import './App.css';



class App extends Component {
  state = {
    totalEngineers: 0,
    serviceActions: [
      {
        name: 'A',
        machineId: 1,
        startDay: 0,
        duration: 12,
        engineers: 2,
      },
      {
        name: 'B',
        machineId: 2,
        startDay: 1,
        duration: 24,
        engineers: 3
      },
      {
        name: 'C',
        machineId: 1,
        startDay: 3,
        duration: 48,
        engineers: 5
      },
      {
        name: 'D',
        machineId: 2,
        startDay: 4,
        duration: 12,
        engineers: 4
      }
    ]
  }


  render() {
    return (
      <div className="App">
        <PlannerContext.Provider value={this.state}>
          <PlannerTimeline />
        </PlannerContext.Provider>  
      </div>
    );
  }
}

export default App;
