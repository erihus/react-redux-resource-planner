import React, { Component } from 'react';
import moment from 'moment';
import {PlannerContext} from './Planner.context';
import PlannerTimeline from './PlannerTimeline.component';
import ServiceEditors from './ServiceEditor.component';
import './App.css';


class App extends Component {

  constructor(props) {
    super(props);
    const defaultData = {
      totalEngineers: 0,
      scrubber: moment().startOf('day'), 
      autoAdvanceScrubber: false,
      enableTimelineZoom: false,
      scrubberInterval: null,
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
    const calcEngineers = this.calculateEngineers(defaultData);
    this.state = {
      ...defaultData,
      totalEngineers: calcEngineers
    };
  }  

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

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

  showActionEditor(id) {
    this.setState({
      serviceActions: this.state.serviceActions.map(sa => (sa.id === id ? 
        Object.assign({}, sa, { editing: true }) : 
        Object.assign({}, sa, { editing: false })
      ))
    });
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
    let newState = {
      ...this.state,
      serviceActions: this.state.serviceActions.map(sa => (sa.id === id ? 
          Object.assign({}, sa, { [field]: value }) : sa   
        ))
    }
    const calcEngineers = this.calculateEngineers(newState);
    newState = {
      ...newState,
      totalEngineers: calcEngineers
    }
    this.setState(newState);
  }

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
                let newState = {
                  ...this.state,
                  scrubber: moment(data.time)
                }
                const calcEngineers = this.calculateEngineers(newState);
                newState = {
                  ...newState,
                  totalEngineers: calcEngineers
                }
                this.setState(newState);              
              },
              toggleTimelineZoom: () => {
                this.setState({enableTimelineZoom:(this.state.enableTimelineZoom) ? false : true });
              },
              toggleAutoScrub: event => {
                const checked = event.target.checked;
                this.toggleAutoScrubber(checked);
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
