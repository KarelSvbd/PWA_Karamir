"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apiKey = 'GtgoB6opcDmSkbB1iT8mrTEUh7Te3VWt3feoVe7FccyOYXc4AGcTMdCq';
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
                let index = 0;
                data.forEach((cours) => {
                    var myHeaders = new Headers();
                    myHeaders.append("Authorization", "GtgoB6opcDmSkbB1iT8mrTEUh7Te3VWt3feoVe7FccyOYXc4AGcTMdCq");
                    let requestOptions = {
                        method: 'GET',
                        headers: myHeaders,
                        redirect: 'follow'
                    };
                    let image = "csharpicon.png";
                    fetch(`https://api.pexels.com/v1/search?query=${cours['name']} ${cours['category']}&per_page=1`, requestOptions)
                        .then(response => response.text())
                        .then(result => {
                        let resultArray = JSON.parse(result);
                        //console.log(resultArray['photos'][0]['src']['medium']);
                        image = resultArray['photos'][0]['src']['medium'];
                        //console.log(resultArray['photos'][0]['src']['medium']);
                        const listecours = document.querySelector("#listecours");
                        if (index % 3 == 0) {
                            listecours.innerHTML += `<div class="w3-row-padding">`;
                        }
                        console.log("IMAGE : " + image);
                        listecours.innerHTML += `
                <div onclick="ClickCourse('${cours['_id']}', '${cours['name']}')" class="w3-third w3-container w3-margin-bottom" style="color: red;">
                  <img src="${image}" style="width: 100%; height: 300px;" alt="Norway" style="width:100%" class="w3-hover-opacity">
                  <div class="w3-container w3-white">
                    <p><b>${cours['category']}, ${cours['name']}</b></p>
                    <p>${cours['description']}</p>
                  </div>
                </div>
              `;
                        if (index % 3 == 0) {
                            listecours.innerHTML += `<div>`;
                        }
                        index++;
                    })
                        .catch(error => console.log('error', error));
                    //console.log(cours);
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
