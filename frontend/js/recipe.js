(function () {
    "use strict";
    // const apiUrl = "http://localhost:3000/recipes/";
    const apiUrl = "https://college-cookbook-api.herokuapp.com/recipes/";
    // CONSTANTS
    let user = {}, recipe;
    let ingredientsArray, directionsArray;
    // OTHER VARS

    function setup() {
        const homeElement = document.getElementById("cookbookTitle");
        homeElement.onclick = home;
        const findRecipesElement = document.getElementById("find");
        findRecipesElement.onclick = findRecipe;
        const addRecipesElement = document.getElementById("add");
        addRecipesElement.onclick = addRecipe;
        const favoriteRecipesElement = document.getElementById("favorite");
        favoriteRecipesElement.onclick = favoriteRecipe;
        const myAccountElement = document.getElementById("account");
        myAccountElement.onclick = account;
        const myFavoriteElement = document.getElementById("favorite-button");
        myFavoriteElement.onclick = favorite;

        loadUser();
        loadRecipe();
    }

    function home() {
        window.location = "index.html";
    }

    function findRecipe() {
        window.location = "find-recipe.html";
    }

    function addRecipe() {
        window.location = "add-recipe.html";
    }

    function favoriteRecipe() {
        window.location = "favorite-recipe.html";
    }
    function account() {
        window.location = "account.html";
    }

    function loadUser() {
        let userToStoreString, error = false;
        try {
            userToStoreString = sessionStorage.getItem("userToStore");
        } catch (e) {
            alert("Error when reading from Session Storage " + e);
            error = true;
            window.location = "index.html";
            return false;
        }
        if (!error) {
            user._id = userToStoreString;
            getUser();
        }
    }

    function loadRecipe() {
        let recipeToStoreString, error = false;
        try {
            recipeToStoreString = sessionStorage.getItem("recipeToStore");
        } catch (e) {
            alert("Error when reading from Session Storage " + e);
            error = true;
            window.location = "index.html";
            return false;
        }
        if (!error) {
            recipe = JSON.parse(recipeToStoreString);
            console.log(recipe.name);
            displayRecipe();
        }
    }

    
function storeUser(userToStore) {
    let error = false;
    try {
        const userToStoreString = JSON.stringify(userToStore);
        sessionStorage.setItem("userToString", userToStoreString);
    } catch (e) {
        alert("Error when writing to Session Storage " + e);
        error = true;
    } 
    if (!error) { 
        console.log('redirect added recipe');
        console.log(sessionStorage.getItem("userToString"));
        // window.location = "recipe.html";
    }
}

        function getUser(){
            $.ajax({
                url: apiUrl + user._id,
                type: 'GET',
                dateType: 'JSON',
                success: (data) => {
                    if (data) {    
                        user = data;
                        console.log(user);
                        // storeUser(user);
                    // window.location.href = "./recipe.html";
                    } else {
                        console.log("User not Found");
                    }
                },
                error: (request, status, error) => {
                    console.log(error, status, request);
                }
            });
        }

    function displayRecipe() {
        $('#recipe-title').text(recipe.name);
        $('#prep-time').text("Prep Time: " + recipe.prepTime);
        $('#cook-time').text("Cook Time: " + recipe.cookTime);
        $('#serving-size').text("Serving Size: " + recipe.servingSize);
        $('#cost').text("Cost: " + recipe.cost);
        $('#recipeImage').attr("src", recipe.imageURL);




        displayIngredients();
        displayDirections();

        // $("#share-button").jsSocials({
        //     shares: ["email", "twitter", "pinterest"],
        //     url: "this is the url",
        //     text: "Check out this " + recipe.name + " recipe! " + "Prep Time: " + recipe.prepTime + " Cook Time: " + recipe.cookTime +
        //             " Serving Size: " + recipe.servingSize + " Cost: " + recipe.cost
        // });
        let ingredientsString = "\n";
        ingredientsArray.forEach((item) => {
            ingredientsString = ingredientsString + item + "\n";
        });
        let directionsString = "\n";
        directionsArray.forEach((item) => {
            directionsString = directionsString + item + "\n";
        });
        $("#share-button").jsSocials({
            shares: [  
                {
                    share: "twitter",           // name of share
                    label: "Tweet",
                    text: "I just made " + recipe.name + " using College Cookbook! " + "Visit https://college-cookbook-jkl.firebaseapp.com to get your own cool recipes!"  ,         // share button text (optional)
                    url: "#cookbook"
                    // via: "artem_tabalin",       // custom twitter sharing param 'via' (optional)
                    // hashtags: "jquery,plugin"   // custom twitter sharing param 'hashtags' (optional)
                }, 
                {
                    share: "email",
                    label: "Email", 
                    text: "An Amazing Recipe Awaits!",
                    url:  "Check out this " + recipe.name + " recipe!" + "\n\nPrep Time: " + recipe.prepTime + "\n\nCook Time: " + recipe.cookTime +
                                "\n\nServing Size: " + recipe.servingSize + "\n\nCost: " + recipe.cost + 
                                "\n\nIngredients: " + ingredientsString + "\nDirections" + directionsString
                }                  
            ]
          
        });

  


    }

    function favorite(){
        console.log("Has been clicked");
        recipe.ingredients = JSON.stringify(ingredientsArray);
        recipe.directions = JSON.stringify(directionsArray);
        postFavoriteRecipe(recipe);
    }

        //Add recipe to the system
    function postFavoriteRecipe(recipe){
            $.ajax({
                url: apiUrl + user._id + '/favoriteRecipes',
                type: 'POST',
                data: recipe,
                dateType: 'JSON',
                success: (data) => {
                    if (data) {    
                    // saveRecipeIdAndRedirect(recipe);
                    console.log("inside of post recipe");
                    console.log(data);
                    // window.location.href = "./recipe.html";
                    } else {
                        console.log("Recipe not Found");
                    }
                },
                error: (request, status, error) => {
                    console.log(error, status, request);
                }
            });
    }

    function displayIngredients() {
        if (recipe.ingredients[0] == "["){
            ingredientsArray = JSON.parse(recipe.ingredients);
        } else {
            ingredientsArray = recipe.ingredients;
        }
        
        let checkboxForm = document.getElementById('ingredients-container');

        ingredientsArray.forEach((item) => {
            let checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.name = "name";
            checkbox.value = "value";

            let label = document.createElement('label');
            label.htmlFor = "id";
            label.appendChild(document.createTextNode(item));

            checkboxForm.append(checkbox);
            checkboxForm.appendChild(label);
            checkboxForm.append(document.createElement("br"));
        });
    }

    function displayDirections() {
        console.log(recipe.directions);
        if (recipe.directions[0] == "["){
            directionsArray = JSON.parse(recipe.directions);
        } else {
            directionsArray = recipe.directions;
        }
        
        let directionsList = document.getElementById('directions');

        directionsArray.forEach((item) => {
            let spanElement = document.createElement("li");
            let spanElementText = document.createTextNode(item);
            spanElement.appendChild(spanElementText);
            directionsList.appendChild(spanElement);
        });

    }


    //     const reviewsContainer = $('#book-reviews');
    //     let quote;
    //     reviewsContainer.append($('<h4>').text('Reviews'));
    //     book.reviews.forEach((review) => {
    //         const date = (new Date(review.when)).toLocaleString();
    //         quote = $('<blockquote>').append(
    //             '<p>' +
    //             '<span>' + review.stars + ' Stars</span> ' + review.review + '</p>' +
    //             '<span class="cite">—  ' + review.author + ' on ' + date + '</span>'
    //         );
    //         reviewsContainer.append(quote);
    //         quote.click(() => {
    //             storeReviewAndGotoUpdate(review);
    //         });

    //         $("#submit-book-button").click((e) => {
    //             e.preventDefault();
    //             storeBookAndGotoUpdate(book);
    //         });

    //     });
// }

    window.onload = setup;
})();
