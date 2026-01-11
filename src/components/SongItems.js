import React, { useContext, useEffect } from "react";
import songContext from "../Context/Songs/songContext";

export default function SongItems() {
  const context = useContext(songContext);

  const { deleteSong, songs, getSongs } = context;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getSongs();
    }
    // eslint-disable-next-line
  }, []);

  const handleDelete = (id) => {
    deleteSong(id);
  };

  // conversion of link into embaded
  const convertToEmbedUrl = (url) => {
    if (!url) return url;
    // For youtu.be short URLs
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    // For youtube.com/watch URLs
    try {
      if (url.includes("youtube.com/watch")) {
        const urlParams = new URLSearchParams(new URL(url).search);
        const videoId = urlParams.get("v");
        return `https://www.youtube.com/embed/${videoId}`;
      }
    } catch (e) {
      return url;
    }

    return url;
  };

  return (
    <div className="Songitem-container my-5 d-flex flex-wrap">
      {songs && songs.length === 0 ? (
        <div className="Songitem-container my-5">No songs added yet.</div>
      ) : songs && songs.length > 0 ? (
        songs.map((song) => (
          <div className="songname mx-3" key={song._id}>
            <p>
              <strong>{song.songName}</strong>
            </p>
            <iframe
              title={song.songName}
              width="300"
              height="200"
              src={convertToEmbedUrl(song.link)}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <p
              title="Delete song "
              onClick={() => handleDelete(song._id)}
              style={{
                background: "red",
                width: "54%",
                textAlign: "center",
                borderRadius: "10px",
                justifySelf: "center",
                cursor: "pointer",
              }}
            >
              <i className="ri-delete-bin-line"></i> Delete
            </p>
          </div>
        ))
      ) : (
        <div className="Songitem-container my-5">Loading songs...</div>
      )}
    </div>
  );
}
