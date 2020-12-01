import React, { useEffect } from 'react'
import logo from './img/logo.png'
import userd from './img/avatar.jpeg'
import './header.css'
import { useSelector } from 'react-redux'

const Header = () => {

    const { headerDisplay, active } = useSelector((state) => state.header)

    const homelink = active==='home' ? 'nav-item nav-link active' : 'nav-item nav-link'
    const favlink = active==='fav' ? 'nav-item nav-link active' : 'nav-item nav-link'
    const booklink = active==='book' ? 'nav-item nav-link active' : 'nav-item nav-link'
    const eventlink = active==='events' ? 'nav-item nav-link active' : 'nav-item nav-link'
    const profilelink = active === 'profile' ? 'navbar-brand active' : 'navbar-brand'

    const userLogin = useSelector((state) => state.userLogin)
    const { loading:uloading, error, userInfo } = userLogin

    function imageExists(image_url){

        var http = new XMLHttpRequest();
    
        http.open('HEAD', image_url, false);
        http.send();
    
        return http.status != 404;
    
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top" style={{ display: headerDisplay, padding:"1.5vw 2vw" }}>
                <a className="navbar-brand-logo" href="#"><img src={logo}  style={{height:"100%"}} /></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav" style={{marginLeft:"auto"}}>
                        <a className={homelink} href="/">Home </a>
                        <a className={favlink} href="/favourites">Favourites</a>
                        <a className={booklink} href="/bookings">My Bookings</a>
                        <a className={eventlink} href="/events">My Events</a>
                    </div>
                </div>
                <a className={profilelink} href="/profile">
                {
                            userInfo && imageExists(`/api/user/profilepic/${userInfo.user._id}`) ? <img src={`/api/user/profilepic/${userInfo.user._id}`} id="profile-pic" /> : <img src={userd} />
                }
                </a>
            </nav>
        </>
    )
}

export default Header