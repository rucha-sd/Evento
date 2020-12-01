import React, { useEffect } from 'react'
import './Fav.css'
import { useDispatch, useSelector } from 'react-redux'
import { updateHeader } from '../../Actions/Header'
import EventCard from '../../Components/EventCard'
import { favourites } from '../../Actions/User'
import empty from './img/empty.png'

const Favourites = ({ history }) => {

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin

    useEffect(() => {
        dispatch(updateHeader({ headerDisplay: 'flex', active:'fav' }))
        if (userInfo) {
            dispatch(favourites())
        }
        else {
            history.push('/login')
        }
    }, [userInfo])

    const fav = useSelector((state) => state.favourites)
    const { loading: loadingEvents, favourites: favEvents } = fav

    return (
        <>
            <div className="fav">
                <h2 className="text-center">Favourites</h2>
                <div className="container" style={{ padding: "4vw 0" }}>
                    <div className="row mx-0">
                        {
                            favEvents && 
                            <>
                            {
                                !favEvents.likedEvents.length ? 
                                <>
                                <div className="mx-auto text-center">
                                <div><p className="mx-auto">No favourites</p></div>
                                <div><img src={empty} width="25%"/></div>
                                </div>
                                </> :
                                favEvents.likedEvents.map((e) => {
                                    return (
                                        <EventCard key={e.eventDetails._id} event={e} />
                                    )
                                })
                            }
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}


export default Favourites