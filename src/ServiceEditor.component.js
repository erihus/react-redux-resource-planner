import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import {PlannerConsumer} from './Planner.context';

class ServiceEditor extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const val = target.value;
    const name = target.name; 
    
    this.props.actions.handleServiceActionUpdate(this.props.id, name, val);      
  }

  handleTimeChange(date){
    this.props.actions.handleServiceActionUpdate(this.props.id, 'start', date);
  }

  handleClose() {
    this.props.actions.handleServiceActionClose(this.props.id);
  }

  render() {
    return (
      <div className={`sa-editor ${(this.props.attributes.editing) ? 'open' : ''}`}>
        <button className="sa-editor-close" onClick={this.handleClose}>X</button>
        <form>
          <h4>Edit Service Action {this.props.attributes.name}</h4>
          <label>Number of Engineers</label>
          <input type="number" name="engineers" defaultValue={this.props.attributes.engineers} onChange={this.handleChange} /> 
          <label>Start Date/Time</label>
          <DatePicker
            selected={this.props.attributes.start}
            onChange={this.handleTimeChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="LLL"
            timeCaption="time"
            minDate={moment()}
            maxDate={moment().add(7, 'd')} 
          />
          <label>Duration (hrs)</label>
          <input type="number" name="duration" defaultValue={this.props.attributes.duration}  onChange={this.handleChange} />
        </form>
      </div>
    );
  }
}


const ServiceEditors = (props) => (
 	<PlannerConsumer>
 		
    {context => {
      const editors = context.state.serviceActions.map((sa, index) => <ServiceEditor id={sa.id} attributes={sa} key={index} actions={context.actions} /> );
 		  return (
        <div className="editors">{editors}</div>
      )
    }}
  </PlannerConsumer>
);

export default ServiceEditors;