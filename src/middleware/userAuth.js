const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if(!authorization){
    res.status(401).send({error: "Unauthorized user, token was not created."});
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, "shhh", async (error, payload) => {
    if(error){
      res.status(401).send({ error: "Provided token is invalid"});
    }
    const { userId } = payload;
    const user = await User.findById(userId);
    req.user = user;
    next();
  });
}
