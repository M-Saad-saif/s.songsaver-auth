import React, { useState } from "react";
import songContext from "./songContext";

export default function SongsState(props) {
  const inittialSongs = [];
  const [songs, setSongs] = useState(inittialSongs);

  // getting all songs
  const getSongs = async () => {
    const response = await fetch(
      "http://localhost:5000/api/songs/fetchallsongs",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjk1ZmI5MDY1ZmZiMjcyNzNjZWYzNTVjIn0sImlhdCI6MTc2Nzk5MDk3OH0.jvfi3NP7lZZ6DLaMzrUCNgtti9c0hYMIGaqmrY8wISQ",
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.error || "Failed to fetch notes");
    }

    console.log(json);
    setSongs(json)
  };

  // adding a song
  const addSong = async (songName, link) => {
    const response = await fetch("http://localhost:5000/api/songs/addsong", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjk1ZmI5MDY1ZmZiMjcyNzNjZWYzNTVjIn0sImlhdCI6MTc2Nzk5MDk3OH0.jvfi3NP7lZZ6DLaMzrUCNgtti9c0hYMIGaqmrY8wISQ",
      },
      body: JSON.stringify({ songName, link }),
    });

    const song = await response.json();
    // adding song in the frontend
    setSongs(songs.concat(song));
    console.log("adding a song", song);
  };

  // deleteing a song

  const deleteSong = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/songs/deletesong/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjk1ZmI5MDY1ZmZiMjcyNzNjZWYzNTVjIn0sImlhdCI6MTc2Nzk5MDk3OH0.jvfi3NP7lZZ6DLaMzrUCNgtti9c0hYMIGaqmrY8wISQ",
          },
        }
      );

      if (!response.ok) {
        console.error("Error response:", response.status);
        return;
      }

      const json = await response.json();
      console.log("song deleted with id of: " + id);
      console.log(json);

      const newSong = songs.filter((song) => {
        return song._id !== id;
      });
      setSongs(newSong);
    } catch (error) {
      console.error("Failed to delete song:", error);
    }
  };

  // updating the song
  const updateSong = async (id, songName, link) => {
    const response = await fetch(
      `http://localhost:5000/api/songs/updatesong/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjk1ZmI5MDY1ZmZiMjcyNzNjZWYzNTVjIn0sImlhdCI6MTc2Nzk5MDk3OH0.jvfi3NP7lZZ6DLaMzrUCNgtti9c0hYMIGaqmrY8wISQ",
        },
        body: JSON.stringify({ songName, link }),
      }
    );

    const json = await response.json();
    console.log(json);

    let newSong = JSON.parse(JSON.stringify(songs));

    for (let index = 0; index < newSong.length; index++) {
      const element = newSong[index];
      if (element._id === id) {
        element.songName = songName;
        element.link = link;
        break;
      }
    }
    setSongs(newSong);
  };

  return (
    <songContext.Provider
      value={{ songs, getSongs, addSong, deleteSong, updateSong }}
    >
      {props.children}
    </songContext.Provider>
  );
}
