import "./App.css";
import Navbar from "./components/Navbar.js";
import LightRays from "./components/LightRays.js";
import Home from "./components/Home.js";

function App() {
  return (
    <>
      <Navbar />
      <Home />
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
      </div>
    </>
  );
}

export default App;
