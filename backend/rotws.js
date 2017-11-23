
const express = require('express'),
router = express.Router(),
Rotw = require('./models/rotw');

const methodOverride = require('method-override');

router.use(methodOverride((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        const method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

function handleError(err, res, msg, statusCode) {
    res.status(statusCode);
    err.status = statusCode;
    err.message = msg;
    res.json({ message: err.status + ' ' + err }); 
}

// BUILD THE API

router
// Get recipe of the week object
.get('/', (req, res) => {
    Rotw.find({}, (err, rotws) => {
        if (err) {
            res.statusCode = 404;
            err.status = 404;
            res.json(err); // send error back
        } else {
            console.log("finding the rotw");
            console.log(rotws);
            res.json(rotws);
        }
    });
});

//Get recipe of the week id
router.route('/:recipeid')
.get((req, res) => {
    console.log(req.params);
    Rotw.findById(req.params.recipeid, (err, recipe) => {
        if (err) {
            res.statusCode = 404;
            err.status = 404;
            res.json(err); // send error back
        } else {
            res.json(recipe);
        }
    });
});


module.exports = router;