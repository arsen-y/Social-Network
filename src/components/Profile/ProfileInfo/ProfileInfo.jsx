import React, { useState } from 'react'
import Preloader from '../../Common/Preloader/Preloader'
import s from "./ProfileInfo.module.css"
import ProfileStatus from './ProfileStatus'
import ProfileDataFormRedux from './ProfileDataForm'
import userPhoto from "../../../assets/images/def_ava.jpg"

const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {

  let [editMode, setEditMode] = useState(false)
  isOwner = true
  if (!profile) {
    return <Preloader />
  }

  const onMainPhotoSelected = (e) => {

    if (e.target.files.length) {
      savePhoto(e.target.files[0])
    }

  }

  const onSubmit = formData => {
    saveProfile(formData).then(() => {
      setEditMode(false)
    })
    
  }


  return (
    <div>
      <div className={s.descriptionBlock}>
        <img src={profile.photos.large || userPhoto} className={s.mainPhoto} />
        {isOwner && <input type="file" onChange={onMainPhotoSelected} />}

        <ProfileStatus status={status} updateStatus={updateStatus} />

        {editMode ? <ProfileDataFormRedux initialValues={profile} profile={profile} onSubmit={onSubmit} />
          :
          <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => { setEditMode(true) }} />}

      </div>

    </div>
  )

}

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
  return (
    <div>
      <div><b>Full name</b>: {profile.fullName} </div>
      <div><b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"} </div>
      {profile.lookingForAJob &&
        <div><b>My professional skills</b>: {profile.lookingForAJobDescription}</div>
      }

      <div><b>About me</b>: {profile.aboutMe} </div>

      <div><b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
        return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
      })} </div>
      {isOwner && <div><button onClick={goToEditMode}>edit</button></div>}
    </div>
  )
}

const Contact = ({ contactTitle, contactValue }) => {
  return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;