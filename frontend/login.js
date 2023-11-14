"use strict";
/*
* Authors : Karamir
* Date    : 14.11.2023
* Desc.   : Login of the application
*/
var _a;
// open a connection to the database
const request = indexedDB.open("myDatabase", 1);
request.onupgradeneeded = (event) => {
    const db = request.result;
    const objectStore = db.createObjectStore("myObjectStore", { keyPath: "_id" });
    objectStore.createIndex("email", "email", { unique: true });
};
// open the connection to the database and check IndexedDB data on success
request.onsuccess = (event) => {
    checkIndexedDBData((hasData) => {
        if (hasData) {
            window.location.href = "./index.html";
        }
    });
};
// create the object store and define the schema
request.onupgradeneeded = (event) => {
    const db = request.result;
    const objectStore = db.createObjectStore("myObjectStore", { keyPath: "_id" });
    objectStore.createIndex("email", "email", { unique: true });
};
// get the element from html file with id="submit" and add an event listener with the query selector
(_a = document.querySelector("#submit")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    checkIndexedDBData((hasData) => {
        var _a, _b;
        if (hasData) {
            window.location.href = "./index.html";
        }
        else {
            // get the values from the input fields
            const email = (_a = document.querySelector("#email")) === null || _a === void 0 ? void 0 : _a.value;
            const password = (_b = document.querySelector("#password")) === null || _b === void 0 ? void 0 : _b.value;
            // send a post request to the backend to check the login by passing the data in the body in json and encrypting the password in sha256
            fetch("https://backendudewish.onrender.com/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password: CryptoJS.SHA256(password).toString(),
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                console.log(data);
                // if the login is successful, store the data in IndexedDB and redirect to the main page
                if (data[0]._id) {
                    const db = request.result;
                    const transaction = db.transaction("myObjectStore", "readwrite");
                    const objectStore = transaction.objectStore("myObjectStore");
                    objectStore.put(data[0]);
                    transaction.oncomplete = () => {
                        console.log("Data stored in IndexedDB");
                        window.location.href = "./index.html";
                    };
                }
                else {
                    // else show an error message
                    console.error(data.message);
                }
            })
                .catch((error) => console.error(error));
        }
    });
});
// Function to check if there are data in IndexedDB
function checkIndexedDBData(callback) {
    const db = request.result;
    if (db) {
        const transaction = db.transaction("myObjectStore", "readonly");
        const objectStore = transaction.objectStore("myObjectStore");
        const getAllRequest = objectStore.getAll();
        getAllRequest.onsuccess = (event) => {
            const data = getAllRequest.result;
            console.log(event);
            console.log(data);
            if (data && data.length > 0) {
                console.log("IndexedDB contains data:", data);
                callback(true);
            }
            else {
                console.log("IndexedDB is empty or does not exist");
                callback(false);
            }
        };
        getAllRequest.onerror = (event) => {
            console.error("Error checking IndexedDB: " + getAllRequest.error);
        };
    }
    else {
        console.error("IndexedDB is null");
    }
}
