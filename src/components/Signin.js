import { Link } from "react-router-dom";

export default function Signin() {
  return (
    <>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      <form>
        <h3>Sign Up</h3>
        <p className="SignUP-p text-center">To create account</p>

        <label htmlFor="username">First Name</label>
        <input type="text" placeholder="Enter First Name " id="firstname" />

        <label htmlFor="lastname">Last Name</label>
        <input type="text" placeholder="Enter Last name " id="lastname" />

        <label htmlFor="email">Email</label>
        <input type="text" placeholder="Enter Email" id="email" />

        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Enter Password" id="password" />

        <label htmlFor="cpassword">Confirm Password</label>
        <input type="password" placeholder="Confirm Password" id="cpassword" />

        <button className="signupBtns ">
          Sign Up
          <small>
            <i class="fa-solid fa-user-plus text-dark"></i>
          </small>
        </button>
        <Link to="/">
          <button className="signupBtns" id="homeBtn">
            Home
          </button>
        </Link>

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
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </>
  );
}
