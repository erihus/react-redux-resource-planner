import React from 'react';
import moment from 'moment';
import Timeline from 'react-visjs-timeline';
import { connect } from 'react-redux';


class PlannerTimeline extends React.Component {



	render() {
    const customTimes = {
      scrubber: this.props.scrubber
    }

    const items = this.props.serviceActions.map((sa, context) => {
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
      start: this.props.weekStart,
      end: this.props.weekEnd,
      zoomMin: 1000000,
      type: 'range',
      zoomable: (this.props.enableTimelineZoom) ? true : false,
      moveable: (this.props.enableTimelineZoom) ? true : false,
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
          doubleClickHandler={this.props.handleServiceActionClick} 
          timechangeHandler={this.props.handleScrubberUpdate}
        />
        <div id="toggles">
          <label>Enable Timeline Zooming <input type="checkbox" name="zoom-toggle" onChange={this.props.toggleTimelineZoom}/></label>
          <label>Enable Auto-Advancing Scrubber <input type="checkbox" name="scrubber-toggle" onChange={this.props.toggleAutoScrub}/></label>
        </div>
        <p id="eng-total"><strong>{this.props.totalEngineers}</strong> Total Engineers Needed For {this.props.scrubber.format('MMMM Do YYYY h:mm a')}</p>
			</div>
			)
	} 
}

function mapStateToProps(state) {
  return {
    ...state
  };
}

export { PlannerTimeline };
export default connect(mapStateToProps)(PlannerTimeline);