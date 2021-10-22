const mysql = require('mysql2');
const api = require('express').Router();

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "password",
        database: "movies_db"
    }
)

// Get a list of all movies
api.get('/movies', (req, res) => {
    db.query('SELECT * FROM movies', (err, results) => {
        if(err) res.status(500).send(err);
        else res.status(200).send(results);
    });
});

// Add a movie
api.post('/add-movie', (req, res) => {
    // console.log(req);
    let movieName = req.body.movie_name;

    db.execute(
        'INSERT INTO movies (movie_name) VALUES (?)', 
        [movieName], 
        (err, response) => {
            if(err) res.status(500).send(err);
            else res.status(200).send(`${movieName} was added.\n`);
        });
});

// Update review
api.post('/update-review', (req, res) => {
    let reviewId = req.body.id;
    let reviewText = req.body.text;

    db.execute(
        'UPDATE reviews SET review=? WHERE id=?',
        [reviewText, reviewId],
        (err, response) => {
            if(err) res.status(500).send(err);
            else res.status(200).send(`Review with ID ${reviewId} was updated to: ${reviewText}\n`);
        });
});

// Delete movie
api.delete('/movie/:id', (req, res) => {
    let id = req.params.id;
    
    db.execute(
        'DELETE FROM movies WHERE id=?',
        [id],
        (err, response) => {
            if(err) res.status(500).send(err);
            else res.status(200).send(`Movie with ID ${id} successfully deleted.\n`);
        }
    );
});

// Add review
api.post('/add-review', (req, res) => {
    let movieId = req.body.movie_id;
    let review = req.body.review;

    db.execute(
        'INSERT INTO reviews (movie_id, review) VALUES (?, ?);',
        [movieId, review],
        (err, response) => {
            if(err) res.status(500).send(err);
            else res.status(200).send(`Review: ${review}, for ${movieId} was added.\n`);
        });
})

module.exports = api;