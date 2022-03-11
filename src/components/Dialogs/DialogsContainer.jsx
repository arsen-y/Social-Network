import React from 'react'
import { sendMessageCreator } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

const mapStateToProps = state => {
  return {
    dialogsPage: state.dialogsPage, 
  }

}

const manDispatchToProps = dispatch => {
  return {
    sendMessage: body => { dispatch(sendMessageCreator(body)) }
  }

}

export default compose(
  connect(mapStateToProps, manDispatchToProps), 
  withAuthRedirect
)(Dialogs)
