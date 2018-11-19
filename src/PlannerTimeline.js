import React from 'react';
import moment from 'moment';
import Timeline from 'react-visjs-timeline';
// import ErrorBoundary from 'ErrorBoundary';
import { connect } from 'react-redux';


class PlannerTimeline extends React.Component {

  constructor(props) {
    super(props);
    this.handleServiceActionClick = this.handleServiceActionClick.bind(this);

    this.items = this.props.serviceActions.map((sa, context) => {
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

    this.groups = [
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

    this.customTimes = {
      scrubber: this.props.scrubber
    }

    this.options = {
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
        // props.actions.handleServiceActionTimeChange(item);
      }
    }

  }


  handleServiceActionClick(event) {
    let id = event.item;
    this.props.dispatch({type:'SHOW_ACTION_EDITOR', 'id': id});
  }

	render() {

		return(
			<div id="timeline">
				<Timeline
          items={this.items}  
          groups={this.groups}
          options={this.options} 
          customTimes={this.customTimes} 
          doubleClickHandler={this.handleServiceActionClick} 
          timechangeHandler={this.props.handleScrubberUpdate}
        />
        {/*<div id="toggles">
          <label>Enable Timeline Zooming <input type="checkbox" name="zoom-toggle" onChange={this.props.toggleTimelineZoom}/></label>
          <label>Enable Auto-Advancing Scrubber <input type="checkbox" name="scrubber-toggle" onChange={this.props.toggleAutoScrub}/></label>
        </div>*/}
			</div>
			)
	} 
}

function mapStateToProps(state) {
  return {
    ...state
  };
}

// export { PlannerTimeline };
export default connect(mapStateToProps)(PlannerTimeline);