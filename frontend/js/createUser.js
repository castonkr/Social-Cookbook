(function () {
    "use strict";
  
    // CONSTANTS
    const apiUrl = "http://localhost:3000";
    // const apiUrl = "https://college-cookbook-api.herokuapp.com";
    
    // OTHER VARS
    let user={};
    let Name, addImage, username, password, email, bio;

function getUserInfo(){
    const userObject = {
        name: $('[name="name"]').val(),
        username:   $('[name="Username"]').val(),
        password:  $('[name="Password"]').val(),
        email: $('[name="email"]').val()
    };
    return userObject;
    
   }

   function clickOnRegisterButton() {
    $("#register-button").click((e) => {
        e.preventDefault();
        CreateNewUser(getUserInfo());
    });
  }

    function saveTokenAndRedirect(token){
        let error = false;
        try {
            sessionStorage.setItem("userToken", token);
        } catch (e) {
            alert("Error when writing to Session Storage " + e);
            error = true;
        } 
        if (!error) { 
            window.location = "index.html";
        }
    }

  function CreateNewUser(user){
    $.ajax({
        url: apiUrl + '/auth/register',
        type: 'POST',
        data: user,
        dateType: 'JSON',
        success: (data) => {
            if (data.auth) {  
                saveTokenAndRedirect(data.token);
            } else {
                console.log("User not created");
            }
        },
        error: (request, status, error) => {
            console.log(error, status, request);
        }
    });
}

   window.onload = clickOnRegisterButton;
})();