import React, { useState } from 'react'
import { CreateField, Input, Textarea } from '../../Common/FormsControls/FormsControls'
import { reduxForm } from 'redux-form'

const ProfileDataForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
    <div><b>Full name</b>:</div>
    {CreateField("Full name", "fullName", [], Input)}

    <div><b>Looking for a job</b>:</div> 
    {CreateField(null, "LookingForAJob", [], Input, {type: "checkbox"})}

    <div><b>My professional skills</b>:</div>
    {CreateField(null, "lookingForAJobDescription", [], Textarea)}

    <div><b>About me</b>:</div> 
    {CreateField(null, "aboutMe", [], Textarea)}

    {<div><button>save</button></div>}
  </form>
  )
}

const ProfileDataFormRedux = reduxForm({
  form: 'editProfile'
})(ProfileDataForm)

export default ProfileDataFormRedux