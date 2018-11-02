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
    scrubber: moment(), 
    weekStart: moment().startOf('day'),
    weekEnd: moment(this.weekStart).add(7, 'days'),
    serviceActions: [
      {
        id: 1,
        name: 'A',
        machineId: 1,
        start: moment(this.weekStart).add(8,'hours'),
        duration: 12,
        engineers: 2,
        editing: false
      },
      {
        id: 2,
        name: 'B',
        machineId: 2,
        start: moment(this.weekStart).add(1, 'd'),
        duration: 24,
        engineers: 3,
        editing: false
      },
      {
        id: 3,
        name: 'C',
        machineId: 1,
        start: moment(this.weekStart).add(3, 'd'),
        duration: 48,
        engineers: 5,
        editing: false
      },
      {
        id: 4,
        name: 'D',
        machineId: 2,
        start: moment(this.weekStart).add(4, 'd'),
        duration: 12,
        engineers: 4,
        editing: false
      }
    ]
  }

  render() {
    updateTotalEngineers() {
      const time = this.state.scrubber;
      let activeEngineers = 0;
      this.state.serviceActions.map((sa) => {
        let saStart = sa.start;
        let saEnd = moment(sa.start).add(sa.duration, 'hours');
        if(time.isBetween(saStart, saEnd)) {
          // console.log('sa '+sa.name+' adding '+sa.engineers);
          activeEngineers += sa.engineers;
        }
        return activeEngineers;
      });
      // console.log(activeEngineers);
      const newState = update(this.state, {
        totalEngineers: {$set: activeEngineers},
      });
      // console.log(newState);
      this.setState(newState);
    }
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
              handleServiceActionUpdate: (id, field, value) => {
                if(field === 'engineers') {
                  value = parseInt(value);
                }
                this.setState({
                    serviceActions: this.state.serviceActions.map(sa => (sa.id === id ? 
                      Object.assign({}, sa, { [field]: value }) : sa   
                    ))
                }, () => {
                  const time = this.state.scrubber;
                  let activeEngineers = 0;
                  this.state.serviceActions.map((sa) => {
                    let saStart = sa.start;
                    let saEnd = moment(sa.start).add(sa.duration, 'hours');
                    if(moment(time).isBetween(saStart, saEnd)) {
                      // console.log('sa '+sa.name+' adding '+sa.engineers);
                      activeEngineers += sa.engineers;
                    }
                    return activeEngineers;
                  });
                  const newState = update(this.state, {
                    totalEngineers: {$set: activeEngineers},
                  });
                  this.setState(newState);
                });
              },
              handleScrubberUpdate: (data) => {
                const time = data.time;
                let activeEngineers = 0;
                this.state.serviceActions.map((sa) => {
                  let saStart = sa.start;
                  let saEnd = moment(sa.start).add(sa.duration, 'hours');
                  if(moment(time).isBetween(saStart, saEnd)) {
                    // console.log('sa '+sa.name+' adding '+sa.engineers);
                    activeEngineers += sa.engineers;
                  }
                  return activeEngineers;
                });
                const newState = update(this.state, {
                  totalEngineers: {$set: activeEngineers},
                  scrubber: {$set: moment(time)}
                });
                this.setState(newState);              
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
