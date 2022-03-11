import React from 'react'
import { NavLink } from 'react-router-dom';
import s from "./Header.module.css"

const Header = (props) => {
    
    return (
        <header className={s.header}>
            <img src="https://seeklogo.com/images/C/company-name-logo-C74A7D6F5A-seeklogo.com.png" />
            <div className={s.loginBlock}>
                { props.isAuth ? 
                <div>{props.login} <button onClick={props.logout()}>log out</button></div>
                : 
                <NavLink to="/login">Login</NavLink> }
                
                </div>
        </header>

    )

}

export default Header;