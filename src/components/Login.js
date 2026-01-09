import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
  <>
      <div className="background">
        <div className="shape"></div>
        <div className="shape" id='login-bottom-shape'></div>
      </div>

      <form className='Login-Form'>
        <h3>Login</h3>
        <p className="SignUP-p text-center">To access your account</p>

        <label htmlFor="email">Email</label>
        <input type="text" placeholder="Enter Email" id="email" />

        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Enter Password" id="password" />

        <button className="signupBtns ">Login<i className="fa-solid fa-arrow-right-to-bracket text-dark"></i></button>
        <Link to="/"><button className="signupBtns" id="homeBtn">Home</button></Link>

        <hr
          style={{
            border: "1.5px solid white",
            margin: "19px 0px",
            width: "80%",
            justifyContent: "center",
            display: "flex",
            justifySelf: "center",
          }}
        />
        <p className="SignUP-p text-center">
          Dont have an account? <Link to="/signup">Sign UP</Link>
        </p>
      </form>
    </>
  )
}
