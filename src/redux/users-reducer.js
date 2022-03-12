import { usersAPI } from "../api/api"
import { updateObjectInArray } from "../utils/object-helpers.js"

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING = 'TOGGLE_IS_FOLLOWING'

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

const usersReducer = (state = initialState, action) => {

    switch (action.type) {

        case FOLLOW: {

            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {folllwed: true})
            }

        }

        case UNFOLLOW: {

            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {folllwed: false})
            }

        }

        case SET_USERS: {

            return {
                ...state,
                users: [...action.users]
            }

        }

        case SET_CURRENT_PAGE: {

            return {
                ...state,
                currentPage: action.currentPage
            }

        }

        case SET_TOTAL_USERS_COUNT: {

            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }

        }

        case TOGGLE_IS_FETCHING: {

            return {
                ...state,
                isFetching: action.isFetching
            }

        }

        case TOGGLE_IS_FOLLOWING: {

            return {
                ...state,
                followingInProgress: action.isFetching ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }

        }

        default:
            return state
    }

}

export const followSuccess = userId => ({ type: FOLLOW, userId })
export const unfollowSuccess = userId => ({ type: UNFOLLOW, userId })
export const setUsers = users => ({ type: SET_USERS, users })
export const setCurrentPage = currentPage => ({ type: SET_CURRENT_PAGE, currentPage })
export const setTotalUsersCount = totalUsersCount => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount })
export const toggleIsFetching = isFetching => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const toggleFollowingProgress = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING, isFetching, userId })

export const getUsers = (page, pageSize) => {
    return async dispatch => {

        dispatch(toggleIsFetching(true))
        let response = await usersAPI.getUsers(page, pageSize)
        dispatch(toggleIsFetching(false))
        dispatch(setCurrentPage(page))
        dispatch(setUsers(response.items))
        dispatch(setTotalUsersCount(response.totalCount))


    }
}

const folllowUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleFollowingProgress(true, userId))
    let response = await apiMethod(userId)

    dispatch(toggleFollowingProgress(false, userId))
    if (response.data.resultCode == 0) {
        dispatch(actionCreator(userId))
    }

    dispatch(toggleFollowingProgress(false, userId))
}

export const follow = (userId) => {
    return async dispatch => {
        folllowUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
    }
}

export const unfollow = (userId) => {
    return async dispatch => {
        folllowUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
    }
}

export default usersReducer