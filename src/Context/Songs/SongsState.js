import React, { useState } from "react";
import songContext from "./songContext";

export default function SongsState(props) {

    // const inittialSongs= []
  const [songs, setSongs] = useState([
    {
      _id: "695fb98f5ffb27273cef3565",
      user: "695fb9065ffb27273cef355c",
      songName: "unko bhi hum su muhubat ho",
      link: "saasdbhsfhdad;ajhdiuy8324yu38879384ahd378d",
      __v: 0,
    },
    {
      _id: "695fb9995ffb27273cef3567",
      user: "695fb9065ffb27273cef355c",
      songName: "addat",
      link: "saasdbhsfhdad;ajhdiuy8324yu38879384ahd378d",
      __v: 0,
    },
    {
      _id: "6961665b2d9b5bd17b8aa27b",
      user: "695fb9065ffb27273cef355c",
      songName: "addat",
      link: "saasdbhsfhdad;ajhdiuy8324yu38879384ahd378d",
      __v: 0,
    },
    {
      _id: "696166722d9b5bd17b8aa27d",
      user: "695fb9065ffb27273cef355c",
      songName: "tum hi ho",
      link: "saasdbhsfhdad;ajhdiuy8324yu38879384ahd378d",
      __v: 0,
    },
    {
      _id: "696166812d9b5bd17b8aa27f",
      user: "695fb9065ffb27273cef355c",
      songName: "alone",
      link: "saasdbhsfhdad;ajhdiuy8324yu38879384ahd378d",
      __v: 0,
    },
    {
      _id: "6961668a2d9b5bd17b8aa281",
      user: "695fb9065ffb27273cef355c",
      songName: "im so lonely",
      link: "saasdbhsfhdad;ajhdiuy8324yu38879384ahd378d",
      __v: 0,
    },
    {
      _id: "696166922d9b5bd17b8aa283",
      user: "695fb9065ffb27273cef355c",
      songName: "perfect",
      link: "saasdbhsfhdad;ajhdiuy8324yu38879384ahd378d",
      __v: 0,
    },
    {
      _id: "696166962d9b5bd17b8aa285",
      user: "695fb9065ffb27273cef355c",
      songName: "i love addah",
      link: "saasdbhsfhdad;ajhdiuy8324yu38879384ahd378d",
      __v: 0,
    },
  ]);

  return <songContext.Provider>{props.childern}</songContext.Provider>;
}
