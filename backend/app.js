const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // Parses incoming request body before your handlers 
const logger = require('morgan');
const cors = require('cors');
const path = require('path');

// const db = require('./models/db');

const recipes = require('./recipes');
const rotws = require('./rotws');

const app = express();
let dbURI = 'mongodb://localhost/cookbookdb';
if (process.env.NODE_ENV === 'production') {
    dbURI = process.env.MLAB_URI;
}
mongoose.connect(dbURI, {
    useMongoClient: true
}, (err, res) => {
    if (err) {
        console.log(`ERROR connecting to ${dbURI}. ${err}`);
    } else {
        console.log(`Successfully connected to ${dbURI}.`);

    }
});

const port = process.env.PORT || 3000; 

app.use(bodyParser.json()); // only parse json bodies
// make parsing simple and secure
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));

app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to cookbookdb!');
});

app.use('/recipes', recipes);
app.use('/rotws', rotws);

app.use((req, res, err) => {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});


app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
});


