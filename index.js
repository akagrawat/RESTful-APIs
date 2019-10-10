const express = require('express');
const app = express();

app.use(express.json());

const movies = [
    {id: 1,name: 'Veerey Ki Wedding', genre:'Drama'},
    {id: 2,name: 'Padmaavat', genre:'Period drama'},
    {id: 3,name: 'Pad Man', genre:'Comedy Drama'},
    {id: 4,name: 'Hate Story 4', genre:'Erotic thriller'}
] 

app.get('/', (req,res)=>{
    res.send(movies);
});

app.post('/movies', (req,res) =>{

    const movie = {
        id: movies.length + 1,
        name: req.body.name,
        genre: req.body.genre
    }
    movies.push(movie);
    res.send(movie);
});

app.get('/movies/:name',(req,res) =>{
    const movie = movies.find(data => 
         data.name.toLocaleLowerCase().replace(/\s/g,'') === req.params.name.toLocaleLowerCase().replace(/\s/g,''));
    if(!movie) return res.status(404).send('Movie is not found with this name');
    res.send(movie);
});

app.put('/movies/:name', (req,res) =>{
    const movie = movies.find(data => data.name.toLocaleLowerCase().replace(/\s/g,'') === 
                                    req.params.name.toLocaleLowerCase().replace(/\s/g,''));

    if(!movie) return res.status(404).send('Movie is not found with this name');
   const movieIndex =  movies.indexOf(movie);
 
   movies[movieIndex].genre = req.body.genre;
   res.send({id:movie.id,...req.body});
});

app.delete('/movies/:name',(req,res) =>{
    const movie = movies.find(data => data.name.toLocaleLowerCase().replace(/\s/g,'') === 
                                      req.params.name.toLocaleLowerCase().replace(/\s/g,''));

    if(!movie) return res.status(404).send('Movie is not found with this name');
    const movieIndex =  movies.indexOf(movie);
   let deletedMovie = movies.splice(movieIndex,1);
    res.send(deletedMovie);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listing on port ${port}`));
