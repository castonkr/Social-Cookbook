(function () {
  "use strict";

  // CONSTANTS
  // const apiUrl = "http://localhost:3000/recipes/";
  const apiUrl = "https://college-cookbook-api.herokuapp.com/recipes/";
  
  // OTHER VARS
  let user={}, recipe, AllUsers;
  let recipeName,typeOfMeal,prepTime,cookTime,servingSize,cost;
  let searchArray = [];
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
    
    loadUser();
    setupFindRecipeHandlers();
    
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

  }
}

function setupFindRecipeHandlers() {
  $("#search-button").click((e) => {
    const recipesContainer = $('#FoundRecipeList');
    recipesContainer.empty();
      e.preventDefault();
      getRecipeToSearch(); 
      getUsers();
  });
}

function getRecipeToSearch(){
  recipeName=  $('[name="recipeName"]').val();
   typeOfMeal= $('[name="typeOfMeal"]').val();
  prepTime =  $('[name="prepTime"]').val();
  cookTime=  $('[name="cookTime"]').val();
  servingSize =  $('[name="servingSize"]').val();
   cost = $('[name="cost"]').val();
 }

function getUsers() {
  $.ajax({
      url: apiUrl,
      type: 'GET',
      dateType: 'JSON',
      success: (data) => {
          if (data) {
              AllUsers = data;
              AllUsers.forEach(function(userToFind) {
                  searchRecipeName(userToFind);
                  searchTypeOfMeal(userToFind);
                  searchServingSize(userToFind);
                  searchPrepTime(userToFind);
                  searchCost(userToFind);
                  searchCookTime(userToFind);
                
              }, this);
              // console.log(searchArray.length);
              displayRecipes();
              searchArray = [];
              
          } else {
              console.log("cannot get users");
          }
      },
      error: (request, status, error) => {
          console.log(error, status, request);
      }
  });
}
function searchRecipeName(user){
  user.recipes.forEach(function(recipe) {
    if( recipeName!="" && recipe.name.includes(recipeName)){
      if(!searchArray.includes(recipe)){
        console.log("adding recipe " + recipe.name);
        searchArray.push(recipe);
      }
    }
  }, this);
}

function searchTypeOfMeal(user){
  user.recipes.forEach(function(recipe) {
    if(typeOfMeal!="" && recipe.typeOfMeal.includes(typeOfMeal)){
      if(!searchArray.includes(recipe)){
        console.log("adding type of meal" + recipe.typeOfMeal);
        searchArray.push(recipe);
      }
    }
  }, this);
}

function searchPrepTime(user){
  user.recipes.forEach(function(recipe) {
    if( prepTime!="" && recipe.prepTime.includes(prepTime)){
      if(!searchArray.includes(recipe)){
        console.log("adding prep time " + recipe.prepTime);
        searchArray.push(recipe);
      }
    }
  }, this);
}

function searchCookTime(user){
  user.recipes.forEach(function(recipe) {
    if(cookTime!="" && recipe.cookTime.includes(cookTime)){
      if(!searchArray.includes(recipe)){
        console.log("adding cook time" + recipe.cookTime);
        searchArray.push(recipe);
      }
    }
  }, this);
}

function searchServingSize(user){
  user.recipes.forEach(function(recipe) {
    if(servingSize!="" && recipe.servingSize.includes(servingSize)){
      if(!searchArray.includes(recipe)){
        console.log("adding serving size " + recipe.servingSize);
        searchArray.push(recipe);
      }
    }
  }, this);
}

function searchCost(user){
  user.recipes.forEach(function(recipe) {
    if( cost!="" && recipe.cost.includes(cost)){
      if(!searchArray.includes(recipe)){
        console.log("adding recipe cost " + recipe.cost);
        searchArray.push(recipe);
      }
    }
  }, this);
}

function displayRecipes() {
  const recipesContainer = $('#FoundRecipeList');
  let quote;
  searchArray.forEach ((recipe) => {
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

