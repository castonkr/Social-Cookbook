(function () {
    "use strict";

    // CONSTANTS
    const apiUrl = "https://college-cookbook-api.herokuapp.com/recipes/";
    // const apiUrl = "http://localhost:3000/recipes/";
    let user = {};
    // OTHER VARS

    // called when the page first loads to create tiles and empty space 
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
        myAccountElement.onclick = myAccount;
        // listOfMyFavoriteRecipes = document.getElementById("listOfMyFavoriteRecipes");

        loadUser();

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

    function displayAccount() {
        $('#userName').text(user.name);
        $('#userBio').text(user.bio);
        $('#userPic').attr("src", user.imageURL);
        const recipesContainer = $('#myFavoriteRecipeList');
        let quote;
        user.favoriteRecipes.forEach((recipe) => {
            quote = $('<blockquote>').append(
                '<p>' + '<h4>' + recipe.name + '</h4>' + '</p>' + 
                '<p>' + '<span>' + ' Type of Meal: </span> ' + recipe.typeOfMeal + '</p>' +
                '<p>' + '<span>' + 'Cost: ' + recipe.cost + '</span>' + '</p>' +
                '<p>' + '<span>' + 'Serving Size: ' + recipe.servingSize + '</span>' + '</p>'
            );
            recipesContainer.append(quote);
            quote.click( () => {
                saveRecipeIdAndRedirect(recipe);
            });
        // $('#userPic').text(user.)
    });
}

function saveRecipeIdAndRedirect(recipeToStore) {
    let error = false;
    try {
        const recipeToStoreString = JSON.stringify(recipeToStore);
        sessionStorage.setItem("recipeToStore", recipeToStoreString);
    } catch (e) {
        alert("Error when writing to Session Storage " + e);
        error = true;
    } 
    if (!error) { 
        console.log('redirect added recipe');
        window.location = "recipe.html";
    }
}


  
    function getUser() {
        $.ajax({
            url: apiUrl + user._id,
            type: 'GET',
            dateType: 'JSON',
            success: (data) => {
                if (data) {
                    user = data;
                    displayAccount();
                } else {
                    console.log('User Not Found.');
                }
            },
            error: (request, status, error) => {
                console.log(error, status, request);
            }
        });
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
    function myAccount() {
        window.location = "account.html";
    }

    window.onload = setup;
})();

