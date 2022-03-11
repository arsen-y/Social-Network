import { ProfileAPI } from "../api/api";

const ADD_POST = 'ADD_POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

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
        default:
            return state
    }

}

export const addPostActionCreator = text => ({ type: ADD_POST, text })
export const setUserProfile = profile => ({ type: SET_USER_PROFILE, profile })
export const setStatus = status => ({ type: SET_STATUS, status })

export const getUserProfile = userId => dispatch => {
    ProfileAPI.getProfile(userId).then(response => {
        dispatch(setUserProfile(response.data))
    })
}

export const getStatus = userId => dispatch => {
    ProfileAPI.getStatus(userId).then(response => {
        dispatch(setStatus(response.data))
    })
}

export const updateStatus = status => dispatch => {
    ProfileAPI.updateStatus(status).then(response => {
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }

    })
}

export default profileReducer