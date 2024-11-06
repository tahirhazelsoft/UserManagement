import React from 'react'
import { LogoutUser } from '../../../Redux/Actions/userActions'
import { useDispatch } from 'react-redux'

function WelcomeAdmin() {
  const dispatch = useDispatch()
  const handleLogout = ()=>{
    console.log("Logging out")
    dispatch(LogoutUser())
  }
  return (
    <div>
      <h1> Welcome admin to Home page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default WelcomeAdmin