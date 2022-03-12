import React from 'react'
import { connect } from 'react-redux';
import Profile from './Profile';
import { getUserProfile, getStatus, updateStatus } from '../../redux/profile-reducer';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { useParams } from 'react-router-dom';
import { compose } from 'redux';

class ProfileContainer extends React.Component {

  componentDidMount() {
    let userId = this.props.userId

    if(!userId) {
      userId = this.props.authorizedUserId

      if(!userId) {
        this.props.history.push("/login")
      }
    }

    this.props.getUserProfile(userId)
    this.props.getStatus(userId)
  }

  render() {

    return <Profile profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus}  {...this.props} />
  }

}

const withUserId = Component => {

  let RedirectComponent = (props) => {
    const { userId } = useParams();

    return (
      <Component {...props} userId={userId} />
    )
  }

  return RedirectComponent

}

let mapStateToProps = state => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status, 
  authorizedUserId: state.auth.userId, 
  isAuth: state.auth.isAuth
})

export default compose(
  connect(mapStateToProps, { getUserProfile, getStatus, updateStatus }), 
  withUserId,
  withAuthRedirect
)(ProfileContainer)

