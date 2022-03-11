import { createSelector } from "reselect"

export const selUsers = state => {
    return state.usersPage.users
}

export const selUsersSuper = createSelector(selUsers, (users) => {
    users.filter(u => true)

})

export const selPageSize = state => {
    return state.usersPage.pageSize
}
export const selTotalUsersCount = state => {
    return state.usersPage.totalUsersCount
}
export const selCurrentPage = state => {
    return state.usersPage.currentPage
}
export const selIsFetching = state => {
    return state.usersPage.isFetching
}
export const selFollowingInProgress = state => {
    return state.usersPage.followingInProgress
}

