require('../model/Track');
const express = require('express');
const userAuth = require('../middleware/userAuth');
const mongoose = require('mongoose');
const Track = mongoose.model('Track');

const router = express.Router();
router.use(userAuth);

router.get('/tracks', async (req, res) => {
   const tracks = await Track.find({ userId: req.user._id});
   res.send(tracks);
});

router.post('/tracks', async (req, res) => {
   const { name, locations } = req.body;
   if( !name || !locations){
      return res.status(422).send({ error: 'You must provide a name and location'});
   }
   try{
      const track = Track({ name, locations, userId: req.user._id});
      await track.save();
      res.send({ track });
   }catch (error){
      res.status(422).send({ error: error.message });
   }
   console.log('This should be maintained later on');
   res.send('tracks under maitanance.');
});


module.exports = router;