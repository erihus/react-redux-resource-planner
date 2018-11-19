import React, { Component } from 'react';
// import DatePicker from 'react-datepicker';
// import moment from 'moment';
// import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';
// import {PlannerConsumer} from './Planner.context';
import Editor from './Editor';

class ServiceEditors extends Component {
  render() {
    const editors = this.props.serviceActions.map((sa, index) => <Editor id={sa.id} attributes={sa} key={index} /> );
    return (
      <div className="editors">
        {editors}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    serviceActions: state.serviceActions
    // ...state
  };
}


// export default ServiceEditors;
export default connect(mapStateToProps)(ServiceEditors);