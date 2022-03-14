import React, { useState } from 'react'
import { CreateField, Input, Textarea } from '../../Common/FormsControls/FormsControls'
import { reduxForm } from 'redux-form'
import s from "./ProfileInfo.module.css"
import s2 from "./../../Common/FormsControls/FormsControls.module.css"

const ProfileDataForm = ({ handleSubmit, profile, error }) => {
  return (
    <form onSubmit={handleSubmit}>

      {error &&
        <div className={s2.formSummaryError}>{error}</div>
      }

      <div><b>Full name</b>:</div>
      {CreateField("Full name", "fullName", [], Input)}

      <div><b>Looking for a job</b>:</div>
      {CreateField(null, "LookingForAJob", [], Input, { type: "checkbox" })}

      <div><b>My professional skills</b>:</div>
      {CreateField(null, "lookingForAJobDescription", [], Textarea)}

      <div><b>About me</b>:</div>
      {CreateField(null, "aboutMe", [], Textarea)}


      <div><b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
        return <div key={key} className={s.contact}>{key} {CreateField(key, "contacts." + key, [], Input)}</div>
      })} </div>


      {<div><button>save</button></div>}
    </form>
  )
}

const ProfileDataFormRedux = reduxForm({
  form: 'editProfile'
})(ProfileDataForm)

export default ProfileDataFormRedux