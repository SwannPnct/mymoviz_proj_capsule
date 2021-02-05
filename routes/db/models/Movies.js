const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name : String,
    img : String
})

const MovieModel = mongoose.model('movieWishlist', movieSchema);

module.exports = MovieModel;