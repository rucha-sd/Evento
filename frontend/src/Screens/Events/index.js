import React, { useEffect, useState } from 'react'
import './event.css'
import { useDispatch, useSelector } from 'react-redux'
import { updateHeader } from '../../Actions/Header'
import EventCard from '../../Components/EventCard'
import { registeredCompleted, registeredUpcoming } from '../../Actions/User'
import empty from './img/empty.png'
import Fontawesome from 'react-fontawesome'
import { typesAndCategories } from '../../Actions/Event'
import loader from './img/loading.gif'

const Events = ({ history }) => {

    const dispatch = useDispatch()
    const [live, setLive] = useState(true)
    const [completed, setCompleted] = useState(false)

    const liveClass = live ? 'active' : ''
    const completedClass = completed ? 'active' : ''

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin

    useEffect(() => {
        dispatch(updateHeader({ headerDisplay: 'flex', active: 'events' }))
        if (userInfo) {
            dispatch(registeredCompleted())
            dispatch(registeredUpcoming())
        }
        else {
            history.push('/login')
        }
    }, [userInfo])

    useEffect(() => {
        dispatch(typesAndCategories())
    }, [])

    const typesCat = useSelector((state) => state.typeandCat)
    const { loading: tloading, typesandcat } = typesCat

    const registeredCompletedEvents = useSelector((state) => state.registeredCompleted)
    const { loading: rcloading, registeredCompleted: rcompleted } = registeredCompletedEvents

    const registeredUpcomingEvents = useSelector((state) => state.registeredUpcoming)
    const { loading: ruloading, registeredUpcoming: rupcoming } = registeredUpcomingEvents

    return (
        <>
            <div className="fav">
                <h2 className="text-center">My Events</h2>
                <div className="container row mx-auto justify-content-between">
                    <div className="switch">
                        <button className={liveClass} onClick={() => {
                            setLive(true)
                            setCompleted(false)
                        }}>LIVE</button>
                        <button className={completedClass} onClick={() => {
                            setLive(false)
                            setCompleted(true)
                        }}>COMPLETED</button>
                    </div>
                    <div className="switch">
                        <button className="addnew" onClick={() => {
                            history.push('/events/add')
                        }}>ADD NEW EVENT <Fontawesome name="plus-circle" /></button>
                    </div>
                </div>
                <div className="container" style={{ padding: "4vw 0" }}>
                    <div className="row mx-0">
                        {
                            completed &&
                            <>{rcompleted ?
                                <>
                                    {
                                        !rcompleted.registeredEvents.length ?
                                            <>
                                                <div className="mx-auto text-center">
                                                    <div><p className="mx-auto">No Events here</p></div>
                                                    <div style={{ opacity: "0.5" }}><img src={empty} width="25%" /></div>
                                                </div>
                                            </> :
                                            rcompleted.registeredEvents.map((e) => {
                                                return (
                                                    <EventCard key={e.eventDetails._id} event={e} types={typesandcat.Types} categories={typesandcat.Categories} />

                                                )
                                            })
                                    }
                                </> :
                                <>
                                    <div className="mx-auto text-center">
                                        <img src={loader} alt="loading" />
                                    </div>
                                </>
                            }</>
                        }
                        {
                            live &&

                            <>
                                {
                                    rupcoming ?
                                        <>
                                            {
                                                !rupcoming.registeredEvents.length ?
                                                    <>
                                                        <div className="mx-auto text-center">
                                                            <div><p className="mx-auto">No Events here</p></div>
                                                            <div style={{ opacity: "0.5" }}><img src={empty} width="25%" /></div>
                                                        </div>
                                                    </> :
                                                    rupcoming.registeredEvents.map((e) => {
                                                        return (
                                                            <EventCard key={e.eventDetails._id} event={e} types={typesandcat.Types} categories={typesandcat.Categories} />

                                                        )
                                                    })
                                            }
                                        </> :
                                        <>
                                            <div className="mx-auto text-center">
                                                <img src={loader} alt="loading" />
                                            </div>
                                        </>
                                }
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}


export default Events