# Réalisation de l'API

Pour réaliser l'API nous avons utilisé Node JS pour le développement et Postman pour effectuer les différents tests.
## Endpoints API (Schéma)

Voici la liste des endpoints API que nous avons déterminé.
![Endpoints](Endpoints.png)
Pour l'endpoint login, il faut envoyer le mot de passe en sha256.

## Endpoints API (Node JS/Postman)
[Voir le projet Github API](https://github.com/KarelSvbd/BackendUdewish/tree/main)

# Base de données
## Mongo DB

Le moteur de base de données utilisé dans le cadre de ce projet est Mongo DB.
La base de données est hébergée sur un serveur distant à l'aide de [Atlas](https://www.mongodb.com/atlas/database).
## Outils utilisés

Les différents outils que nous avons utilisés pour la réalisation de la base de données :
	- Mongo DB Compass
	- Mongosh (Shell Mongo DB)
	- Mongo DB Atlas
### Schéma de la base de données
![Endpoints](schooldb.png)

# Structure de l'application

## Frontend
- Uitilsation d'HTML/CSS
	- Template pris sur W3.CSS
- Utilisation de TypeScript
	- Appels API
	- Retourner des données à afficher
### Structure frontend
Pour chaque fichier HTML, on retrouve dans le projet un fichier TypeScript et un fichier JavaScript généré à partir du fichier TypeScript.

Le frontend se trouve dans le dossier "frontend" :
- index.html
	- index.js
	- index.ts
	- Page d'accueil du site
		- Affichage de tous les cours
			- L'image des cours est générées avec l'API Pexels.
- courses.html
	- courses.js
	- courses.ts
	- Liste des cours auxquels l'utilisateurs est inscrit
		- L'image des cours est générées avec l'API Pexels.
- login.html
	- login.js
	- login.ts
	- Page de connexion à un compte

![[Structure frontend 1.png]]
### Exemple d'appel API

L'extrait de code ci dessous est tiré du fichier index.ts, qui a pour but d'afficher la liste des cours de la base de données MongoDB dans l'HTML tout en utilisant l'API Pexels pour choisir l'image des cours.

Les informations passé à l'API Pexels pour choisir l'image d'un cours sont :
- Le nom du cours
- La description du cours

Pour chaque cours parcouru, une image est récupérée via Pexels et le cours est ensuite affiché dans l'HTML.

```ts
import { createClient, Photo } from 'pexels';

// Stockage de la clef API
const apiKey = 'insert you api kex';

// URL de l'API qui renvoie la liste des cours
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
      
      // Ajout de la clef API
    myHeaders.append("Authorization", apiKey);

    let requestOptions : RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

	// Définition d'une image par défaut
    let image = "csharpicon.png";
    
   // Requête API avec les paramètres du cours parcouru
    fetch(`https://api.pexels.com/v1/search?query=${cours['name']}${cours['category']}&per_page=1`, requestOptions)
      .then(response => response.text())
      .then(result => {
        let resultArray = JSON.parse(result);
        image = resultArray['photos'][0]['src']['medium'];
        const listecours = document.querySelector("#listecours") as HTMLElement;
        if(index % 3 == 0){
          listecours.innerHTML += `<div class="w3-row-padding">`;
        }

       // Ajout du cours parcouru dans l'HTML
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
    });
  })
  .catch(error => {
    console.error('Error fetching data from API:', error);
  });
```
## Backend / API
- Utilisation de NodeJS
### Structure du backend
Le backend API se trouve dans le dossier "node-rest-shop" :
- API
	- models
		- category.js
			- Modèle de la catégorie basé sur la base MongoDB
		- course.js
			- Modèle des cours basé sur la base MongoDB
		- note.js
			- Modèle des notes basé sur la base MongoDB
		- user.js
			- Modèle des utilisateurs basé sur la base MongoDB
	- routes
		- Liste des endpoints
		- Se base sur le schéma des endpoints disponible dans la section "Réalisation de l'API"
			- categories.js
			- courses.js
			- notes.js
			- users.js
- app.js
	- Permet de démarrer l'application
- package.json
	- Liste des dépendences
- server.js
	- Permet de créer le serveur
