import React from 'react'
import Preloader from '../../Common/Preloader/Preloader'
import s from "./ProfileInfo.module.css"
import ProfileStatus from './ProfileStatus'

const ProfileInfo = (props) => {

  if (!props.profile) {
    return <Preloader />
  }

  return (
    <div>

      <div className={s.descriptionBlock}>
        <img src={props.profile.photos.large} />
        <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
      </div>

    </div>
  )

}

export default ProfileInfo;