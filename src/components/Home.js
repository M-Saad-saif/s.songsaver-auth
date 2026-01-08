import React from "react";
import Authlgog from "./Images/authlogo.png";

export default function Home() {
  return (
    <>
      <div className="home-container">
        <h1>
          s.SongSaver <i className="ri-music-ai-line"></i>
        </h1>
        <div className="text-center my-3">
          <h5>Welcome! Save Your Favorite Songs</h5>
          <p>
            Create an account to build your personalized music library, discover
            new tracks, and access your saved favorites anytime, anywhere.
          </p>
        </div>
        <div className="loginsignBtns my-3">
          <a href="/signup">
            <button className="button">
              Sign Up <i className="fa-solid fa-user-plus"></i>
            </button>
          </a>

          <a href="/login">
            <button className="button">
              Login <i className="fa-solid fa-arrow-right-to-bracket"></i>
            </button>
          </a>
        </div>

        <div className="home-card-container d-flex ">
          <div className="card mx-3">
            <img src={Authlgog} alt="" />
            <hr
              style={{
                border: "1px solid white",
                margin: "9px 0",
                width: "80%",
              }}
            />
            <p style={{textAlign:"justify"}}>
              Create your free account to securely log in and save favorite
              songs to your personal music vault. Access your collection
              anytime, sync across devices, and build your ultimate playlist
              library with just a few clicks. Join now!
            </p>
          </div>
          <div className="card mx-3">aljkdhfsjdfhkjsfhlsdjkfh</div>
          <div className="card mx-3">aljkdhfsjdfhkjsfhlsdjkfh</div>
        </div>
      </div>
    </>
  );
}
