import React, { useEffect, useState } from 'react'
import './EventCard.css'
import { useDispatch, useSelector } from 'react-redux'
import placeholder from './img/placeholder.png'
import Fontawesome from 'react-fontawesome'
import { like, dislike, book, review } from '../../Actions/User'
import Rating from '../Rating'

const Ticket = (ticket) => {
    return(
        <>
        <div className="ticket">{ticket.ticketId}</div>
        </>
    )
}

const Review =  ({review}) => {

    return(
        <div className="border-bottom">
        <Rating value={review.rating} />
        <p>{review.comment}</p>
        </div>
    )
}

const EventCard = ({ event, types, categories }) => {

    const [liked, setLiked] = useState(event.liked)
    const [detail, setDetail] = useState(false)
    const [showDetails, setShowDetails] = useState(true)
    const [showReviews, setShowreviews] = useState(false)
    const [showTickets, setShowTickets] = useState(false)
    const [bookTickets, setBookTickets] = useState(false)
    const [rating, setRating] = useState(null)
    const [comment, setComment] = useState(null)
    const [tickets, setTickets] = useState(0)
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    function imageExists(){

        return event.eventDetails.image 
    }


    var ecategories = []

    categories && categories.forEach((C) =>{
        if(event.eventDetails.categories.includes(C._id))
        ecategories.push(C.name)
    })

    var etype = ''

        types && types.forEach((t) => {
            if(event.eventDetails.eventType === t._id)
                etype = t.name
    })

    const likedclass = liked ? ' liked' : ''

    if (detail) {
        document.body.style.overflow = "hidden"
        document.body.style.pointerEvents = 'none'
    } else {
        document.body.style.overflow = "auto"
        document.body.style.pointerEvents = 'auto'
    }

    

    const mailto = `mailto:${event.eventDetails.organizer.orgEmail}`

    const bookmessage = useSelector((state) => state.bookEvent)

    const reviewMessage = useSelector((state) => state.reviewEvent)
    const {loading, error} = reviewMessage

    const likeHandler = () => {
        setLiked(!liked)
        if (!liked) {
            dispatch(like(event.eventDetails._id))
            window.location.reload()
        }
        else {
            dispatch(dislike(event.eventDetails._id))
            window.location.reload()
        }
    }

    const submitHandler = () => {
        if (!tickets) {
            setMessage("Please enter number of tickets")
        }
        else {
            dispatch(book(event.eventDetails._id, tickets))
            alert('Booked event!')
            setBookTickets(false)
            setShowDetails(true)
        }
    }

    const reviewHandler = () => {
        if(rating == null || comment == null)
        {
            setMessage('Fill all details')
        }
        else{
            dispatch(review(event.eventDetails._id, comment, rating))
            window.location.reload()
        }
    }

    return (
        <>
            <div className="col-md-4">
                <div className="card">
                    <div className="event-image">
                        {
                           imageExists(`/api/event/image/${event.eventDetails._id}`) ? <img src={`/api/event/image/${event.eventDetails._id}`} /> : <img src={placeholder} />
                        }
                    </div>
                    <div className={`event-like${likedclass}`}>
                        <button onClick={likeHandler} className="likebutton"><Fontawesome name="heart" /></button>
                    </div>
                    <div className="event-details">
                        <div className="event-title text-left">{event.eventDetails.name}</div>
                        <div className="row mx-0">
                            <div className="event-org col p-0 text-left">by {event.eventDetails.organizer.orgName}</div>
                            {
                                event.started && 
                                <div className="event-rating col p-0 text-right">{Math.round(event.eventDetails.avgRating)} <Fontawesome name="star" style={{ color: "#FFE234" }} /> <Fontawesome name="caret-right" /> {event.eventDetails.totalRating} <Fontawesome name="user" style={{ color: "rgb(56, 65, 122)" }} /></div>
                            }
                        </div>
                        <div className="event-location-time row mx-0">
                            <div className="col-4 p-0 align-self-center loc text-left"><><Fontawesome name="map-marker" /> {event.eventDetails.location.city}</></div>
                            <div className="col-8 p-0 text-right">
                                <>From-{new Date(event.eventDetails.startTime).toDateString()} <Fontawesome name="calendar" /><br /> </>
                                <>To-{new Date(event.eventDetails.endTime).toDateString()} <Fontawesome name="calendar" /> </>
                            </div>
                        </div>
                        <div className="event-book text-center"><button onClick={() => { setDetail(!detail) }}>View Details</button></div>
                        <div className="event-contact">
                            <Fontawesome name="phone" /> {event.eventDetails.organizer.orgContactNo} | <a href={mailto}><Fontawesome name="envelope" /> {event.eventDetails.organizer.orgEmail}</a>
                        </div>
                    </div>
                </div>
            </div>
            {
                detail &&
                <>
                    <div className="event-details-card">
                        <button className="close" onClick={() => { setDetail(false)
                        setBookTickets(false)
                        setShowreviews(false)
                        setShowTickets(false)
                        setShowDetails(true) }}>&times;</button>
                        <div className="row mx-0">
                            {
                                showDetails &&
                                <>
                                    <div className="col-md-6 pl-0 event-card-details">
                                        <div className="row mx-0">
                                            <div className="col p-0 event-details-title">{event.eventDetails.name}</div>
                                            {
                                                event.started &&
                                                <div className="col p-0 text-right" style={{ fontSize: "1.4vw", alignSelf: "flex-end" }}>{Math.round(event.eventDetails.avgRating)} <Fontawesome name="star" style={{ color: "#FFE234" }} /> <Fontawesome name="caret-right" /> {event.eventDetails.totalRating} <Fontawesome name="user" style={{ color: "rgb(56, 65, 122)" }} /></div>
                                            }
                                        </div>
                                        <>
                                            <div className="detail-title">About</div>
                                            <div className="event-details-desc">{event.eventDetails.description}</div>
                                        </>
                                        <>
                                            <div className="row mx-0">
                                                <div className="col p-0">
                                                    <>
                                                        <div className="detail-title">Time and Venue</div>
                                                        <><Fontawesome name="map-marker" />  {event.eventDetails.location.city}</>
                                                        <div className="text-left">
                                                            <><Fontawesome name="calendar" />  From-{new Date(event.eventDetails.startTime).toDateString()} <br /> </>
                                                            <><Fontawesome name="calendar" />  To-{new Date(event.eventDetails.endTime).toDateString()}  </>
                                                        </div>
                                                    </>
                                                </div>
                                                <div className="col p-0 text-right">
                                                    <>
                                                        <div className="detail-title">Contact Details</div>
                                                        <div className="event-details-org">{event.eventDetails.organizer.orgName}  <Fontawesome name="building" /></div>
                                                        <div>{event.eventDetails.organizer.orgContactNo}  <Fontawesome name="phone" style={{ transform: "scaleX(-1)" }} /></div>
                                                        <> <a href={mailto}> {event.eventDetails.organizer.orgEmail} <Fontawesome name="envelope" /></a></>
                                                    </>
                                                </div>
                                            </div>
                                        </>
                                        <>
                                            <div className="detail-title">Tickets and Pricing</div>
                                            <div className="row mx-0">
                                                <div className="col p-0"><Fontawesome name="money" /> Rs. {event.eventDetails.price}</div>
                                                {!event.end && <div className="col p-0 text-right">{event.eventDetails.availableSeats} left <Fontawesome name="ticket" /></div>}
                                            </div>
                                        </>
                                        <>
                                            <div className="detail-title">Event type and Category</div>
                                            <div className="row mx-0">
                                                <div className="col p-0"><Fontawesome name="tag" />&nbsp;
                                                {
                                                   categories && ecategories.map((c) => {
                                                    return <span key={c} >{c} | </span>
                                                })
                                                }
                                                </div>
                                                {
                                                    types && etype!='' && <div className="col p-0 text-right">{etype} <Fontawesome name="users" /></div>
                                                }
                                            </div>
                                        </>
                                        <>
                                            <div className="row mx-0" style={{ justifyContent: "space-around" }}>
                                            {event.started &&  <div className="reviews"><button onClick={() =>{
                                                setShowDetails(false)
                                                setShowreviews(true)
                                            }
                                            }>Reviews</button></div>}
                                                {
                                                    (!event.end && event.eventDetails.availableSeats) &&
                                                    <button className="booking" onClick={() => {
                                                        setShowDetails(false)
                                                        setBookTickets(true)
                                                    }}>Book</button>
                                                }
                                                {
                                                    event.booked && event.tickets && 
                                                    <><button className="booking" onClick={() => {
                                                        setShowDetails(false)
                                                        setShowTickets(true)
                                                    }}>View Tickets</button></>
                                                }
                                            </div>
                                        </>
                                    </div>
                                </>
                            }
                            {
                                bookTickets &&
                                <>
                                    <div className="col-md-6 booktickets text-center">
                                        <label className="booking-label">Enter number of tickets:</label><br />
                                        <input type="text"
                                            value={tickets}
                                            onChange={(e) => { setTickets(e.target.value) }} />
                                        <div className="row mx-0" style={{ justifyContent: "center", margin: "2vw auto" }}>
                                            <button className="cancel" onClick={() => {
                                                setShowDetails(true)
                                                setBookTickets(false)
                                            }}>Cancel</button>
                                            <button className="submit" onClick={submitHandler}>Submit</button>
                                        </div>
                                        {message && <p style={{ color: "#FFFFFF" }}>{message}</p>}
                                    </div>
                                </>
                            }
                            {
                                showReviews &&
                                <>
                                    <div className="col-md-6 event-reviews">
                                        <div>
                                        {
                                            event.eventDetails.reviews.length ?
                                            <>
                                            <div className="title">Reviews</div>
                                            <div className="review-list">
                                            {
                                                event.eventDetails.reviews.map((r) => {
                                                    return <Review key={r._id} review={r} />
                                                })
                                            }
                                            </div>
                                            </>:
                                            <><div>No reviews added yet</div></>
                                        }
                                        </div>

                                        <div className="add-review">
                                            <div>Add your review:</div>
                                        <div className="row mx-0">
                                        <div className="col-md-8 pl-0">
                                        <select onChange={(e) => setRating(e.target.value)} value={rating}>
                                            <option value=''>Select Rating...</option>
                                            <option value='1'>1 - Poor</option>
                                            <option value='2'>2 - Fair</option>
                                            <option value='3'>3 - Good</option>
                                            <option value='4'>4 - Very Good</option>
                                            <option value='5'>5 - Excellent</option>
                                        </select>
                                        <br />
                                        <textarea style={{resize:"none"}} 
                                        placeholder="Add your comment..."
                                        value={comment}
                                        onChange = {(e) => {setComment(e.target.value)}}>
                                        </textarea>
                                        {
                                            message && <p>{message}</p>
                                        }
                                        {
                                            error && <p>{error}</p>
                                        }
                                        </div>
                                        <div className="col-md-4 align-self-center text-center">
                                            <button className="send-review" onClick={reviewHandler}>Send</button>
                                            <button className="go-back"
                                            onClick={() =>{
                                                setShowDetails(true)
                                                setShowreviews(false)}
                                            }
                                            >Go back &gt;</button>
                                        </div>
                                        </div>
                                        </div>
                                    </div>
                                </>
                            }
                            {
                                showTickets &&
                                <>
                                    <div className="col-md-6 showtickets">
                                            <div className="ticket-list">
                                        {
                                                event.tickets.map((t) => {
                                                return(
                                                    <Ticket id={t._id} ticketId={t.ticketId} />
                                                )
                                            })
                                        }
                                        </div>
                                        <button className="go-back"
                                            onClick={() =>{
                                                setShowDetails(true)
                                                setShowTickets(false)}
                                            }
                                            >Go back &gt;</button>
                                    </div>
                                </>
                            }
                            <div className="col-md-6 pr-0 event-card-image">
                                {
                                   imageExists(`/api/event/image/${event.eventDetails._id}`) ? <img src={`/api/event/image/${event.eventDetails._id}`} /> : <img src={placeholder} />
                                }
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default EventCard