import React from 'react'
import Pagination from '../Common/Pagination/Pagination'
import User from './User'

let Users = ({ totalItemsCount, pageSize, currentPage, onPageChanged, users, ...props }) => {

    return (
        <div>

            <Pagination totalItemsCount={totalItemsCount} pageSize={pageSize} currentPage={currentPage} onPageChanged={onPageChanged} />
            <div>
                {
                    users.map(u =>
                        <User key={u.id} user={u} followingInProgress={props.followingInProgress} unfollow={props.unfollow} follow={props.follow} />)

                }
            </div>
        </div>)

}

export default Users