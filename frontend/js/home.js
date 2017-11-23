
(function () {
    "use strict";

    // CONSTANTS
    // const apiUrl = "https://college-cookbook-api.herokuapp.com";
    const apiUrl = "http://localhost:3000";
    let userToken = null;
    let user = {};
    let rotw = {};

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
        myAccountElement.onclick = account;
        const recipeOfTheWeek = document.getElementById("rotwImage");
        recipeOfTheWeek.onclick = recipe;

        loadROTW();
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


    function loadROTW() {
        let rotwToStoreString, error = false;
        try {
            rotwToStoreString = sessionStorage.getItem("rotwToStore");
        } catch (e) {
            alert("Error when reading from Session Storage " + e);
            error = true;
            window.location = "index.html";
            return false;
        }
        if (!error) {
            rotw = JSON.parse(rotwToStoreString);
            displayROTW();
        }

    }

    function getUserById() {
        $.ajax({
            url: apiUrl + "/recipes/" + user._id,
            type: 'GET',
            data: user,
            dataType: 'JSON',
            success: (data) => {
                if (data) {
                    user = data;
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

    function getUserByToken() {
        $.ajax({
            url: apiUrl + "/auth/user",
            headers: {'x-access-token': userToken},
            type: 'GET',
            data: user,
            dataType: 'JSON',
            success: (data) => {
                if (data) {
                    user = data;
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

    function displayROTW() {
        $('#rotwImage').attr('src', rotw.imageURL);
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
    function recipe() {
        let error = false;
        try {
            const recipeToStoreString = JSON.stringify(rotw);
            console.log(recipeToStoreString);
            sessionStorage.setItem("recipeToStore", recipeToStoreString);
        } catch (e) {
            alert("Error when writing to Session Storage " + e);
            error = true;
        }
        if (!error) {
            window.location = "recipe.html";
        }
    }

    window.onload = setup;
})();
