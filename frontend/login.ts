/*
* Authors : Karamir
* Date : 03.10.2023
* Description doing things
*/

// open a connection to the database
const request = indexedDB.open("myDatabase", 1);

// create the object store and define the schema
request.onupgradeneeded = (event) => {
  const db = request.result;
  const objectStore = db.createObjectStore("myObjectStore", { keyPath: "_id" });
  objectStore.createIndex("email", "email", { unique: true });
};

// get the element from html file with id="submit" and add an event listener with the query selector
document.querySelector("#submit")?.addEventListener("click", () => {
  // get the values from the input fields
  const email = (document.querySelector("#email") as HTMLInputElement)?.value;
  const password = (document.querySelector("#password") as HTMLInputElement)?.value;

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
      } else {
        // else show an error message
        console.error(data.message);
      }
    })
    .catch((error) => console.error(error));
});