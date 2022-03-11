import React, { useState } from 'react'
import s from "./ProfileInfo.module.css"

const ProfileStatus = props => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = e => {
        setStatus(e.currentTarget.value)
    }

    return (<div>
        {!editMode ?

            <div>
                <span onClick={activateEditMode}>{status || '====='}</span>
            </div>

            :

            <div>
                <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status} />
            </div>
        }
    </div>
    )

}
export default ProfileStatus;