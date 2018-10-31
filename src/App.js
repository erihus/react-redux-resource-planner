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
        machineId: 2,
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

    // const weekStart = moment().startOf('day');
    // const weekEnd = moment(weekStart).add(7, 'days');
    // const customTimes = {
    //   scrubber: moment() 
    // };
    // const options = {
    //   width: '90%',
    //   // height: '300px',
    //   stack: true,
    //   showMajorLabels: true,
    //   showCurrentTime: false,
    //   start: weekStart,
    //   end: weekEnd,
    //   zoomMin: 1000000,
    //   type: 'range',
    //   editable: true,
    //   format: {
    //     minorLabels: {
    //       minute: 'h:mma',
    //       hour: 'ha'
    //     }
    //   }
    // }

    // const groups = [
    //   {
    //     id: 1,
    //     content: 'Machine 1',
    //   },
    //   {
    //     id: 2,
    //     content: 'Machine 2'
    //   },
    //   {
    //     id: 3,
    //     content: 'Machine 3'
    //   }
    // ];

    // const items = [
    //   {
    //     start: weekStart,
    //     end: moment(weekStart).add(12, 'h'),
    //     content: 'Service Action A',
    //     group: 1,
    //     editable:true
    //   },
    //   {
    //     start: moment(weekStart).add(1, 'day'),//new Date(2010, 7, 15),
    //     end: moment(weekStart).add(1, 'day').add(24, 'hours'),//new Date(2010, 8, 2),  // end is optional
    //     content: 'Service Action B',
    //     group: 2
    //   },
    //   {
    //     start: moment(weekStart).add(3, 'day'),//new Date(2010, 7, 15),
    //     end: moment(weekStart).add(3, 'day').add(48, 'hours'),//new Date(2010, 8, 2),  // end is optional
    //     content: 'Service Action C',
    //     group: 1
    //   },
    //   {
    //     start: moment(weekStart).add(4, 'day'),//new Date(2010, 7, 15),
    //     end: moment(weekStart).add(4, 'day').add(12, 'hours'),//new Date(2010, 8, 2),  // end is optional
    //     content: 'Service Action D',
    //     group: 2
    //   }
    // ];

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
