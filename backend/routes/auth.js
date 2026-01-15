const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchUser");
const upload = require("../utils/multerconfig");
const Song = require("../models/Songdetails");
require("dotenv").config();

// secret key
const JWT_SECURE = process.env.JWT_SECRET;

//ROUTE 1: creating a user using : POST '/api/auth/createuser. no login required
router.post(
  "/createuser",
  [
    // validator of backend
    body("firstName", "Enter proper Frist name").isLength({ min: 2 }),
    body("lastName", "Enter proper last name").isLength({ min: 2 }),
    body("email", "Enter proper email").isEmail(),
    body("password")
      .isLength({ min: 2 })
      .withMessage("must be at least 2 chars long"),
  ],
  async (req, res) => {
    let success = false;
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // securing the passwords
    const salt = bcrypt.genSaltSync(10);
    const securePass = bcrypt.hashSync(req.body.password, salt);

    try {
      // checking user with same email will throw error
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "User with this email exist" });
      }

      //creating users and savong them in mongooDB
      user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: securePass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      // giving auth token to user in json form
      const authtoken = jwt.sign(data, JWT_SECURE);
      success = true;
      res.json({ success, token: authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).json("Server issue or error occured");
    }
  }
);

//ROUTE 2:  user login : POST '/api/auth/login.  login required
router.post(
  "/login",
  [
    // validator of backend
    body("email", "Enter proper email").isEmail(),
    body("password")
      .isLength({ min: 2 })
      .withMessage("must be at least 2 chars long"),
  ],
  async (req, res) => {
    let success = false;
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // checking if the user with no email try to login
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success, error: "no user found with this Email" });
      }

      // checking password if uesr put correct password
      let comparePass = await bcrypt.compare(password, user.password);
      if (!comparePass) {
        return res
          .status(400)
          .json({ success, error: "login with correct credential" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      // giving auth token to user in json form
      const authtoken = jwt.sign(data, JWT_SECURE);
      success = true;
      res.json({ success, token: authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).json("Server issue or error occured");
    }
  }
);

//ROUTE 3:  getuser through JWT  : POST '/api/auth/getuser.  login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    // finding user by ID
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json(user);
  } catch (error) {
    res.status(401).json({ error: "error occured" });
  }
});

//ROUTE 4:  deleteuser : POST '/api/auth/deleteuser.  login required
router.delete("/deleteuser", fetchuser, async (req, res) => {
  try {
    // finding user by id
    const userId = req.user.id;

    // deleting song of asssosiated user
    const deleteUserSong = await Song.deleteMany({ user: userId });
    // deleting user
    const user = await User.findByIdAndDelete(userId).select("-password");

    // checking if user not found
    if (!user) {
      res.status(401).json({ error: "no user found" });
    }

    res.json({
      user,
      deleteUserSong,
      message: "User successfully and all assosiated deleted",
    });
  } catch (error) {
    res.status(401).json({ error: "error occured" });
  }
});

//ROUTE 5:  Upload profile pic : POST '/api/auth/uploadProfilePic.  login required
router.post(
  "/uploadProfilePic",
  fetchuser,
  upload.single("profilepic"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res
          .status(400)
          .json({ success: false, error: "No file uploaded" });
      }

      const userId = req.user.id;
      const profilepicPath = req.file.path; // Cloudinary URL

      // Update user with new profile pic
      const user = await User.findByIdAndUpdate(
        userId,
        { profilepic: profilepicPath },
        { new: true }
      ).select("-password");

      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: "User not found" });
      }

      res.json({
        success: true,
        user,
        message: "Profile picture uploaded successfully",
      });
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ success: false, error: "Server error: " + error.message });
    }
  }
);

module.exports = router;
