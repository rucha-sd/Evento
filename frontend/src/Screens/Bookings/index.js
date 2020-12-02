import React, { useEffect, useState } from 'react'
import './bookings.css'
import { useDispatch, useSelector } from 'react-redux'
import { updateHeader } from '../../Actions/Header'
import EventCard from '../../Components/EventCard'
import { favourites, bookedCompleted, bookedUpcoming } from '../../Actions/User'
import empty from './img/empty.png'
import { typesAndCategories } from '../../Actions/Event'

const Bookings = ({ history }) => {

    const dispatch = useDispatch()
    const [live, setLive] = useState(true)
    const [completed, setCompleted] = useState(false)

    const liveClass = live ? 'active' : ''
    const completedClass = completed ? 'active' : ''

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin

    useEffect(() => {
        dispatch(updateHeader({ headerDisplay: 'flex', active: 'book' }))
        if (userInfo) {
            dispatch(bookedCompleted())
            dispatch(bookedUpcoming())
        }
        else {
            history.push('/login')
        }
    }, [userInfo])

    useEffect(() => {
        dispatch(typesAndCategories())
    },[])

    const typesCat = useSelector((state) => state.typeandCat)
    const { loading: tloading, typesandcat } = typesCat

    const bookedCompletedEvents = useSelector((state) => state.bookedCompleted)
    const { loading: bcloading, bookedCompleted: bcompleted } = bookedCompletedEvents

    const bookedUpcomingEvents = useSelector((state) => state.bookedUpcoming)
    const { loading: buloading, bookedUpcoming: bupcoming } = bookedUpcomingEvents

    return (
        <>
            <div className="fav">
                <h2 className="text-center">My Bookings</h2>
                <div className="switch text-center">
                    <button className={liveClass} onClick={() => {
                        setLive(true)
                        setCompleted(false)
                    }}>LIVE</button>
                    <button className={completedClass} onClick={() => {
                        setLive(false)
                        setCompleted(true)
                    }}>COMPLETED</button>
                </div>
                <div className="container" style={{ padding: "4vw 0" }}>
                    <div className="row mx-0">
                        {
                            completed && bcompleted &&
                            <>
                                {
                                    !bcompleted.bookedEvents.length ?
                                        <>
                                            <div className="text-center mx-auto">
                                                <div><p className="mx-auto">No Events here</p></div>
                                                <div style={{ opacity: "0.5" }}><img src={empty} width="25%" /></div>
                                            </div>
                                        </> :
                                        <>{typesandcat && bcompleted.bookedEvents.map((e) => {
                                            return (
                                            <EventCard key={e.eventDetails._id} event={e} types={typesandcat.Types} categories = {typesandcat.Categories} />
                                        )
                                        })}</>
                                }
                            </>
                        }
                        {
                            live && bupcoming &&
                            <>
                                {
                                    !bupcoming.bookedEvents.length ?
                                        <>
                                            <div className="text-center mx-auto">
                                                <div><p className="mx-auto">No Events here</p></div>
                                                <div style={{ opacity: "0.5" }}><img src={empty} width="25%" /></div>
                                            </div>
                                        </> :
                                        typesandcat && bupcoming.bookedEvents.map((e) => {
                                            return (
                                        <EventCard key={e.eventDetails._id} event={e} types={typesandcat.Types} categories = {typesandcat.Categories} />
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


export default Bookings