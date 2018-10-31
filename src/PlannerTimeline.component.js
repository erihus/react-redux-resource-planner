import React, { Component } from 'react';
import Timeline from 'react-visjs-timeline';
import moment from 'moment';
import {PlannerContext, PlannerConsumer} from './Planner.context';


const weekStart = moment().startOf('day');
const weekEnd = moment(weekStart).add(7, 'days');
const customTimes = {
  scrubber: moment() 
};
const options = {
  width: '90%',
  // height: '300px',
  stack: true,
  showMajorLabels: true,
  showCurrentTime: false,
  start: weekStart,
  end: weekEnd,
  zoomMin: 1000000,
  type: 'range',
  editable: true,
  format: {
    minorLabels: {
      minute: 'h:mma',
      hour: 'ha'
    }
  }
}

const groups = [
  {
    id: 1,
    content: 'Machine 1',
  },
  {
    id: 2,
    content: 'Machine 2'
  },
  {
    id: 3,
    content: 'Machine 3'
  }
];

const items = [
  {
    start: weekStart,
    end: moment(weekStart).add(12, 'h'),
    content: 'Service Action A',
    group: 1,
    editable:true
  },
  {
    start: moment(weekStart).add(1, 'day'),//new Date(2010, 7, 15),
    end: moment(weekStart).add(1, 'day').add(24, 'hours'),//new Date(2010, 8, 2),  // end is optional
    content: 'Service Action B',
    group: 2
  },
  {
    start: moment(weekStart).add(3, 'day'),//new Date(2010, 7, 15),
    end: moment(weekStart).add(3, 'day').add(48, 'hours'),//new Date(2010, 8, 2),  // end is optional
    content: 'Service Action C',
    group: 1
  },
  {
    start: moment(weekStart).add(4, 'day'),//new Date(2010, 7, 15),
    end: moment(weekStart).add(4, 'day').add(12, 'hours'),//new Date(2010, 8, 2),  // end is optional
    content: 'Service Action D',
    group: 2
  }
];

const PlannerTimeline = (props) => (

	<PlannerConsumer>
		{context=> {
			return(
				<div>
				<h4>Total Engineers: {context.totalEngineers}</h4>
				<Timeline options={options} items={items} groups={groups} customTimes={customTimes}/>
				</div>
			)
		}}
	</PlannerConsumer>

);

export default PlannerTimeline;