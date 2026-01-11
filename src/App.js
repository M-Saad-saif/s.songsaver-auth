import "./App.css";
import Navbar from "./components/Navbar.js";
import LightRays from "./components/LightRays.js";
import Home from "./components/Home.js";
import Playlist from "./components/Playlist.js";
import Login from "./components/Login.js";
import Signin from "./components/Signin.js";
import ProtectedRoute from "./components/ProtectedRoute.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
      <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signin />} />
          <Route
            exact
            path="/playlist"
            element={
              <ProtectedRoute>
                <Playlist />
              </ProtectedRoute>
            }
          />
        </Routes>
        <div
          style={{
            width: "100%",
            height: "600px",
            position: "absolute",
            zIndex: "-1",
            top: "0",
          }}
        >
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffffff"
            raysSpeed={1.5}
            lightSpread={0.8}
            rayLength={1.2}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
            className="custom-rays"
          />
        </div>{" "}
      </Router>
    </>
  );
}

export default App;
