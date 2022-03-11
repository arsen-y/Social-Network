import React from 'react'
import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {"API-KEY": "1-2-3-4-5"}, 
    // withCredentials: true,
    mode: 'cors'
})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
        .then(response => {
            return response.data
        })
    
    }, 
    follow(userId) {
        return instance.post(`follow/${userId}`)
        
    }, 
    unfollow(userId) {
        return instance.delete(`follow/${userId}`)

    }

}

export const ProfileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`)
    }, 
    updateStatus(status) {
        return instance.put(`profile/status`, { status: status })
    },

}

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    }, 
    login(email, password, rememberMe = false) {
        return instance.post(`auth/login`, { email, password, rememberMe })
    }, 
    logout() {
        return instance.delete(`auth/login`)
    }

}

