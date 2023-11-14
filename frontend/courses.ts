/*
* Authors : Karamir
* Date : 03.10.2023
* Description doing thingss
*/
import { createClient, Photo } from 'pexels';

const apiKey = 'GtgoB6opcDmSkbB1iT8mrTEUh7Te3VWt3feoVe7FccyOYXc4AGcTMdCq';
const indexedDBRequest = indexedDB.open("myDatabase", 1);

indexedDBRequest.onsuccess = (event) => {
  const db = (event.target as IDBOpenDBRequest).result;
  const transaction = db.transaction("myObjectStore", "readonly");
  const objectStore = transaction.objectStore("myObjectStore");

  const data: any[] = [];

  objectStore.openCursor().onsuccess = (event) => {
    const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
    if (cursor) {
      data.push(cursor.value);
      cursor.continue();
    } else {
      const id_user = data[0]._id;
      const apiUrl3 = `https://backendudewish.onrender.com/users/courses/${id_user}`;
      fetch(apiUrl3)
        .then(response => {
          if (!response.ok) {
            throw new Error('HTTP error ' + response.status);
          }
          return response.json();
        })
        .then(data => {
          let index = 0;
          data.forEach((cours: any) => {
      
      
            var myHeaders = new Headers();
          myHeaders.append("Authorization", "GtgoB6opcDmSkbB1iT8mrTEUh7Te3VWt3feoVe7FccyOYXc4AGcTMdCq");
      
          let requestOptions : RequestInit = {
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
              const listecours = document.querySelector("#listecours") as HTMLElement;
              if(index % 3 == 0){
                listecours.innerHTML += `<div class="w3-row-padding">`;
              }
        
              console.log("IMAGE : " + image);
              listecours.innerHTML += `
                <div onclick="ClickCourseNote('${cours['_id']}', '${cours['name']}')" class="w3-third w3-container w3-margin-bottom" style="color: red;">
                  <img src="${image}" style="width: 100%; height: 300px;" alt="Norway" style="width:100%" class="w3-hover-opacity">
                  <div class="w3-container w3-white">
                    <p><b>${cours['category']}, ${cours['name']}</b></p>
                    <p>${cours['description']}</p>
                  </div>
                </div>
              `;
              if(index % 3 == 0){
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
    console.error("Erreur lors de la récupération des données :", (event.target as IDBTransaction).error);
  };
};

indexedDBRequest.onerror = (event : any) => {
  console.error("Erreur lors de l'ouverture de la base de données :", (event.target as IDBOpenDBRequest).error);
};


function ClickCourseNote(idCourse: string) {
  let userInput = prompt("Veuillez saisir une note entre 1 et 20 :");

  if (userInput === null || userInput === "") {
      alert("Vous n'avez pas saisi de note.");
  } else {
      let integerNumber = parseInt(userInput);
  
      if (!isNaN(integerNumber) && Number.isInteger(integerNumber) && integerNumber > 0 && integerNumber < 21) {
          let confirmation = confirm("Valider la note de " + integerNumber + "?");
  
          if (confirmation) {
              alert("Vous avez validé.");
              const indexedDBRequest = indexedDB.open("myDatabase", 1);

              indexedDBRequest.onsuccess = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                const transaction = db.transaction("myObjectStore", "readonly");
                const objectStore = transaction.objectStore("myObjectStore");
          
                const data: any[] = [];
          
                objectStore.openCursor().onsuccess = (event) => {
                  const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
                  if (cursor) {
                    data.push(cursor.value);
                    cursor.continue();
                  } else {
                    const id_user = data[0]._id;console.log(id_user);
                    const apiUrl = `https://backendudewish.onrender.com/notes`;
                
                    fetch(apiUrl, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        idCourse: idCourse,
                        note: integerNumber,
                        idUser: id_user
                      })
                    })
                      .then(response => {
                        if (!response.ok) {
                          throw new Error('HTTP error ' + response.status);
                        }
                        return response.json();
                      })
                      .then(data => {
                        console.log(data);
                        alert(`Vote validée`);
                      })
                      .catch(error => {
                        console.error('Error fetching data from API:', error);
                        alert(`Erreur`);
                      });
                  }
                }
              }
          } else {
              alert("Vous avez annulé.");
          }
      } else {
          alert("Ce n'est pas une note valide.");
      }
  }
  
  
}

// Fonction de déconnexion
function logout(): void {
  // Supprimer toutes les données de IndexedDB
  clearIndexedDBData();

  // Rediriger vers la page d'accueil
  window.location.href = "./login.html";
}

// Fonction pour supprimer toutes les données de IndexedDB
function clearIndexedDBData(): void {
  // Ouverture de la base de données
  const indexedDBRequest = indexedDB.open("myDatabase", 1);

  indexedDBRequest.onsuccess = (event: Event) => {
    // Récupère la base de données
    const db = (event.target as IDBOpenDBRequest).result;

    const transaction = db.transaction("myObjectStore", "readwrite");
    // Récupère la table myObjectStore
    const objectStore = transaction.objectStore("myObjectStore");

    // Supprimer tous les enregistrements
    objectStore.clear();
  };
}