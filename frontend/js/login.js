(function () {
    "use strict";

    // CONSTANTS
    // const apiUrl = "https://college-cookbook-api.herokuapp.com";
    const apiUrl = "http://localhost:3000";
    let usernameInput, passwordInput;

    function setup() {
        getROTW();
        $("#login-button").click((e) => {
            e.preventDefault();
            login(getLoginInfo());
            return false;
        });

        $("#create-user-button").click((e) => {
            e.preventDefault();
            window.location = "html/create-user.html";
            return false;
        });
    }

    function getLoginInfo(){
        const loginInfo = {
            username:   $('[name="username"]').val(),
            password:  $('[name="password"]').val()
        };
        return loginInfo;
        
       }

    function handleError(err, res, msg, statusCode) {
        res.status(statusCode);
        err.status = statusCode;
        err.message = msg;
        res.json({ message: err.status + ' ' + err });
    }

    function login(loginInfo) {
        $.ajax({
            url: apiUrl + "/auth/login",
            type: 'POST',
            data: loginInfo,
            dateType: 'JSON',
            success: (data) => {
                if (data.auth){
                    saveTokenAndRedirect(data.token);
                }
            },
            error: (request, status, error) => {
                console.log(error, status, request);
            }
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
            window.location = "html/index.html";
        }
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