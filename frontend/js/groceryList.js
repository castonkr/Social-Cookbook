(function () {
    "use strict";

    // CONSTANTS
    let homeElement;
    let findRecipesElement;
    let addRecipesElement;
    let favoriteRecipesElement;
    let myGroceryListElement;
    let addList;
    let menuWrapperElement;
    // const apiUrl = "http://localhost:3000/recipes/";
    const apiUrl = "https://college-cookbook-api.herokuapp.com/recipes/";
    // OTHER VARS


    // called when the page first loads to create tiles and empty space 
    function setup() {
        homeElement = document.getElementById("cookbookTitle");
        homeElement.onclick = home;
        findRecipesElement = document.getElementById("find");
        findRecipesElement.onclick = findRecipe;
        addRecipesElement = document.getElementById("add");
        addRecipesElement.onclick = addRecipe;
        favoriteRecipesElement = document.getElementById("favorite");
        favoriteRecipesElement.onclick = favoriteRecipe;
        myGroceryListElement = document.getElementById("grocery");
        myGroceryListElement.onclick = groceryList;
        addList = document.getElementById("addList");
        addList.onclick = addGroceryList;
        menuWrapperElement = document.getElementById("container");
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
    function groceryList() {
        window.location = "grocery-list.html";
    }
    
    function addGroceryList() {
        //get grocery list name
        const listName = $('#listNameInput').val();

        //create container for the new list
        const container = document.createElement("div");
        container.className = "listWrapper";

        //create title for the grocery list
        const newList = document.createElement("h3");
        const newListTitle = document.createTextNode(listName);
        newList.appendChild(newListTitle);

        //create form for future grocery items
        const formElement = document.createElement("form");

        //create input for grocery items
        const groceryItem = document.createElement("form");
        const groceryItemInput = document.createElement("input");
        groceryItemInput.setAttribute("type", "text");
        groceryItem.appendChild(groceryItemInput);
        
        //create add item button
        const addItemButton = document.createElement("button");
        const addItemButtonText = document.createTextNode("Add Item");
        addItemButton.appendChild(addItemButtonText);
        addItemButton.addEventListener('click', addItem, false);

        //create delete list button
        const deleteListButton = document.createElement("button");
        const deleteLisTButtonText = document.createTextNode("Delete");
        deleteListButton.appendChild(deleteLisTButtonText);
        deleteListButton.addEventListener('click', deleteList, false);
        
        //append list to container
        container.appendChild(newList);
        container.appendChild(formElement);
        container.appendChild(groceryItem);
        container.appendChild(addItemButton);
        container.appendChild(deleteListButton);

        //append menu list to the page
        menuWrapperElement.appendChild(container);
    }

    function deleteList(e){
        const target = e.target;
        const t = target.parentElement;
        menuWrapperElement.removeChild(t);
    }

    function addItem(e){
        const target = e.target;
        const inputForm= target.previousSibling;
        const checkboxForm = target.previousSibling;
        const newItemName = $(inputForm.childNodes[0]).val();

        const newItemCheckbox = document.createElement("input");
        newItemCheckbox.setAttribute("type", "checkbox");
        const label = document.createElement('label');
        label.appendChild(document.createTextNode(newItemName));
        
        checkboxForm.appendChild(newItemCheckbox);
        checkboxForm.appendChild(label);

    }

    window.onload = setup;
})();