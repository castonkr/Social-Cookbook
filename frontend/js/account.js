(function () {
    "use strict";

    // CONSTANTS
    // const apiUrl = "https://college-cookbook-api.herokuapp.com/recipes/";
    const apiUrl = "http://localhost:3000";
    let user = {};
    let userToken = null;

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
        const myLogoutElement = document.getElementById("logout");
        myLogoutElement.onclick = logout;
        loadUser();


    }

    function loadUser() {
        let error = false;
        try {
            userToken = sessionStorage.getItem("userToken");
        } catch (e) {
            alert("Error when reading from Session Storage " + e);
            error = true;
            window.location = "index.html";
            return false;
        }
        if (!error) {
            getUserByToken();
        }
    }

    function displayAccount() {
        console.log("display");
        $('#userName').text(user.name);
        $('#userBio').text(user.bio);
        $('#userPic').attr("src", user.imageURL);
        const recipesContainer = $('#myFavoriteRecipeList');
        // let quote;
        // user.favoriteRecipes.forEach((recipe) => {
        //     quote = $('<blockquote>').append(
        //         '<p>' + '<h4>' + recipe.name + '</h4>' + '</p>' + 
        //         '<p>' + '<span>' + ' Type of Meal: </span> ' + recipe.typeOfMeal + '</p>' +
        //         '<p>' + '<span>' + 'Cost: ' + recipe.cost + '</span>' + '</p>' +
        //         '<p>' + '<span>' + 'Serving Size: ' + recipe.servingSize + '</span>' + '</p>'
        //     );
        //     recipesContainer.append(quote);
        //     quote.click( () => {
        //         saveRecipeIdAndRedirect(recipe);
        //     });
        // });
    }

    function getUserByToken() {
        $.ajax({
            url: apiUrl + "/auth/user",
            headers: { 'x-access-token': userToken },
            type: 'GET',
            data: user,
            dataType: 'JSON',
            success: (data) => {
                if (data) {
                    user = data;
                    displayAccount();
                    console.log(user);
                } else {
                    console.log("User not Found");
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
    function logout() {
        $.ajax({
            url: apiUrl + "/auth/logout",
            type: 'GET',
            dataType: 'JSON',
            success: (data) => {
                window.location = "../login.html";
            },
            error: (request, status, error) => {
                console.log(error, status, request);
            }
        });
    }

    window.onload = setup;
})();

