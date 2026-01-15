import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

export default function Login() {
  const navigate = useNavigate();
  const [credential, setCredential] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { email, password } = credential;

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const hostURL =
      process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

    const response = await fetch(`${hostURL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      // …
    });

    const json = await response.json();
    // console.log(json);

    if (json.success) {
      localStorage.setItem("token", json.token);
      navigate("/playlist");
    } else {
      setError("Wrong password or email");
    }
    setLoading(false);
  };

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
    setError("");
  };

  return (
    <>
      <div className="background">
        <div className="shape"></div>
        <div className="shape" id="login-bottom-shape"></div>
      </div>

      {/* {loading && (
        <div className="loader-container">
          <div className="spinner"></div>
          <p>Waking up server, please wait...</p>
        </div>
      )} */}

      <form className="Login-Form" onSubmit={handleSubmit}>
        <h3>Login</h3>
        <p className="SignUP-p text-center">To access your account</p>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Enter Email"
          id="email"
          name="email"
          value={credential.email}
          onChange={onChange}
        />

        <label htmlFor="password">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          // type="password"
          id="password"
          name="password"
          placeholder="••••••••"
          style={{ paddingRight: "30px" }}
          onChange={onChange}
          value={credential.password}
          required
        />
        <i
          className="fa-solid fa-eye-slash"
          onClick={togglePassword}
          style={{
            position: "absolute",
            right: "41px",
            top: "280px",
            transform: "translateY(-50%)",
            cursor: "pointer",
            color: "black",
          }}
        ></i>

        {error && (
          <div
            className="error-msg"
            style={{
              color: "red",
              borderRadius: "5px",
              textAlign: "center",
              fontSize: "12px",
            }}
          >
            {error}
          </div>
        )}

        <div
          style={{
            justifySelf: "anchor-center",
            textAlign: "center",
            marginTop: " 25px",
          }}
        >
          <ClipLoader
            color={"#ffffff"}
            loading={loading}
            size={35}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          {loading && <p>waking up the server</p>}
        </div>
        <button className="signupBtns" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
          <i className="fa-solid fa-arrow-right-to-bracket text-dark"></i>
        </button>

        <Link to="/">
          <button className="signupBtns" id="homeBtn" type="submit">
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
          Dont have an account? <Link to="/signup">Sign UP</Link>
        </p>
      </form>
    </>
  );
}
