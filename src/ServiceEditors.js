import React, { Component } from 'react';
import { connect } from 'react-redux';
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
  };
}

export default connect(mapStateToProps)(ServiceEditors);