import React from 'react';
import moment from 'moment';
import Timeline from 'react-visjs-timeline';
import {PlannerConsumer} from './Planner.context';


const PlannerTimeline = () => (

	<PlannerConsumer>
		{context => {
      const customTimes = {
        scrubber: context.state.scrubber
      }

      const items = context.state.serviceActions.map((sa, context) => {
        const start = sa.start;
        const end = moment(start).add(sa.duration, 'hours');
        return  {
          id: sa.id,
          start: start,
          end: end,
          content: sa.name,
          group: sa.machineId,
          title: 'Engineers: '+sa.engineers+', Duration:'+sa.duration+' hours (double click to edit)',
        }
      });

      const options = {
        width: '90%',
        stack: true,
        showMajorLabels: true,
        showMinorLabels: true,
        showCurrentTime: false,
        showTooltips: true,
        start: context.state.weekStart,
        end: context.state.weekEnd,
        zoomMin: 1000000,
        type: 'range',
        zoomable: true,
        moveable: true,
        editable: {
          updateTime: true,
          overrideItems: true
        },
        snap: null,
        onMove: function(item) {
          context.actions.handleServiceActionTimeChange(item);
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
 
			return(
				<div id="timeline">
				<Timeline
          items={items}  
          groups={groups}
          options={options} 
          customTimes={customTimes} 
          doubleClickHandler={context.actions.handleServiceActionClick} 
          timechangeHandler={context.actions.handleScrubberUpdate}
        />
        <p id="eng-total"><strong>{context.state.totalEngineers}</strong> Total Engineers Needed For {context.state.scrubber.format('MMMM Do YYYY h:mm a')}</p>
				</div>
			)
		}}
	</PlannerConsumer>

);

export default PlannerTimeline;