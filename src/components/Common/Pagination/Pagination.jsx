import React from 'react'
import s from "./Pagination.module.css"
import { NavLink } from 'react-router-dom'

let Pagination = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages = []

    for (let i = 1; i < pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div>

            {
                pages.map(p => {
                    return <span onClick={() => { props.onPageChanged(p) }} className={props.currentPage === p && s.selectedPage}>{p} </span>
                })
            }

        </div>
    )

}

export default Pagination