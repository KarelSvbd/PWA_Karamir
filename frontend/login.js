"use strict";
var _a;
// get the element from html file with id="submit" and add an event listener with the query selector
(_a = document.querySelector("#submit")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    var _a, _b;
    // get the values from the input fields
    const email = (_a = document.querySelector("#email")) === null || _a === void 0 ? void 0 : _a.value;
    const password = (_b = document.querySelector("#password")) === null || _b === void 0 ? void 0 : _b.value;
    console.log(email, CryptoJS.SHA256(password).toString());
    // send a post request to the backend to check the login by passing the data in the body in json and encrypting the password in sha256
    fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password: CryptoJS.SHA256(password).toString(), // use CryptoJS.SHA256 instead of SHA256
        }),
    })
        .then((response) => response.json())
        .then((data) => {
        // if the login is successful, redirect to the notes page
        if (data.success) {
            window.location.href = "/index";
        }
        else {
            // else show an error message
            //document.querySelector("#error")!.innerHTML = data.message;
        }
    })
        .catch((error) => console.error(error));
});
