import React from 'react';
import { connect } from 'react-redux'

import * as actions from '../actions/headerActions';

let mapStateToProps = (state) => {
  return state.calendar ? state.calendar : state;
}

let createHandlers = (dispatch) => {
  return {
    close: () => {
    	dispatch(actions.closeBookingAction());
    },
    validate: () => {
      dispatch(actions.validateBookingAction());
    }
  }
}

class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  submit() {
    this.props.close();
  }

  renderFooter() {
    if (this.props.type === 'OkCancel') {
      return (
        <footer className='rc-modal-footer'>
          <button className='rc-modal-button' onClick={this.props.close}>Ok</button>
          <button className='rc-modal-button' onClick={this.props.close}>Cancel</button>
        </footer>
      )
    }
  }

  renderBody() {
    if (this.props.children) {
      return this.props.children;
    } else {
      return "Please note: all prices are dependant on consultation within the salon";
    }
  }

  render() {
    const modalCss = this.props.showModal ? 'rc-modal in' : 'rc-modal';
    return (
      <div className={modalCss}>
        <div className='rc-modal-dialog'>
          <header className='rc-modal-header'>{this.props.title}</header>
          <div className='rc-modal-body'>{this.renderBody()}</div>
          {this.renderFooter()}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, createHandlers)(Modal)
