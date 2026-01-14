import React, { useState } from "react";
import songContext from "./songContext";

export default function SongsState(props) {
  const inittialSongs = [];
  const [songs, setSongs] = useState(inittialSongs);
  const { setProgress } = props;

  const hostURL = 'http://localhost:5000'
  

  // getting all songs
  const getSongs = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found. User not logged in yet.");
      return;
    }

    try {
      setProgress(10);
      const response = await fetch(
        `${hostURL}/api/songs/fetchallsongs`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        }
      );

      const json = await response.json();

      if (!response.ok) {
        console.error(
          "Error fetching songs:",
          json.error || "Failed to fetch notes"
        );
        return;
      }

      console.log("Songs loaded:", json);
      setSongs(json);
      setProgress(100);
    } catch (error) {
      console.error("Error fetching songs:", error);
      setProgress(100);
    }
  };

  // adding a song
  const addSong = async (songName, link) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found. Please login first.");
      return;
    }

    try {
      setProgress(10);
      const response = await fetch(`${hostURL}/api/songs/addsong`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ songName, link }),
      });

      const song = await response.json();

      if (!response.ok) {
        console.error("Error adding song:", song);
        return;
      }

      // adding song in the frontend
      setSongs(songs.concat(song));
      setProgress(100);

      // Dispatch custom event to notify about song addition
      window.dispatchEvent(new Event("songAdded"));

      console.log("adding a song", song);
    } catch (error) {
      console.error("Error adding song:", error);
    }
  };

  // deleteing a song
  const deleteSong = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found. Please login first.");
      return;
    }

    try {
      setProgress(10);

      const response = await fetch(
        `${hostURL}/api/songs/deletesong/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
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
      setProgress(100);

      // Dispatch custom event to notify about song deletion
      window.dispatchEvent(new Event("songDeleted"));
    } catch (error) {
      console.error("Failed to delete song:", error);
    }
  };

  // updating the song
  const updateSong = async (id, songName, link) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found. Please login first.");
      return;
    }

    try {
      setProgress(10);

      const response = await fetch(
        `${hostURL}/api/songs/updatesong/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify({ songName, link }),
        }
      );

      const json = await response.json();

      if (!response.ok) {
        console.error("Error updating song:", json);
        return;
      }

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
      setProgress(100);
    } catch (error) {
      console.error("Failed to update song:", error);
    }
  };

  return (
    <songContext.Provider
      value={{ songs, getSongs, addSong, deleteSong, updateSong }}
    >
      {props.children}
    </songContext.Provider>
  );
}
