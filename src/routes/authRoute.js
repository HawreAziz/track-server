const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");
const User = mongoose.model('User');
const router = express.Router();

router.post("/signup", async (req, res) => {
   try {
        const { email, password } = req.body;
        const user = new User({email, password});
        await user.save();
        const token = jwt.sign({ userId: user._id }, 'shhh');
        res.send(token);
    }catch(error){
        return res.status(422).send("Could not register user");
    }
});

router.post("/signin", async (req, res) => {
   const { email, password } = req.body;
   if(!email || !password) {
       return res.status(422).send({ error: 'Must provide an email and a password'});
   }
   const user = await User.findOne({ email });
   if(!user){
       return res.status(422).send({error: "Email not found"});
   }
   try{
       await user.comparePassword(password, user.password);
       console.log('Login successful');
       const token = jwt.sign({userId: user._id}, 'shhh');
       res.send({token});
   }catch (err){
       return res.status(422).send({ error: "Invalid email or password"});
   }
});

module.exports = router;
