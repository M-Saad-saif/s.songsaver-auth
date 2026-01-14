import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signin() {
  let navigate = useNavigate();
  const [Credential, setCredential] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const [showCPassword, setShowCPassword] = useState("");

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleCPassword = () => {
    setShowCPassword(!showCPassword);
  };

    const hostURL = process.env.REACT_APP_BACKEND_UR || "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password, cpassword } = Credential;

    if (!firstName || !lastName || !email || !password || !cpassword) {
      setError("All feilds are required");
      return;
    }

    if (password !== cpassword) {
      setError("Passwords donot match");
      return;
    }

    if (password.length < 2) {
      setError("Password must contain 2 letter");
    }

    setError("");

    try {
      const response = await fetch(
        `${hostURL}/api/auth/createuser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ firstName, lastName, email, password }),
        }
      );

      const json = await response.json();
      // console.log(json);

      if (json.success) {
        localStorage.setItem("token", json.token);
        navigate("/playlist");
      } else {
        alert("wrong credential");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onChange = (e) => {
    setCredential({ ...Credential, [e.target.name]: e.target.value });
    setError("");
  };

  const checkPasswordMatch = Credential.password === Credential.cpassword;

  return (
    <>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      <form onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        <p className="SignUP-p text-center">To create account</p>

        <label htmlFor="username">First Name</label>
        <input
          type="text"
          placeholder="Enter First Name "
          id="firstname"
          name="firstName"
          value={Credential.firstName}
          onChange={onChange}
        />

        <label htmlFor="lastname">Last Name</label>
        <input
          type="text"
          placeholder="Enter Last name "
          id="lastname"
          name="lastName"
          value={Credential.lastName}
          onChange={onChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Enter Email"
          id="email"
          name="email"
          value={Credential.email}
          onChange={onChange}
        />

        <label htmlFor="password">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          placeholder="••••••••"
          style={{ paddingRight: "30px" }}
          onChange={onChange}
          value={Credential.password}
          required
        />
        <i
          className="fa-solid fa-eye-slash"
          onClick={togglePassword}
          style={{
            position: "absolute",
            right: "41px",
            top: "485px",
            transform: "translateY(-50%)",
            cursor: "pointer",
            color: "black",
          }}
        ></i>

        <label htmlFor="cpassword">Confirm Password</label>
        <input
          type={showCPassword ? "text" : "password"}
          // type="password"
          id="cpassword"
          name="cpassword"
          placeholder="••••••••"
          style={{ paddingRight: "30px" }}
          onChange={onChange}
          value={Credential.cpassword}
          required
        />
        <i
          className="fa-solid fa-eye-slash"
          onClick={toggleCPassword}
          style={{
            position: "absolute",
            right: "41px",
            top: "588px",
            transform: "translateY(-50%)",
            cursor: "pointer",
            color: "black",
          }}
        ></i>

        {Credential.cpassword && (
          <div
            className={`form-text ${
              checkPasswordMatch ? "text-success" : "text-danger"
            }`}
          >
            {checkPasswordMatch ? "Password Matched" : "Password donot Matched"}
          </div>
        )}

        {error && (
          <div
            className="error-msg"
            style={{
              color: "red",
              borderRadius: "5px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        <button className="signupBtns " type="submit">
          Sign Up
          <small>
            <i className="fa-solid fa-user-plus text-dark"></i>
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
