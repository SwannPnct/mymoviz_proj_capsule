require('dotenv').config();
var express = require('express');
var router = express.Router();
const request = require('sync-request');
const MovieModel = require('./db/models/Movies')



/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("helloooooooo")
});

router.get('/new-movies', (req,res,next) => {
  const result = request("GET", "https://api.themoviedb.org/3/discover/movie?api_key="+process.env.API_KEY+"&language=fr-FR&include_image_language=fr&sort_by=popularity.desc&include_adult=false&include_video=false&page=1");
  const resultJSON = JSON.parse(result.body);

  res.send(resultJSON);
})

router.post('/movie-wishlist', async (req,res,next)=> {
  const check = await MovieModel.findOne({name: req.body.name});
  if (check) {
    res.json({result: false})
  } else {
    try {
      const newMovie = new MovieModel({
        name : req.body.name,
        img : req.body.img
      })
    
      const savedMovie = await newMovie.save();
    
      res.json({savedMovie,
        result: true})
    } catch (error) {
      res.json({result:false,error})
    }
  }
 
  
})

router.delete('/movie-delete/:name', async (req,res,next)=> {
  try {
    await MovieModel.deleteOne({name: req.params.name});
    res.json({
    result:true
  })
  } catch (error) {
    res.json({result: false, error})
  }
  
})

router.get('/movie-wishlist', async (req,res,next) => {
  try {
    const wishlist = await MovieModel.find();
    res.json({result:true,wishlist})
  } catch (error) {
    res.json({result:false,error})
  }
})

module.exports = router;
