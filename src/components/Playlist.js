import React, { useState, useContext, useEffect } from "react";
import SongItems from "./SongItems";
import songContext from "../Context/Songs/songContext";
import { useNavigate } from "react-router-dom";

export default function Playlist() {
  const navigate = useNavigate();
  const { addSong, getSongs } = useContext(songContext);

  const [error, setError] = useState("");
  const [songs, setSongs] = useState({
    songName: "",
    link: "",
  });


  const handleAdd = (e) => {
    e.preventDefault();
    setError("");
    if (!songs.songName.trim() || !songs.link.trim()) return;
    if (!isValidYouTubeUrl(songs.link)) {
      setError("Please enter a valid YouTube URL");

      setTimeout(() => {
        setError("");
      }, 1500); // Delay in milliseconds

      return;
    }
    addSong(songs.songName, songs.link);
    setSongs({
      songName: "",
      link: "",
    });
  };

  const onChange = (e) => {
    setSongs({ ...songs, [e.target.name]: e.target.value });
  };

  const isValidYouTubeUrl = (url) => {
    const patterns = [
      /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=[\w-]{11}/,
      /^(https?:\/\/)?(www\.)?youtu\.be\/[\w-]{11}/,
      /^(https?:\/\/)?(www\.)?youtube\.com\/embed\/[\w-]{11}/,
    ];

    return patterns.some((pattern) => pattern.test(url));
  };
  return (
    <div className="playlist-container">
      <div className="container_chat_bot">
        <h5>Enter song name</h5>
        <div className="container-chat-options">
          <div className="chat">
            <div className="chat-bot">
              <textarea
                id="songName"
                name="songName"
                placeholder="Song name ... ♬˚"
                value={songs.songName}
                required
                onChange={onChange}
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <div className="container_chat_bot">
        <h5>Enter song Link</h5>
        <div className="container-chat-options">
          <div className="chat">
            <div className="chat-bot">
              <textarea
                id="link"
                name="link"
                placeholder="Enter Link ... ✦˚"
                value={songs.link}
                onChange={onChange}
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div style={{ color: "red", marginBottom: "10px", fontSize: "14px" }}>
          {error}
        </div>
      )}

      <button className="button addBtn " onClick={handleAdd}>
        <div className="inner">Add song</div>
      </button>

      <SongItems />
    </div>
  );
}
