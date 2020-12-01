import React, { useState, useEffect } from 'react'
import { register } from '../../Actions/User'
import './signup.css'
import { useSelector, useDispatch } from 'react-redux'
import { updateHeader } from '../../Actions/Header'

const Signup = ({ location, history }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [contact, setContact] = useState('')
  const [name, setName] = useState(null)
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()


  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    dispatch(updateHeader({ headerDisplay : 'none' }))
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (name === '' || email === '' || contact === '' || password === '') {
      setMessage('Please fill all the details')
    } else {
      dispatch(register(name, email, password, contact))
    }
  }


  return (
    <>
      <div className="signup">
        <div className="signup-card">
          <div className="signup-title">Sign up</div>
          <label for="name">Name</label>
          <input type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)} />
          <label for="email">Email</label>
          <input type="text"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
          <label for="contact">Contact Number</label>
          <input type="text"
            placeholder="contact"
            name="Contact Number"
            value={contact}
            onChange={(e) => setContact(e.target.value)} />
          <label for="password">Password</label>
          <input type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
          {error && <p style={{ color: "red" }}>{error}</p>}
          {message && <p style={{ color: "red" }}>{message}</p>}
          <button onClick={submitHandler}>Sign up</button>
          <p className="text-center">Already have an accout? <a href="/login">Login</a> here</p>
        </div>
      </div>
    </>
  )
}


export default Signup