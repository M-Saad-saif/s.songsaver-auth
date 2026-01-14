const jwt = require("jsonwebtoken");

// secret key
const JWT_SECURE = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {
  // get token from header
  const token = req.header("auth-token");

  if (!token) {
    return res
      .status(401)
      .json({ error: "please authenticate with valid token" });
  }

  try {
    //   verrifying token
    const data = jwt.verify(token, JWT_SECURE);
    req.user = data.user; 

    next();
  } catch (error) {
    return res.status(401).json({
      error: "Please authenticate using a valid token",
      details: error.message,
    });
  }
};

module.exports = fetchuser;
