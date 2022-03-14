import { stopSubmit } from "redux-form";
import { ProfileAPI } from "../api/api";

const ADD_POST = 'ADD_POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

let initialState = {
    posts: [
        { id: 1, likesCount: 12, message: 'Hi' },
        { id: 2, likesCount: 5, message: 'How are you?' },
        { id: 3, likesCount: 2, message: 'heeeeeey' }
    ],
    profile: null,
    status: ''

}

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST: {

            let newPost = {
                id: 5,
                message: action.text,
                likesCount: 0
            }

            return {
                ...state,
                posts: [...state.posts, newPost],
            }

        }
        case SET_USER_PROFILE: {
 
            return {
                ...state,
                profile: action.profile
            }

        }
        case SET_STATUS: {

            return {
                ...state,
                status: action.status
            }

        }
        case DELETE_POST: {

            return {
                ...state,
                posts: state.posts.filter(p => p.id != action.postId)
            }

        }
        case SAVE_PHOTO_SUCCESS: {

            return {
                ...state,
                profile: {...state.prifile, photos: action.photos} 
            }

        }

        default:
            return state
    }

}

export const addPostActionCreator = text => ({ type: ADD_POST, text })
export const setUserProfile = profile => ({ type: SET_USER_PROFILE, profile })
export const setStatus = status => ({ type: SET_STATUS, status })
export const deletePost = postId => ({ type: DELETE_POST, postId })
export const savePhotoSuccess = photos => ({ type: SAVE_PHOTO_SUCCESS, photos })

export const getUserProfile = userId => async dispatch => {
    let response = await ProfileAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))

}

export const getStatus = userId => async dispatch => {
    let response = await ProfileAPI.getStatus(userId)
    dispatch(setStatus(response.data))

}

export const updateStatus = status => async dispatch => {
    let response = await ProfileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }

}

export const savePhoto = file => async dispatch => {
    let response = await ProfileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }

}

export const saveProfile = profile => async (dispatch, getState) => {
    const userId = getState().auth.userId

    const response = await ProfileAPI.saveProfile(profile)

    if (response.data && response.data.resultCode === 0) {
        dispatch(getUserProfile(userId))
    } else {
        dispatch(stopSubmit("editProfile", { _error: (response.message) }))
        return Promise.reject(response.message)
    }

}



export default profileReducer