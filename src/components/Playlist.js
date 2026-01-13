import React, { useState, useContext, useEffect } from "react";
import SongItems from "./SongItems";
import songContext from "../Context/Songs/songContext";

export default function Playlist() {
  const { addSong, songs } = useContext(songContext);

  const [songInput, setSongInput] = useState({ songName: "", link: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [error, setError] = useState("");

  // Update filtered songs whenever search term or songs array changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredSongs(songs);
    } else {
      const filtered = songs.filter((song) =>
        song.songName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSongs(filtered);
    }
  }, [searchTerm, songs]);

  // Validate YouTube URL
  const isValidYouTubeUrl = (url) => {
    const patterns = [
      /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=[\w-]{11}/,
      /^(https?:\/\/)?(www\.)?youtu\.be\/[\w-]{11}/,
      /^(https?:\/\/)?(www\.)?youtube\.com\/embed\/[\w-]{11}/,
    ];
    return patterns.some((pattern) => pattern.test(url));
  };

  // Add new song
  const handleAdd = (e) => {
    e.preventDefault();
    setError("");
    if (!songInput.songName.trim() || !songInput.link.trim()) return;

    if (!isValidYouTubeUrl(songInput.link)) {
      setError("Please enter a valid YouTube URL");
      setTimeout(() => setError(""), 1500);
      return;
    }

    addSong(songInput.songName, songInput.link);

    // Clear input fields
    setSongInput({ songName: "", link: "" });
  };

  // Input handler
  const onChange = (e) => {
    setSongInput({ ...songInput, [e.target.name]: e.target.value });
  };

  return (
    <div className="playlist-container">
      <div className="container_chat_bot">
        <h5>Enter song name</h5>
        <div className="container-chat-options">
          <div className="chat">
            <div className="chat-bot">
              <textarea
                title="Enter song name "
                id="songName"
                name="songName"
                placeholder="Song name ... ♬˚"
                value={songInput.songName}
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
                title="Enter Song link"
                id="link"
                name="link"
                placeholder="Enter Link ... ✦˚"
                value={songInput.link}
                onChange={onChange}
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div style={{ color: "red", marginBottom: "10px", fontSize: "14px" }}>
          {error}
        </div>
      )}

      {/* Search */}
      <div className="d-flex flex-col">
        <input
          style={{
            width: "23rem",
            border: "none",
            height: "40px",
            marginBottom: "19px",
          }}
          type="text"
          placeholder="Search song ... 🔍"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Add Button */}
      <button className="button addBtn" onClick={handleAdd}>
        <div title="Add song" className="inner">
          Add song
        </div>
      </button>

      {/* Song Items */}
      <SongItems songsToDisplay={filteredSongs || []} />
    </div>
  );
}
