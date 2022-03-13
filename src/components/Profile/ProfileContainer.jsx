import React from 'react'
import { connect } from 'react-redux';
import Profile from './Profile';
import { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile } from '../../redux/profile-reducer';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { useParams } from 'react-router-dom';
import { compose } from 'redux';

class ProfileContainer extends React.Component {

  refreshProfile() {
    let userId = this.props.userId

    if (!userId) {
      userId = this.props.authorizedUserId
debugger
      if (!userId) {
        this.props.history.push("/login")
      }
    }

    this.props.getUserProfile(userId)
    this.props.getStatus(userId)
  }

  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.userId != prevProps.userId) {
      this.refreshProfile()
    }
  }

  render() {

    return <Profile isOwner={true} profile={this.props.profile} status={this.props.status} 
    savePhoto={this.props.savePhoto}
    updateStatus={this.props.updateStatus} 
    saveProfile={this.props.saveProfile} 
    {...this.props} />
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
  connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }),
  withUserId,
  withAuthRedirect
)(ProfileContainer)

