import React from 'react';
import moment from 'moment';
import Timeline from 'react-visjs-timeline';
// import ErrorBoundary from 'ErrorBoundary';
import { connect } from 'react-redux';
import {showActionEditor} from './actions';

class PlannerTimeline extends React.Component {

  constructor(props) {
    super(props);
    this.handleServiceActionClick = this.handleServiceActionClick.bind(this);
    this.handleServiceActionClick = this.handleServiceActionClick.bind(this);
  }

  handleServiceActionClick(event) {
    let id = event.item;
    this.props.handleServiceActionClick(id);
  }

  handleScrubberUpdate() {

  }

	render() {
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

    const customTimes = {
      scrubber: this.props.scrubber
    }

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
        // props.actions.handleServiceActionTimeChange(item);
      }
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
		return(
			<div id="timeline">
				<Timeline
          items={items}  
          groups={groups}
          options={options} 
          customTimes={customTimes} 
          doubleClickHandler={this.handleServiceActionClick} 
          timechangeHandler={this.handleScrubberUpdate}
        />
        {/*<div id="toggles">
          <label>Enable Timeline Zooming <input type="checkbox" name="zoom-toggle" onChange={this.props.toggleTimelineZoom}/></label>
          <label>Enable Auto-Advancing Scrubber <input type="checkbox" name="scrubber-toggle" onChange={this.props.toggleAutoScrub}/></label>
        </div>*/}
			</div>
			)
	} 
}

const mapStateToProps = state => {
  return {
    ...state.serviceActionReducer
  };
}

const mapDispatchToProps = dispatch => {
  return {
    handleServiceActionClick: id => {
      dispatch(showActionEditor(id))
    }    
  }
}



// export { PlannerTimeline };
export default connect(mapStateToProps, mapDispatchToProps)(PlannerTimeline);