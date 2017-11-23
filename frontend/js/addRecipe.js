(function () {
    "use strict";

    // CONSTANTS
    let ingredientDiv;
    let addIngredientButton;
    let ingredientWrapperElement;
    let listOfIngredientsElement;
    let directionWrapperElement;
    let listOfDirectionsElement;
    let addDirectionButton;
    let user={}, recipe;
    let ingredientsArray = [];
    let directionsArray = [];
    const apiUrl = "https://college-cookbook-api.herokuapp.com/recipes/";
    // const apiUrl = "http://localhost:3000/recipes/";
    // OTHER VARS

    // called when the page first loads
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

        $("#addImage").click(addImage);

        ingredientWrapperElement = document.getElementById("ingredientWrapper");
        listOfIngredientsElement = document.getElementById("listOfIngredients");
        // addIngredientButton = document.getElementById("addIngredient");
        $("#addIngredient").click(addIngredient);

        directionWrapperElement = document.getElementById("directionsWrapper");
        listOfDirectionsElement = document.getElementById("listOfDirections");
        addDirectionButton = document.getElementById("addDirection");
       $("#addDirection").click(addDirection);
        loadUser();
        setupAddRecipeHandlers();
    }
//fix the hardcoded path
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
    function addIngredient(e){
        e.preventDefault();
            const target = e.target;
            const ingredientsDiv = document.getElementById("ingredientsList");
            const ingredientsName = $('#ingredientNameInput').val();
            const spanElement = document.createElement("li");
            const spanElementText = document.createTextNode(ingredientsName);
            spanElement.appendChild(spanElementText);

            ingredientsDiv.appendChild(spanElement);

            ingredientsArray.push(ingredientsName);
            console.log(ingredientsArray);
            return false;
    }   
    
    function addDirection(e){
        e.preventDefault();
        const target = e.target;
        const directionsDiv = document.getElementById("directionsList");
        const directionsName = $('#directionsInput').val();
        const spanElement = document.createElement("li");
        const spanElementText = document.createTextNode(directionsName);
        spanElement.appendChild(spanElementText);

        directionsDiv.appendChild(spanElement);

        directionsArray.push(directionsName);
        console.log(directionsArray);
        return false;
} 

function addImage(e){
    e.preventDefault();
    let imageURL = $('[name="imageurl"]').val();
    let recipeName = $('[name="recipeName"]').val();
    $('#nameOfRecipe').text(recipeName);
    $('#nameOfAuther').text("A Recipe By: " + user.name);
    $('#recipeImage').attr("src", imageURL);
    console.log(ingredientsArray);
    return false;
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
            } else {
                console.log("User not Found");
            }
        },
        error: (request, status, error) => {
            console.log(error, status, request);
        }
    });
}

    function setupAddRecipeHandlers() {
        $("#add-recipe-button").click((e) => {
            console.log("add recipe button clicked");
            e.preventDefault();
            postRecipe(populateRecipe());
            // console.log(populateRecipe());
        });
    }

    function populateRecipe() {
        const ingredients = [];
        const directions = [];
        const recipeObject = {
            name: $('[name="recipeName"]').val(),
            imageURL: $('[name="imageurl"]').val(),
            typeOfMeal: $('[name="typeOfMeal"]').val(),
            prepTime: $('[name="prepTime"]').val(),
            cookTime: $('[name="cookTime"]').val(),
            servingSize: $('[name="servingSize"]').val(),
            cost: $('[name="cost"]').val() 
        };

        ingredientsArray.forEach( (item) => {
            ingredients.push(item);
        });
        recipeObject.ingredients = JSON.stringify(ingredients);

        directionsArray.forEach( (item) => {
            directions.push(item);
        });

        recipeObject.directions = JSON.stringify(directions);

        console.log(recipeObject);
        
        if (recipe && recipe._id) {
            recipeObject._id = recipe._id;
        }
        return recipeObject;
    }


    // function populateIngredient(ingredientName) {
    //     const ingredientObject = {
    //         name: ingredientName
    //     };
    //     return ingredientObject;
    // }
    

    // function createAddRecipeForm(){
    //     const submitButton = $("#addRecipeButton");
    //     submitButton.click( () => {
    //         postRecipe(recipe);
    //     });
    // }

    //Add recipe to the system
    function postRecipe(recipe){
        $.ajax({
            url: apiUrl + user._id + '/recipes',
            type: 'POST',
            data: recipe,
            dateType: 'JSON',
            success: (data) => {
                if (data) {    
                saveRecipeIdAndRedirect(recipe);
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