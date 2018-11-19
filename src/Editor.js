import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';
import {updateServiceAction, hideActionEditor} from './actions';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    // console.log(this.props);
  }

  handleChange(event) {
    const target = event.target;
    const val = target.value;
    const name = target.name; 
    
    // this.props.dispatch({type: 'UPDATE_SERVICE_ACITON', field: name, value: val});
    this.props.handleChange(this.props.id, name, val);      
  }

  handleTimeChange(date){
    return;
  //   this.props.dispatch({type: 'UPDATE_SERVICE_ACITON_TIME', start: date});
  //   // this.props.actions.handleServiceActionUpdate(this.props.id, 'start', date);
  }

  handleClose() {
    // this.props.dispatch({type: 'HIDE_ACTION_EDITOR', id: this.props.id });
    this.props.handleClose(this.props.id);
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
          <input type="number" name="duration" defaultValue={parseInt(this.props.attributes.duration)}  onChange={this.handleChange} />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    
  };
}  

const mapDispatchToProps = dispatch => {
  return {
      handleClose: (id) => {
        dispatch( hideActionEditor(id));
      },
      handleChange: (id, name, val) => {
        dispatch(updateServiceAction(id, name, val));
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);