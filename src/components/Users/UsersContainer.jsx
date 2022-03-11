import React from 'react'
import { connect } from 'react-redux';
import { follow, unfollow, toggleFollowingProgress, getUsers } from '../../redux/users-reducer';
import Users from './Users'
import Preloader from '../Common/Preloader/Preloader';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { selUsers, selCurrentPage, selFollowingInProgress, selIsFetching, selPageSize, selTotalUsersCount } from '../../redux/users-selectors';

class UsersContainer extends React.Component {

  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize)
  }

  onPageChanged = (pageNumber) => {
    this.props.getUsers(pageNumber, this.props.pageSize)
  }

  render() {

    return <>
      {this.props.isFetching ? <Preloader /> : null}
      <Users
        totalUsersCount={this.props.totalUsersCount}
        pageSize={this.props.pageSize}
        currentPage={this.props.currentPage}
        onPageChanged={this.onPageChanged}
        users={this.props.users}
        follow={this.props.follow}
        unfollow={this.props.unfollow}
        followingInProgress={this.props.followingInProgress}
      />
    </>
  }

}

const mapStateToProps = (state) => {

  return {
    users: selUsers(state),
    pageSize: selPageSize(state),
    totalUsersCount: selTotalUsersCount(state),
    currentPage: selCurrentPage(state),
    isFetching: selIsFetching(state),
    followingInProgress: selFollowingInProgress(state)
  }

}

export default compose(
  connect(mapStateToProps, { follow, unfollow, toggleFollowingProgress, getUsers }), 
  withAuthRedirect
)(UsersContainer)

