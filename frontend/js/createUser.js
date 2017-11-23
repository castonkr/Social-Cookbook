(function () {
    "use strict";
  
    // CONSTANTS
    // const apiUrl = "http://localhost:3000";
    const apiUrl = "https://college-cookbook-api.herokuapp.com";
    
    // OTHER VARS
    let user={};
    let Name, addImage, username, password, email, bio;

function getUserInfo(){
    const userObject = {
        name: $('[name="name"]').val(),
        imageURL: $('[name="addImage"]').val(),
        username:   $('[name="Username"]').val(),
        password:  $('[name="Password"]').val(),
        email: $('[name="email"]').val(),
        bio:  $('#bio').val()
    };
    return userObject;
    
   }

   function clickOnRegisterButton() {
    $("#register-button").click((e) => {
        e.preventDefault();
        CreateNewUser(getUserInfo());
    });
  }

  function saveUserIDAndRedirect(userToStore) {
    let error = false;
    try {
        console.log(userToStore._id);
        const userToStoreString = userToStore._id;
        sessionStorage.setItem("userToStore", userToStoreString);
    } catch (e) {
        alert("Error when writing to Session Storage " + e);
        error = true;
    } 
    if (!error) { 
        console.log('redirect added user');
        window.location = "index.html";
    }
}

  function CreateNewUser(user){
    $.ajax({
        url: apiUrl + '/recipes',
        type: 'POST',
        data: user,
        dateType: 'JSON',
        success: (data) => {
            console.log("in create new users"); 
            if (data) {  
                 
                saveUserIDAndRedirect(data);
            console.log("inside of create new user");
            console.log(data);
            } else {
                console.log("Recipe not Found");
            }
        },
        error: (request, status, error) => {
            console.log(error, status, request);
        }
    });
}


   window.onload = clickOnRegisterButton;
})();