"use strict";
const indexedDBRequest = indexedDB.open("myDatabase", 1);
indexedDBRequest.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction("myObjectStore", "readonly");
    const objectStore = transaction.objectStore("myObjectStore");
    const data = [];
    objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
            data.push(cursor.value);
            cursor.continue();
        }
        else {
            const id_user = data[0]._id;
            const apiUrl3 = `http://10.5.51.40:3000/users/courses/${id_user}`;
            fetch(apiUrl3)
                .then(response => {
                if (!response.ok) {
                    throw new Error('HTTP error ' + response.status);
                }
                return response.json();
            })
                .then(data => {
                data.forEach((cours) => {
                    const listecours = document.querySelector("#listecours");
                    listecours.innerHTML += `
              <div class="w3-third w3-container w3-margin-bottom">
                <img src="csharpicon.png" alt="Norway" style="width:100%" class="w3-hover-opacity">
                <div class="w3-container w3-white">
                  <p><b>${cours['category']}, ${cours['name']}</b></p>
                  <p>${cours['description']}</p>
                </div>
              </div>
            `;
                    console.log(cours);
                });
            })
                .catch(error => {
                console.error('Error fetching data from API:', error);
            });
        }
    };
    transaction.onerror = (event) => {
        console.error("Erreur lors de la récupération des données :", event.target.error);
    };
};
indexedDBRequest.onerror = (event) => {
    console.error("Erreur lors de l'ouverture de la base de données :", event.target.error);
};
