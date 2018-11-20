import React from 'react';
import { connect } from 'react-redux'; 
import {calculateEngineers} from './actions';

class TotalEngineers extends React.Component {
 constructor(props) {
    super(props);
    this.calculateEngineers = this.calculateEngineers.bind(this);
  }

  componentDidMount() {
    this.calculateEngineers();
  }

  calculateEngineers() {
    this.props.calculateEngineers();
  }
  
  render() {
    return (
      <p id="eng-total"><strong>{this.props.totalEngineers}</strong> Total Engineers Needed For {this.props.time.format('MMMM Do YYYY h:mm a')}</p>
    )
  }
}

const mapStateToProps = state => {
  return {
    totalEngineers: state.totalEngineers,
    time: state.scrubber,
  };
}

const mapDispatchToProps = dispatch => {
  return {
      calculateEngineers: () => {
        dispatch( calculateEngineers());
      }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TotalEngineers);