(function () {
    "use strict";

    // CONSTANTS
    const apiUrl = "https://college-cookbook-api.herokuapp.com";
    // const apiUrl = "http://localhost:3000";
    let AllUsers;

    // OTHER VARS

    // called when the page first loads to create tiles and empty space 
    function setup() {
        getUsers();
        getROTW();
        $("#login-button").click((e) => {
            e.preventDefault();
            login();
            return false;
        });  
        $("#create-user-button").click((e) => {
            e.preventDefault();
            window.location = "html/create-user.html";
            return false;
        }); 
    }

    function handleError(err, res, msg, statusCode) {
        res.status(statusCode);
        err.status = statusCode;
        err.message = msg;
        res.json({ message: err.status + ' ' + err });
    }

    function login() {
        console.log("in login...");
        let thisUser;
        let userFound = false;
        const usernameInput = $('[name="username"]').val();
        const passwordInput = $('[name="password"]').val();

        console.log(AllUsers);

        AllUsers.forEach((user) => {
            if (user.username == usernameInput && user.password == passwordInput) {
                userFound = true;
                thisUser = user;
                saveUserIDAndRedirect(thisUser);
            }
        });

        // if(!userFound) {
        //     alert("Incorrect username or password.");
        // } else {
        //     saveUserIdAndRedirect(thisUser);
        // }
    }

    function saveUserIDAndRedirect(userToStore) {
        let error = false;
        try {
            const userToStoreString = userToStore._id;
            sessionStorage.setItem("userToStore", userToStoreString);
            
            
        } catch (e) {
            alert("Error when writing to Session Storage " + e);
            error = true;
        } 
        if (!error) { 
            console.log('redirect added user');
            window.location = "html/index.html";
        }
    }



    // function populate


    function getUsers() {
        $.ajax({
            url: apiUrl + "/recipes",
            type: 'GET',
            dateType: 'JSON',
            success: (data) => {
                if (data) {
                    AllUsers = data;
                    console.log(AllUsers);
                } else {
                    console.log("cannot get users");
                }
            },
            error: (request, status, error) => {
                console.log(error, status, request);
            }
        });
    }

    function getROTW() {
        $.ajax({
            url: apiUrl + "/rotws",
            type: 'GET',
            dateType: 'JSON',
            success: (data) => {
                if (data) {
                    const rotw = data[0];
                    saveROTW(rotw);
                } else {
                    console.log("cannot get recipe of the week");
                }
            },
            error: (request, status, error) => {
                console.log(error, status, request);
            }
        });
    }

    function saveROTW(rotwToStore) {
        let error = false;
        try {
            const rotwToStoreString = JSON.stringify(rotwToStore);
            sessionStorage.setItem("rotwToStore", rotwToStoreString);
        } catch (e) {
            alert("Error when writing to Session Storage " + e);
            error = true;
        } 
    }

    window.onload = setup;
})();