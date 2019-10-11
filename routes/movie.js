const express = require('express');
const router = express.Router();
const Movie = require('../model/movie');


// get all movies
router.get('/movies', async (req, res) => {
    const movie = await Movie.find();
    res.json(movie);
});

//add a new movie
router.post('/movies', async (req, res) => {
    const movie = new Movie({
        name: req.body.name,
        genre: req.body.genre
    })
    try {
        const savedMovie = await movie.save();
        res.json(savedMovie);
    } catch (err) {
        res.json({ message: err })
    }

});

// get movie by name
router.get('/movies/:name', async (req, res) => {
    const movie = await Movie.findOne({
        name: req.params.name
    })
    // const movie = movies.find(data =>
    //     data.name.toLocaleLowerCase().replace(/\s/g, '') === req.params.name.toLocaleLowerCase().replace(/\s/g, ''));
    if (!movie) return res.status(404).send('Movie is not found with this name');
    res.send(movie);
});

// update movie
router.patch('/movies/:id', async (req, res) => {

    try{
    const movie = await Movie.updateOne({_id: req.params.id},
        {$set: {name: req.body.name,genre: req.body.genre}});
        res.json(movie);
    } catch(err){
    res.json({ message: err});  
    }
    
});

// delete a movie
router.delete('/movies/:id', async (req, res) => {
    try{
    const removedMovie = await Movie.deleteOne({_id: req.params.id});
    res.json(removedMovie);
    }catch(err){
        res.json({message:err})
    }
});


module.exports = router;