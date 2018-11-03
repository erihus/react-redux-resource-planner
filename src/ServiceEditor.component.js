import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {PlannerConsumer} from './Planner.context';

class ServiceEditor extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
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

  render() {
    return (
      <form style={{display: (this.props.attributes.editing) ? 'block' : 'none'}}>
        <h5>Edit Service Action {this.props.attributes.name}</h5>
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
        />
        <label>Duration (hrs)</label>
        <input type="number" name="duration" defaultValue={this.props.attributes.duration}  onChange={this.handleChange} />
      </form>
    );
  }
}


const ServiceEditors = (props) => (
 	<PlannerConsumer>
 		
    {context => {
      const editors = context.state.serviceActions.map((sa, index) => <ServiceEditor id={sa.id} attributes={sa} key={index} actions={context.actions}/> );
 		  return (
        <div className="editors">{editors}</div>
      )
    }}
  </PlannerConsumer>
);

export default ServiceEditors;