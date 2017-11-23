(function () {
    "use strict";

    // CONSTANTS
    let FavoriteRecipeWrapperElement;
    let listOfFavoriteRecipes;
    let addFavoriteRecipeButton;
    // const apiUrl = "http://localhost:3000/recipes/";
    const apiUrl = "https://college-cookbook-api.herokuapp.com/recipes/";
    let user ={};
    // let listOfIngredientsElement;
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
        FavoriteRecipeWrapperElement = document.getElementById("FavoriteRecipeWrapper");
        listOfFavoriteRecipes = document.getElementById("listOfFavoriteRecipes");
        // addFavoriteRecipeButton = document.getElementById("addFavoriteRecipe");
        // addFavoriteRecipeButton.addEventListener('click', addFavoriteRecipe, false);
        // loadUser();
        loadUser();
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
    function addFavoriteRecipe(e){
        // addRecipe
        const target = e.target;
        const FavoriteRecipesDiv = document.getElementById("FavoriteRecipeList");
        const spanElement = document.createElement("li");
        const spanElementText = document.createTextNode(" Placeholder Recipe name");
        spanElement.appendChild(spanElementText);

        FavoriteRecipesDiv.appendChild(spanElement);
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
            console.log("HERE");
            user._id = userToStoreString;
            getUser();
        }
    }
    function getUser(){
        $.ajax({
            url: apiUrl + user._id,
            type: 'GET',
            data: user,
            dateType: 'JSON',
            success: (data) => {
                if (data) {    
                    user = data;
                    console.log("HERE PART2");
                    console.log(user);
                    console.log("HELP");
                    displayRecipes();
                    // storeUser(user);
                } else {
                    console.log("User not Found");
                }
            },
            error: (request, status, error) => {
                console.log(error, status, request);
            }
        });
    }

    function displayRecipes() {
        const recipesContainer = $('#FavoriteRecipeList');
        let quote;
        user.recipes.forEach ((recipe) => {
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



    window.onload = setup;
})();