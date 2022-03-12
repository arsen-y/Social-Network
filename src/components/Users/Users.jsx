import React from 'react'
import s from "./Users.module.css"
import userPhoto from "../../assets/images/def_ava.jpg"
import { NavLink } from 'react-router-dom'
import Pagination from '../Common/Pagination/Pagination'

let Users = ({currentPage, totalUsersCount, pageSize, onPageChanged, ...props}) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages = []

    for (let i = 1; i < pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div>

           <Pagination currentPage={currentPage} totalUsersCount={totalUsersCount} pageSize={pageSize} onPageChanged={onPageChanged}  />

            {
                props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                                <img src={u.photos.small != null ? u.photos.small : userPhoto} className={s.userPhoto} />
                            </NavLink>
                        </div>

                        <div>
                            {u.followed ?
                                <button disabled={props.followingInProgress.some(id => id == u.id)} onClick={() => { props.unfollow(u.id) }}>unfollow</button>
                                :
                                <button disabled={props.followingInProgress.some(id => id == u.id)} onClick={() => { props.follow(u.id) }}>follow</button>}

                        </div>

                    </span>
                    <span>

                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>

                        <span>
                            <div>country</div>
                            <div>city</div>
                        </span>

                    </span>

                </div>

                )

            }

        </div>)

}

export default Users