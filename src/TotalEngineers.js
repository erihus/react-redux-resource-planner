import React from 'react';
import { connect } from 'react-redux'; 

class TotalEngineers extends React.Component {
 render() {
  return (
    <p id="eng-total"><strong>{this.props.totalEngineers}</strong> Total Engineers Needed For {this.props.time.format('MMMM Do YYYY h:mm a')}</p>
  )
 }
}

function mapStateToProps(state) {
  return {
    totalEngineers: state.totalEngineers,
    time: state.scrubber,
  };
}

export default connect(mapStateToProps)(TotalEngineers);