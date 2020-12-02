import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateHeader } from '../../Actions/Header'
import './addevent.css'
import Fontawesome from 'react-fontawesome'
import { typesAndCategories, add } from '../../Actions/Event'
import MultiSelect from "react-multi-select-component";
import placeholder from './img/placeholder.png'
import $ from 'jquery'
import Axios from 'axios'

const AddEvent = ({ history }) => {

    const dispatch = useDispatch()
    const [selected, setSelected] = useState([]);
    const [orgName, setOrgname] = useState('')
    const [orgEmail, setOrgEmail] = useState('')
    const [orgContactNo, setOrgContactNo] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [type, setType] = useState('')
    const [sDate, setsDate] = useState('')
    const [eDate, seteDate] = useState('')
    const [sTime, setStime] = useState('')
    const [eTime, setEtime] = useState('')
    const [noOfSeats, setNoofSeats] = useState('')
    const [price, setPrice] = useState('')
    const [file, setFile] = useState(null)
    const [message, setMessage] = useState(null)

    useEffect(() => {
        dispatch(typesAndCategories())
        dispatch(updateHeader({ headerDisplay: 'flex', active: 'events' }))
    }, [])

    const typesCat = useSelector((state) => state.typeandCat)
    const { loading, typesandcat } = typesCat

    const addeve = useSelector((state) => state.addEvent)
    const { loading: eloading, error, event } = addeve

    const options = []

    typesandcat.Categories && typesandcat.Categories.forEach((c) => {
        options.push({ label: c.name, value: c._id })
    })

    function cancelHandler(e) {
        var p = window.confirm('Cancel and go back?')
        if (p) {
            history.push('/events')
        }
    }


    const submitHandler = (e) => {
        if (orgName === '' || orgEmail === '' || orgContactNo === '' || name === '' || description === '' || address === '' || city === '' || sTime === '' || sDate === '' || eDate === '' || eTime === '' || type === '' || orgName === '' || noOfSeats === '' || price === '') {
            setMessage('Please fill all details')
        }
        // else if (typeof (price) !== typeof (1) || typeof (noOfSeats) !== typeof (1) || typeof (orgContactNo) !== typeof (1)) {
        //     setMessage('Price, contact number and No of tickets should be a number!')
        // }
        else {
            var categories = []
            selected.forEach((s) => {
                categories.push(s.value)
            })
            var s = new Date(sDate)
            var startTime = new Date(s.getFullYear(), s.getMonth(), s.getDay(), sTime.split(':')[0], sTime.split(':')[1])
            var e = new Date(eDate)
            var endTime = new Date(e.getFullYear(), e.getMonth(), e.getDay(), eTime.split(':')[0], eTime.split(':')[1])
            if (startTime > endTime) {
                setMessage('Start time should be before end time')
            }
            else {
                var organizer = {
                    "orgContactNo": orgContactNo,
                    "orgEmail": orgEmail,
                    "orgName": orgName
                }
                var location = {
                    "city": city
                }

                dispatch(add(name, categories, type,  description, price, organizer, startTime, endTime, noOfSeats, location, address))

                console.log(file)
            }
        }
    }


    useEffect(() => {
        if (event && file && event.eventId) {
            const formData = new FormData()
            formData.append('image', file)
            
            console.log(file)
            console.log(event)

            try {
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }

                const { data } = Axios.post(`/api/event/${event.eventId}/image`, formData, config)
                history.push('/events')
                window.location.reload()

            } catch (e) {
                setMessage('Error in uploading image')
            }
        }
    },[event,file])

    function fasterPreview(uploader) {
        if (uploader.files && uploader.files[0]) {
            $('#image-event').attr('src',
                window.URL.createObjectURL(uploader.files[0]));
        }
    }

    useEffect(() => {
        $("#upload-pic").change(function () {
            fasterPreview(this);
        });
    }, [])

    return (
        <>
            <div className="container home">
                <h3 className="text-center"> ADD YOUR EVENT </h3>
                <div className="event-info">
                    <form>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="section-title">Event image: </div>
                                <input type="file" accept="image/*" id="upload-pic" onChange={(e) => setFile(e.target.files[0])}></input>
                                <div className="e-image">
                                    <img src={placeholder} id="image-event" />
                                </div>
                                <div className="section-title">Organisation Details: </div>
                                <input type="text"
                                    placeholder="Organisation Name"
                                    value={orgName}
                                    onChange={(e) => setOrgname(e.target.value)} />
                                <input type="text"
                                    placeholder="Organisation Email"
                                    value={orgEmail}
                                    onChange={(e) => setOrgEmail(e.target.value)} />
                                <input type="text"
                                    placeholder="Organisation Contact Number"
                                    value={orgContactNo}
                                    onChange={(e) => setOrgContactNo(e.target.value)} />
                                <div className="section-title">Event Details: </div>
                                <input type="text"
                                    placeholder="Event Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)} />
                                <textarea placeholder="Event Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <div className="col-md-6">
                                <div className="section-title">Location: </div>
                                <input type="text"
                                    placeholder="Address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)} />
                                <input type="text"
                                    placeholder="City"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)} />
                                <div className="section-title">Date and time: </div>
                                <div className="row mx-0" style={{ marginBottom: "2vw" }}>
                                    <div className="col-md-6 pl-0">
                                        <label>Start:</label>
                                        <div><Fontawesome name="calendar" /> <input type="date"
                                            value={sDate}
                                            onChange={(e) => setsDate(e.target.value)} /></div>
                                        <div><Fontawesome name="clock-o" /> <input type="time"
                                            value={sTime}
                                            onChange={(e) => setStime(e.target.value)} /></div>
                                    </div>
                                    <div className="col-md-6 pr-0">
                                        <label>End:</label>
                                        <div><Fontawesome name="calendar" /> <input type="date"
                                            value={eDate}
                                            onChange={(e) => seteDate(e.target.value)} /></div>
                                        <div><Fontawesome name="clock-o" /> <input type="time"
                                            value={eTime}
                                            onChange={(e) => setEtime(e.target.value)} /></div>
                                    </div>
                                </div>

                                <div className="section-title" style={{ marginBottom: "1vw" }}>Type and Category: </div>
                                {
                                    typesandcat &&
                                    <>
                                        <div className="row mx-0">
                                            <div className="col-md-6 pl-0">

                                                {typesandcat.Categories && typesandcat.Categories && <MultiSelect
                                                    options={options}
                                                    value={selected}
                                                    onChange={setSelected}
                                                    labelledBy={"Select"}
                                                    style={{ marginTop: "1vw" }}
                                                />}

                                            </div>
                                            <div className="col-md-6 pr=-0">
                                                <select value={type} onChange={(e) => setType(e.target.value)}>
                                                    <option value="">Select Types...</option>
                                                    {
                                                        typesandcat.Types && typesandcat.Types.map((c) => {
                                                            return (
                                                                <option value={c._id} key={c._id}>{c.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </>
                                }
                                <div className="section-title" style={{ marginBottom: "1vw", marginTop: "2vw" }}>Tickets and Pricing: </div>
                                <div className="row mx-0">
                                    <div className="col-md-6 pl-0 align-self-center">No. of Tickets Available:</div>
                                    <div className="col-md-6 pl-0"><input type="text"
                                        placeholder="No. of Tickets Available"
                                        value={noOfSeats}
                                        onChange={(e) => setNoofSeats(e.target.value)} /></div>
                                </div>
                                <div className="row mx-0">
                                    <div className="col-md-6 pl-0 align-self-center">Cost per ticket:</div>
                                    <div className="col-md-6 pl-0"><input type="text"
                                        placeholder="Cost per ticket"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)} /></div>
                                </div>
                                <p></p>
                                <div className="submit-cancel">
                                    {
                                        message && <p>{message}</p>
                                    }
                                    {
                                        event && event.message && <p>{event.message}!</p>
                                    }
                                    {
                                        error && <p>{error}</p>
                                    }
                                    <button className="cancel" onClick={cancelHandler}>CANCEL</button>
                                    <button type="button" className="send" onClick={submitHandler}>SUBMIT</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}


export default AddEvent