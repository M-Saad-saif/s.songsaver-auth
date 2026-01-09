import React from "react";
import Authlgog from "./Images/authlogo.png";
import MusicImg from "./Images/music img.png";
import { Link } from "react-router-dom";


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
          <Link to="/signup">
            <button className="button">
              Sign Up <i className="fa-solid fa-user-plus"></i>
            </button>
          </Link>

          <Link to="/login">
            <button className="button">
              Login <i className="fa-solid fa-arrow-right-to-bracket"></i>
            </button>
          </Link>
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
            <h5>"Authentication"</h5>
            <p style={{ textAlign: "justify" }}>
              Sign up today to create your personal music sanctuary. Log in
              securely to save favorite songs, organize custom playlists, and
              access your collection anywhere. Build memories through music that
              stays with you forever, always just one click away. Start your
              musical journey now!
            </p>
          </div>

          <div className="card mx-3">
            <img src={MusicImg} alt="" />
            <hr
              style={{
                border: "1px solid white",
                margin: "9px 0",
                width: "80%",
              }}
            />
            <h5>"Songs"</h5>
            <p style={{ textAlign: "justify" }}>
              Create your free account to securely log in and save favorite
              songs to your personal music vault. Access your collection
              anytime, sync across devices, and build your ultimate playlist
              library with just a few clicks. Join now!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
