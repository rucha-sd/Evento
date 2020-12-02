import React, { useEffect, useState } from 'react'
import userd from './img/avatar.jpeg'
import './profile.css'
import { useSelector, useDispatch } from 'react-redux'
import { updateHeader } from '../../Actions/Header'
import { profile, logout, updateUser } from '../../Actions/User'
import Fontawsome from 'react-fontawesome'
import loader from './img/loading.gif'
import $ from 'jquery'
import Axios from 'axios'

const Profile = ({ history }) => {

    const dispatch = useDispatch()

    const [edit, setedit] = useState(false)
    const [name, setName] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [password, setPassword] = useState('')
    const [rpassword, setRpassword] = useState('')
    const [message, setMessage] = useState('')

    const userprofile = useSelector((state) => state.profile)
    const { loading, profile: user } = userprofile

    const userLogin = useSelector((state) => state.userLogin)
    const { loading: uloading, error, userInfo } = userLogin

    const update = useSelector((state) => state.update)
    const { loading: uploading, error: updateerror, update: profileupdate } = update

    if (profileupdate) {
        setMessage('Saved Changes')
        setedit(false)
    }

    const logoutHandler = () => {
        dispatch(logout())
        history.push('/')
    }

    useEffect(() => {
        dispatch(updateHeader({ headerDisplay: "flex", active: 'profile' }))
        dispatch(profile())
    }, [])

    useEffect(() => {
        if (user && !edit) {
            setName(user.name)
            setContactNumber(user.contactNumber)
        }
    })

    function imageExists(image_url) {

        var http = new XMLHttpRequest();

        http.open('HEAD', image_url, false);
        http.send();

        return http.status != 404;

    }

    const uploadPic = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('profilepic', file)
        if (user) {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                const { data } = await Axios.post(`/api/user/profilepic/${user._id}`, formData, config)
                await window.location.reload()
            } catch (e) {
                setMessage('Error in uploading image')
            }
        }

    }

    const saveHandler = () => {
        if (name === '' || contactNumber === '') {
            setMessage('Please fill the required details')
        }
        else if (password !== rpassword) {
            setMessage('Passwords should match!')
        }
        else {
            if (password !== '') {
                dispatch(updateUser(name, contactNumber, password))
            }
            else {
                dispatch(updateUser(name, contactNumber))
            }
        }
    }

    return (
        <>
            <div className="home container">
                <h2 className="text-center">My Profile</h2>
                {
                    user ?
                        <>
                            <div className="row mx-0 profile">
                                <div className="col-md-6 profile-main">
                                    <div className="profile-pic text-center">
                                        {
                                            imageExists(`/api/user/profilepic/${user._id}`) ? <img src={`/api/user/profilepic/${user._id}`} id="profile-pic" /> : <img src={userd} />
                                        }
                                        <input type="file" accept="image/*" id="uploadpic" onChange={uploadPic}></input>
                                    </div>
                                    <div className="username">{user.name}</div>
                                    <div className="logout">
                                        <button onClick={logoutHandler}>LOGOUT</button>
                                    </div>
                                </div>
                                <div className="col-md-6 details">
                                    <div className="edit text-right">
                                        <button onClick={() => { setedit(true) }}><Fontawsome name="pencil" /></button>
                                    </div>
                                    <input type="text" value={name} disabled={!edit} placeholder={user.name} onChange={(e) => setName(e.target.value)} />
                                    <input type="text" value={contactNumber} disabled={!edit} placeholder={user.contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
                                    <div>
                                        <div className="changepass">Change Password:</div>
                                        <label>New Password:</label><br />
                                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={!edit} />
                                        <label>Confirm Password:</label><br />
                                        <input type="password" value={rpassword} onChange={(e) => setRpassword(e.target.value)} disabled={!edit} />
                                    </div>
                                    {
                                        message && <p>{message}</p>
                                    }
                                    <div className="save">
                                        <button disabled={!edit} onClick={saveHandler}>SAVE DETAILS</button>
                                    </div>
                                </div>
                            </div>
                        </> :
                        <>
                            <div className="mx-auto text-center">
                                <img src={loader} alt="loading" />
                            </div>
                        </>
                }
            </div>
        </>
    )
}

export default Profile