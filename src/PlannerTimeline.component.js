import React, { Component } from 'react';
import Timeline from 'react-visjs-timeline';
import moment from 'moment';
import {PlannerContext, PlannerConsumer} from './Planner.context';


const PlannerTimeline = (props) => (

	<PlannerConsumer>
		{context=> {
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
        showTooltips: true,
        start: weekStart,
        end: weekEnd,
        zoomMin: 1000000,
        type: 'range',
        editable: false,
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

      const items = context.serviceActions.map((action) => {
        let start = moment(weekStart).add(action.startDay, 'days');
        let end = moment(start).add(action.duration, 'hours');
        return  {
          start: start,
          end: end,
          content: 'sa.'+action.name,
          group: action.machineId,
          title: 'Engineers: '+action.engineers
        }
      });

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