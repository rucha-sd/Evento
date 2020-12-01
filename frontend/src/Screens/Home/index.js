import React, { useEffect, useState, useLayoutEffect } from 'react'
import './home.css'
import { useDispatch, useSelector } from 'react-redux'
import { updateHeader } from '../../Actions/Header'
import { sortEvents, typesAndCategories, getEvents } from '../../Actions/Event'
import EventCard from '../../Components/EventCard'
import $ from 'jquery'

const HomeScreen = ({ history }) => {

    const dispatch = useDispatch()

    const [date, setDate] = useState(null)
    const [city, setCity] = useState('')

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin


    useEffect(() => {
        dispatch(updateHeader({ headerDisplay: 'flex', active:'home' }))
        if (userInfo) {
            dispatch(sortEvents(date, city))
        }
        else {
            history.push('/login')
        }
    }, [userInfo, date, city])

    useEffect(() =>{
        dispatch(typesAndCategories())
        dispatch(getEvents())
    }, [])

    const typesCat = useSelector((state) => state.typeandCat)
    const { loading: tloading, typesandcat } = typesCat

    const filteredevents = useSelector((state) => state.filteredevents)
    const { loading: loadingEvents, events } = filteredevents

    const allEve = useSelector((state) => state.allEvents)
    const {loading:allloading, events:allevents} = allEve
    
    const cities = []

    if(allevents){
        allevents.forEach((e) =>{
            if(!cities.includes(e.location.city))
            cities.push(e.location.city)
        })
    }

        var maxDate = new Date();
        $("input[type=date]").attr('min', maxDate);

    function resetfilter(){
        $("input[type=date]").val("")
        setCity('')
        setDate('')
    }

    return (
        <>
            <div className="home">
                <h2 className="text-center">Upcoming Events</h2>
                <div className="container" style={{ padding: "4vw 0" }}>
                <div className="filters row mx-0 justify-content-center" style={{paddingRight:"15px"}}>
                    <div className="city"> City:
                    <select onChange={(e) => setCity(e.target.value)} value={city}>
                        <option value="">All</option>
                        {
                            cities.map((c) => {
                                return (
                                    <option value={c} key={c}>{c}</option>
                                )
                            })
                        }
                    </select>
                    </div>
                    <div className="date" onChange={(e) => setDate(e.target.value)} value={date}>Date : <input type="date" id="dtw" /></div>
                    <button onClick={resetfilter}>&times;</button>
                </div>
                    <div className="row mx-0">
                        {
                            events && typesandcat && events.map((e) => {
                                return (
                                    <EventCard key={e.eventDetails._id} event={e} types={typesandcat.Types} categories = {typesandcat.Categories} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}


export default HomeScreen