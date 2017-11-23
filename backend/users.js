
const express = require('express'),
router = express.Router(),
User = require('./models/user');

// Lets us use HTTP verbs such a PUT and DELETE in
// places where the client doesn't support it
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

// function createRecipe(req, res, user){
// const thisRecipe = req.body;
// if (!thisRecipe){
//     handleError(new Error(), res, 'Not Found', 404);
// } else {
    
//     console.log(thisRecipe);
//     thisRecipe.ingredients =  JSON.parse(thisRecipe.ingredients);
//     thisRecipe.directions = JSON.parse(thisRecipe.directions);
//     user.recipes.push(thisRecipe);
//     console.log(user);
//     user.save((err, thisUser) => {
//         if (err) {
//             console.log(err);
//             handleError(err, res, 'Could not add Recipe', 400);
//         } else {
//             res.json(thisUser.recipes[thisUser.recipes.length -1]);
//         }
//     });
// }
// }

// function createFavoriteRecipe(req, res, user){
// const thisRecipe = req.body;
// if (!thisRecipe){
//     handleError(new Error(), res, 'Not Found', 404);
// } else {
    
//     console.log(thisRecipe);
//     thisRecipe.ingredients =  JSON.parse(thisRecipe.ingredients);
//     thisRecipe.directions = JSON.parse(thisRecipe.directions);
//     user.favoriteRecipes.push(thisRecipe);
//     console.log(user);
//     user.save((err, thisUser) => {
//         if (err) {
//             console.log(err);
//             handleError(err, res, 'Could not add Recipe', 400);
//         } else {
//             res.json(thisUser.favoriteRecipes[thisUser.favoriteRecipes.length -1]);
//         }
//     });
// }
// }

// BUILD THE API
router
// Get all users
.get('/', (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            res.statusCode = 404;
            err.status = 404;
            res.json(err); // send error back
        } else {
            res.json(users);
        }
    });
})
.post('/', (req, res) => {
    User.create({
        name: req.body.name,
        imageURL: " ",
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        bio: " ",
        recipes: [],
        favoriteRecipes: []

    }, (err, user) => {
        if (err) {
            res.statusCode = 400;
            err.status = 400;
            res.json(err); // send error back
        } else {
            res.json(user);
        }
    });
});

router.route('/:userid')
//Get user by id
.get((req, res) => {
    console.log("at the backend");
    User.findById(req.params.userid, (err, user) => {
        if (err) {
            res.statusCode = 404;
            err.status = 404;
            res.json(err); // send error back
        } else {
            res.json(user);
        }
    });

//     })
//     // Update contact by id
//     .put((req, res) => {
//         User.findById(req.params.id, (err, user) => {
//             if (err) {
//                 res.statusCode = 404;
//                 err.status = 404;
//                 res.json(err); // send error back
//             } else {
//                 user.name = req.body.name || user.name;
//                 user.username = req.body.username || user.username;
//                 user.password = req.body.password || user.password;
//                 user.email = req.body.email || user.email;
//                 user.imageURL = req.body.imageURL || user.imageURL;
//                 user.bio = req.body.bio || user.bio;
//                 user.myRecipes = req.body.myRecipes || user.myRecipes;

//                 user.save((err, user) => {
//                     if (err) {
//                         res.statusCode = 400;
//                         err.status = 400;
//                         res.json(err); // send error back
//                     } else {
//                         res.json(user);
//                     }
//                 });
//             }
//         });
//     })
//     // Delete contact with id
//     .delete((req, res) => {
//         User.findByIdAndRemove(req.params.id)
//             .exec((err) => {
//                 if (err) {
//                     res.statusCode = 404;
//                     err.status = 404;
//                     res.json(err); // send error back
//                 } else {
//                     res.status = 204;
//                     res.json(null);
//                 }
//             });
});

router.route('/:userid/recipes')
// CREATE a recipe for this user
.post((req, res) => {
    if (req.params && req.params.userid) {
        User.findById(req.params.userid, (err, user) => {
            if (err) {
                handleError(err, res, 'User Not Found', 404);
            } else {
                createRecipe(req, res, user);
            }
        });
    } else {
        handleError({}, res, 'GET error, problem retrieving data', 404);
    }
});

router.route('/:userid/favoriteRecipes')
// CREATE a favorite recipe for this user
.post((req, res) => {
    if (req.params && req.params.userid) {
        User.findById(req.params.userid, (err, user) => {
            if (err) {
                handleError(err, res, 'User Not Found', 404);
            } else {
                createFavoriteRecipe(req, res, user);
            }
        });
    } else {
        handleError({}, res, 'GET error, problem retrieving data', 404);
    }
});

router.route('/:userid/recipes/:recipeid')
// Get user's recipe based on recipeid
.get((req, res) => {
    console.log("trying to find the recipe given the user ID");
    if (req.params && req.params.userid) {
        User.findById(req.params.userid, (err, recipe) => {
            if (err) {
                handleError(err, res, 'Not Found', 404);
            } else {
                res.json(recipe);
            }
        });
    } else {
        handleError(new Error(), res, 'GET error, problem retrieving data', 404);
    }
});

module.exports = router;



