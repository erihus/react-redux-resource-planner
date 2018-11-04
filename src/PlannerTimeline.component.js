import React from 'react';
import moment from 'moment';
import Timeline from 'react-visjs-timeline';
import {PlannerConsumer} from './Planner.context';



const PlannerTimeline = () => (

	<PlannerConsumer>
		{context => {
      // console.log(context.state.scrubber);
      const customTimes = {
        scrubber: context.state.scrubber
      }
      const options = {
        width: '90%',
        // height: '300px',
        stack: true,
        showMajorLabels: true,
        showCurrentTime: true,
        showTooltips: true,
        start: context.state.weekStart,
        end: context.state.weekEnd,
        zoomMin: 1000000,
        type: 'range',
        zoomable: false,
        moveable: false
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

      const items = context.state.serviceActions.map((sa) => {
        const start = sa.start;//moment(context.state.weekStart).add(sa.startDay, 'days');
        const end = moment(start).add(sa.duration, 'hours');
        return  {
          id: sa.id,
          start: start,
          end: end,
          content: sa.name,
          group: sa.machineId,
          title: 'Engineers: '+sa.engineers+', Duration:'+sa.duration+' hours'
        }
      });
 
			return(
				<div id="timeline">
				<h4>Total Engineers Needed: {context.state.totalEngineers}</h4>
				<Timeline options={options} items={items} groups={groups} customTimes={customTimes} selectHandler={context.actions.handleServiceActionClick} timechangeHandler={context.actions.handleScrubberUpdate} />
				</div>
			)
		}}
	</PlannerConsumer>

);

export default PlannerTimeline;