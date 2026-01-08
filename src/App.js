import "./App.css";
import Navbar from "./components/Navbar.js";
import DarkVeil from "./components/DarkVeil";

function App() {
  return (
    <>
      <Navbar />
      <div style={{ width: "100%", height: "600px", position: "relative" }}>
        <DarkVeil />
      </div>

    </>
  );
}

export default App;
