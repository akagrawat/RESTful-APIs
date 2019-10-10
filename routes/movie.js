const express = require('express');
const router = express.Router();
const Movie = require('../model/movie');


const movies = [
    { id: 1, name: 'Veerey Ki Wedding', genre: 'Drama' },
    { id: 2, name: 'Padmaavat', genre: 'Period drama' },
    { id: 3, name: 'Pad Man', genre: 'Comedy Drama' },
    { id: 4, name: 'Hate Story 4', genre: 'Erotic thriller' }
]

router.get('/movies', (req,res)=>{
    const movies = Movie.find();
    console.log(movies);
    
});

router.get('/movies/:id',(req,res) =>{
    console.log(req.params.id);
    const movie = Movie.findById(req.params.id)
    res.json(movie);
})

router.post('/movies', async(req, res) => {
    const movie = new Movie({
        name: req.body.name,
        genre: req.body.genre
    })
    //    movie.save(((data) =>{
    //     console.log("d",data)   
    //     res.send(data)})
    //    .catch( err => res.json({message: err}));
    try{
    const savedMovie = await  movie.save();
    res.json(savedMovie);
    } catch(err){
        res.json({message: err})
    }
   
});

router.get('/movies/:name', (req, res) => {
    const movie = movies.find(data =>
        data.name.toLocaleLowerCase().replace(/\s/g, '') === req.params.name.toLocaleLowerCase().replace(/\s/g, ''));
    if (!movie) return res.status(404).send('Movie is not found with this name');
    res.send(movie);
});

router.put('/movies/:name', (req, res) => {
    const movie = movies.find(data => data.name.toLocaleLowerCase().replace(/\s/g, '') ===
        req.params.name.toLocaleLowerCase().replace(/\s/g, ''));

    if (!movie) return res.status(404).send('Movie is not found with this name');
    const movieIndex = movies.indexOf(movie);

    movies[movieIndex].genre = req.body.genre;
    res.send({ id: movie.id, ...req.body });
});

router.delete('/movies/:name', (req, res) => {
    const movie = movies.find(data => data.name.toLocaleLowerCase().replace(/\s/g, '') ===
        req.params.name.toLocaleLowerCase().replace(/\s/g, ''));

    if (!movie) return res.status(404).send('Movie is not found with this name');
    const movieIndex = movies.indexOf(movie);
    let deletedMovie = movies.splice(movieIndex, 1);
    res.send(deletedMovie);
});


module.exports = router;