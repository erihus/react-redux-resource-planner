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
        start: moment().startOf('day'),
        duration: 12,
        engineers: 2,
        editing: false
      },
      {
        id: 2,
        name: 'B',
        machineId: 2,
        start: moment().startOf('day').add(1,'d'),
        duration: 24,
        engineers: 3,
        editing: false
      },
      {
        id: 3,
        name: 'C',
        machineId: 1,
        start: moment().startOf('day').add(3,'d'),
        duration: 48,
        engineers: 5,
        editing: false
      },
      {
        id: 4,
        name: 'D',
        machineId: 2,
        start: moment().startOf('day').add(4,'d'),
        duration: 12,
        engineers: 4,
        editing: false
      }
    ]
  }

  showActionEditor(id) {
    this.setState({
      serviceActions: this.state.serviceActions.map(sa => (sa.id === id ? 
        Object.assign({}, sa, { editing: true }) : 
        Object.assign({}, sa, { editing: false })
      ))
    });
  }

  calculateEngineers(state) {

  }

  hideActionEditor(id) {
    const newState = {
      serviceActions: this.state.serviceActions.map(sa => (
        Object.assign({}, sa, { editing: false }) : sa        
      ))
    };
    this.setState(newState);
  }

  updateServiceAction(id, field, value) {
    if(field === 'engineers') {
      value = parseInt(value);
    }
    const newState = {
      serviceActions: this.state.serviceActions.map(sa => (sa.id === id ? 
          Object.assign({}, sa, { [field]: value }) : sa   
        ))
    }
    this.setState(newState, 
      () => {
        const time = this.state.scrubber;
        let activeEngineers = 0;
        this.state.serviceActions.map(sa => {
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
      }
    );
  }

  updateServiceActionTime(timelineItem) {
    const newStart = moment(timelineItem.start)
    const newEnd = moment(timelineItem.end);
    const newDuration = newEnd.diff(newStart, 'hours');

    const newState = {
      serviceActions: this.state.serviceActions.map(sa => (sa.id === timelineItem.id ? 
        Object.assign({}, sa, { start: newStart, duration: newDuration }) : sa   
      ))
    }

    this.setState(newState);
  }

  render() {
    return (
      <div className="App">
        <PlannerContext.Provider value={
          {
            state: this.state,
            actions: {
              handleServiceActionClick: event => {
                let id = event.item;
                this.showActionEditor(id);
              },
              handleServiceActionClose: id => {
                this.hideActionEditor(id);
              },
              handleServiceActionUpdate: (id, field, value) => {
                this.updateServiceAction(id,field,value);
              },
              handleServiceActionTimeChange: item => {
                this.updateServiceActionTime(item);
              },
              handleScrubberUpdate: data => {
                const time = data.time;
                let activeEngineers = 0;
                this.state.serviceActions.map((sa) => {
                  let saStart = sa.start;
                  let saEnd = moment(sa.start).add(sa.duration, 'hours');
                  if(moment(time).isBetween(saStart, saEnd)) {
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
