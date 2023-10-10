/*
* Authors : Karamir
* Date : 03.10.2023
* Description doing thingss
*/
import { createClient, Photo } from 'pexels';

const apiKey = 'GtgoB6opcDmSkbB1iT8mrTEUh7Te3VWt3feoVe7FccyOYXc4AGcTMdCq';
const apiUrl = 'http://10.5.51.40:3000/courses';

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
          <div onclick="ClickCourse('${cours['_id']}', '${cours['name']}')" class="w3-third w3-container w3-margin-bottom" style="color: red;">
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

function ClickCourse(id: string, courseName: string) {
  if (window.confirm(`Voulez vous vous inscrire au cours de ${courseName}`)) {
    
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
          const apiUrl = `http://10.5.51.40:3000/users/${id_user}/courses`;
      
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
              console.log(data);
              alert(`VOUS VOUS ÊTES INSCRIT AU COURS DE ${courseName}`);
            })
            .catch(error => {
              console.error('Error fetching data from API:', error);
              alert(`ERREUR LORS DE L'INSCRIPTION AU COURS DE ${courseName}`);
            });
        }
      }
    }
  } else {
    alert(`VOUS VOUS ÊTES PAS INSCRIT AU COURS DE ${courseName}`);
  }
}

      
      /*const apiUrl = `http://10.5.51.40:3000/users/${id}/courses`;
  
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
          console.log(data);
          alert(`VOUS VOUS ÊTES INSCRIT AU COURS DE ${courseName}`);
        })
        .catch(error => {
          console.error('Error fetching data from API:', error);
          alert(`ERREUR LORS DE L'INSCRIPTION AU COURS DE ${courseName}`);
        });
    } else {
      alert(`VOUS VOUS ÊTES PAS INSCRIT AU COURS DE ${courseName}`);
    }
  }*/