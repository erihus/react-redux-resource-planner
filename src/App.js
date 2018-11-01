import React, { Component } from 'react';
import moment from 'moment';
import update from 'immutability-helper';
import {PlannerContext} from './Planner.context';
import PlannerTimeline from './PlannerTimeline.component';
import ServiceEditors from './ServiceEditor.component';
import './App.css';



class App extends Component {
  state = {
    totalEngineers: 0,
    weekStart: moment().startOf('day'),
    weekEnd: moment(this.weekStart).add(7, 'days'),
    serviceActions: [
      {
        id: 1,
        name: 'A',
        machineId: 1,
        startDay: 0,
        duration: 12,
        engineers: 2,
        editing: false
      },
      {
        id: 2,
        name: 'B',
        machineId: 2,
        startDay: 1,
        duration: 24,
        engineers: 3,
        editing: false
      },
      {
        id: 3,
        name: 'C',
        machineId: 1,
        startDay: 3,
        duration: 48,
        engineers: 5,
        editing: false
      },
      {
        id: 4,
        name: 'D',
        machineId: 2,
        startDay: 4,
        duration: 12,
        engineers: 4,
        editing: false
      }
    ]
  }



  render() {
    return (
      <div className="App">
        <PlannerContext.Provider value={
          {
            state: this.state,
            actions: {
              handleServiceActionClick: event => {
                  let id = event.items[0];
                  this.setState({
                    serviceActions: this.state.serviceActions.map(sa => (sa.id === id ? 
                      Object.assign({}, sa, { editing: true }) : 
                      Object.assign({}, sa, { editing: false })
                    ))
                  });
              },
              handleEngineerChange: (id, value) => {
                console.log('context engineer event handler');
                console.log(id);
                console.log(value);

              },
              handleDurationChange: (id, value) => {
                console.log('context engineer event handler');
                console.log(id);
                console.log(value);
              }
            }
          }
        }>
          <PlannerTimeline />
          <ServiceEditors />
        </PlannerContext.Provider>
        
      </div>
    );
  }
}

export default App;
