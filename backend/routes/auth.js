const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// secret key
const JWT_SECURE = "123456saadsaif123456";

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
        return res.status(400).json({ error: "User with this email exist" });
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
      res.json({ token: authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).json("Server issue or error occured");
    }
  }
);

//ROUTE 2:  user login : POST '/api/auth/login.  login required

module.exports = router;
