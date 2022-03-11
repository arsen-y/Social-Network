import React from 'react'
import { addPostActionCreator } from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts
  }

}

const manDispatchToProps = (dispatch) => {
  return {
    addPost: text => { dispatch(addPostActionCreator(text)) }
  }

}

export default connect(mapStateToProps, manDispatchToProps)(MyPosts)
