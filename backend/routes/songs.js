const express = require("express");
const Song = require("../models/Songdetails");
const router = express.Router();
const fetchuser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");

// ROUTE 1: getting all notes of the user: GET '/api/songs/fetchallsongs. login required
router.get("/fetchallsongs", fetchuser, async (req, res) => {
  try {
    const songs = await Song.find({ user: req.user.id });
    res.json(songs);
  } catch (error) {
    console.log(error.message);
    res.status(401).json("page not found");
  }
});
  
// ROUTE 2: Adding / Creating songs : POST '/api/songs/addsongs. login required
router.post(
  "/addsong",
  fetchuser,
  [
    body("songName").isLength({ min: 2 }),
    body("link").isLength({ min: 5 }).withMessage("required valid link"),
  ],
  async (req, res) => {
    const { songName, link } = req.body;
    try {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      //   creating songs and adding to mongoo
      const song = await Song.create({
        songName,
        link,
        user: req.user.id,
      });
      res.json(song);
    } catch (error) {
      console.log(error.message);
      res.status(500).json("something went wrong");
    }
  }
);

// ROUTE 3: updating  : POST '/api/songs/updatesong/:id. login required
router.put("/updatesong/:id", fetchuser, async (req, res) => {
  const { songName, link } = req.body;
  try {
    const newSong = {};
    if (songName) {
      newSong.songName = songName;
    }
    if (link) {
      newSong.link = link;
    }

    //   checking if song exsit for updation
    let song = await Song.findById(req.params.id);
    if (!song) {
      res.status(404).json({ error: "page not found" });
    }

    //   checking if user owns the song
    if (song.user.toString() !== req.user.id) {
      res.status(401).jsong("not allowed");
    }

    //   updating
    song = await Song.findByIdAndUpdate(
      req.params.id,
      { $set: newSong },
      { new: true }
    );

    res.json({ song });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("something went wrong");
  }
});

// ROUTE 4: deleeting song  : DELETE '/api/songs/deletesong/:id. login required
router.delete("/deletesong/:id", fetchuser, async (req, res) => {
  try {
    // chekcing the song by id
    let song = await Song.findById(req.params.id);
    if (!song) {
      res.status(404).json("song not found");
    }

    //   cheikng if the user own the songs
    if (song.user.toString() !== req.user.id) {
      res.status(404).json("not allowed");
    }

    // deleting the note
    song = await Song.findByIdAndDelete(req.params.id);
    res.json({ song, success: "Song has been deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("something went wrong");
  }
});

module.exports = router;
