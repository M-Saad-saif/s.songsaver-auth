import React, { useContext, useEffect } from "react";
import emptyEmoji from "./Images/emptyEmoji.png";
import songContext from "../Context/Songs/songContext";

export default function SongItems({ songsToDisplay }) {
  const { deleteSong, getSongs } = useContext(songContext);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getSongs();
    }
    // eslint-disable-next-line
  }, []);

  const handleDelete = (id) => deleteSong(id);

  const convertToEmbedUrl = (url) => {
    if (!url) return url;
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    try {
      if (url.includes("youtube.com/watch")) {
        const urlParams = new URLSearchParams(new URL(url).search);
        const videoId = urlParams.get("v");
        return `https://www.youtube.com/embed/${videoId}`;
      }
    } catch {
      return url;
    }
    return url;
  };

  function capitalizeFirstLetter(string) {
    if (string.length === 0) {
      return "";
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const displaySongs = Array.isArray(songsToDisplay) ? songsToDisplay : [];

  return (
    <div className="Songitem-container my-5 d-flex flex-wrap">
      {displaySongs.length === 0 ? (
        <img src={emptyEmoji} alt="" style={{ width: "40px " }} />
      ) : (
        songsToDisplay.map((song) => (
          <div className="songname mx-3" key={song._id}>
            <p>
              <strong>{capitalizeFirstLetter(song.songName)}</strong>
            </p>
            <iframe
              title={song.songName}
              width="250"
              height="200"
              src={convertToEmbedUrl(song.link)}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <p
              id="deletesongBTN"
              title="Delete song"
              onClick={() => handleDelete(song._id)}
            >
              <i className="ri-delete-bin-line"></i> Delete
            </p>
          </div>
        ))
      )}
    </div>
  );
}
