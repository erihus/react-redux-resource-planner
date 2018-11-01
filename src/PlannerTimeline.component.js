import React, { Component } from 'react';
import Timeline from 'react-visjs-timeline';
import moment from 'moment';
import {PlannerContext, PlannerConsumer} from './Planner.context';



const PlannerTimeline = () => (

	<PlannerConsumer>
		{context => {
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
        start: context.state.weekStart,
        end: context.state.weekEnd,
        zoomMin: 1000000,
        type: 'range',
        editable: false,
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

      const items = context.state.serviceActions.map((action) => {
        let start = moment(context.state.weekStart).add(action.startDay, 'days');
        let end = moment(start).add(action.duration, 'hours');
        return  {
          id: action.id,
          start: start,
          end: end,
          content: 'sa.'+action.name,
          group: action.machineId,
          title: 'Engineers: '+action.engineers
        }
      });

			return(
				<div>
				<h4>Total Engineers Needed: {context.state.totalEngineers}</h4>
				<Timeline options={options} items={items} groups={groups} customTimes={customTimes} selectHandler={context.actions.handleServiceActionClick} />
				</div>
			)
		}}
	</PlannerConsumer>

);

export default PlannerTimeline;