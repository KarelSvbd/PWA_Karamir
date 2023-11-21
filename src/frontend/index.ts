/*
* Authors : Amir Younes - Karel Vilém Svoboda
* Date    : 21.11.2023
* Desc.   : Affiche tous les cours et donne l'option à l'utilisateur de s'y inscrire
*/
import { createClient, Photo } from 'pexels';

const apiKey = 'GtgoB6opcDmSkbB1iT8mrTEUh7Te3VWt3feoVe7FccyOYXc4AGcTMdCq';
const apiUrl = 'https://backendudewish.onrender.com/courses';

// Affiche tous les cours
fetch(apiUrl)
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
      myHeaders.append("Authorization", apiKey);

      let requestOptions: RequestInit = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      let image = "csharpicon.png";
      //Récupération des images de façon dynamique
      fetch(`https://api.pexels.com/v1/search?query=${cours['name']} ${cours['category']}&per_page=1`, requestOptions)
        .then(response => response.text())
        .then(result => {
          let resultArray = JSON.parse(result);
          image = resultArray['photos'][0]['src']['medium'];
          const listecours = document.querySelector("#listecours") as HTMLElement;
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
          // Affichage 3 par 3
          if (index % 3 == 0) {
            listecours.innerHTML += `<div>`;
          }
          index++;
        })
        .catch(error => console.log('error', error));
    });
  })
  .catch(error => {
    console.error('Error fetching data from API:', error);
  });

// Permet de s'inscrire à un cours
function ClickCourse(id: string, courseName: string) {
  if (window.confirm(`Voulez-vous vous inscrire au cours de ${courseName}`)) {

    const indexedDBRequest = indexedDB.open("myDatabase", 1);

    indexedDBRequest.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction("myObjectStore", "readonly");
      const objectStore = transaction.objectStore("myObjectStore");

      const data: any[] = [];

      objectStore.openCursor().onsuccess = (event) => {

        // Mettre à jour les données des cours dans IndexedDB
        updateCourseDataInIndexedDB(db);
        const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor) {
          data.push(cursor.value);
          cursor.continue();
        } else {
          const id_user = data[0]._id;
          console.log(id_user);
          const apiUrl = `https://backendudewish.onrender.com/users/${id_user}/courses`;

          fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              courseId: id
            })
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('HTTP error ' + response.status);
              }
              return response.json();
            })
            .then(data => {
              alert(`VOUS VOUS ÊTES INSCRIT AU COURS DE ${courseName}`);
            })
            .catch(error => {
              alert(`ERREUR D'INSCRIPTION AVEC LE COURS ${courseName}`);
            });
        }
      }
    }
  } else {
    alert(`VOUS VOUS ÊTES PAS INSCRIT AU COURS DE ${courseName}`);
  }
}

// Permet de mettre à jour indexeddb avec les nouvelles données
function updateCourseDataInIndexedDB(db: IDBDatabase) {
  const apiUrl = 'https://backendudewish.onrender.com/courses';

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('HTTP error ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      const transaction = db.transaction("myObjectStore", "readwrite");
      const objectStore = transaction.objectStore("myObjectStore");

      // Supprimer tous les enregistrements existants
      objectStore.clear();

      // Enregistrer les nouveaux cours dans IndexedDB
      data.forEach((cours: any) => {
        objectStore.add(cours);
      });
    })
    .catch(error => {
      console.error('Error updating course data in IndexedDB:', error);
    });
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
  const indexedDBRequest = indexedDB.open("myDatabase", 1);

  indexedDBRequest.onsuccess = (event: Event) => {
    const db = (event.target as IDBOpenDBRequest).result;
    const transaction = db.transaction("myObjectStore", "readwrite");
    const objectStore = transaction.objectStore("myObjectStore");

    // Supprimer tous les enregistrements
    objectStore.clear();
  };
}
