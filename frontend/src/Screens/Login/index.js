import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './login.css'
import { login } from '../../Actions/User'
import { updateHeader } from '../../Actions/Header'

const Login = ({ location, history }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        dispatch(updateHeader({ headerDisplay : 'none' }))
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <>
            <div className="login">
                <div className="login-card">
                    <div className="login-title">Login to continue...</div>
                    <label for="email">Email</label>
                    <input type="text"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <label for="password">Password</label>
                    <input type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    {error && <p style={{ color: "red" }}>{error}</p>}

                    <button onClick={submitHandler}>Login</button>
                    <p className="text-center">Don't have an accout? <a href="/signup">Sign up</a> here</p>
                </div>
            </div>
        </>
    )
}

export default Login