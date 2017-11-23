const express = require('express');
const cors = require('cors');
const db = require('./db');
const AuthController = require('./AuthController');
// const recipes = require('./recipes');
// const users = require('./users');
const rotws = require('./rotws');

const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to cookbookdb!');
});

// app.use('/recipes', recipes);
// app.use('/users', users);
app.use('/rotws', rotws);
app.use(cors());
app.use('/auth', AuthController);

app.use((req, res, err) => {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});

module.exports = app;
