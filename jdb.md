# Journal de Bord - PWA
Amir Younes / Karel Vilém Svoboda  
T.IS-E2A/B

## Developpment du backend API

### 05.09.2023

Présentation des objectifs du cours et des languages.  
Languages choisis : NodeJS / ExpressJS / MangoDB  
Nous avons choisis ces languages en vue de leur utilisation dans le monde professionel.  
Après un tirage au sort, nous avons décidé que Amir allait se documenter sur MangoDB et Karel sur Node et Express.

- 10h05 : Début de la documentation 
    - Karel
        - [Installation de Node](https://www.youtube.com/watch?v=R73JI8rwkKc)
        - [Apprentissage de NodeJS, Express](https://www.youtube.com/watch?v=0oXYLzuucwE&list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q)
    - Amir
        - [Installation de MongoDB](https://www.mongodb.com/docs/manual/tutorial/getting-started/)

- 11H00 : Décision des EndPoints en commun


### 12.09.2023
Nous continuons le développement de l'API.

- 8h05 : Suite du travail
    - Karel
        - [Suivi du tutoriel](https://www.youtube.com/watch?v=0oXYLzuucwE&list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q)
            - Creation des premières routes
            - Ajout des modèles avec mangoose
    - Amir :
        - Suite du travail sur les EndPoint, creation d'un fichier obsidian pour le diagrame.

## 19.09.2023
Nous devons terminer l'API aujourd'hui.

- 8h05
    - Karel : Creation des modèles mangoose en fonction de la bdd mango db
        - Test Postman
    - Amir : Mise à jour des endpoints et collection de la base mangoDB
        - Documentation du projet API du côté BDD

----
## Developpment de du frontend

## 26.09.2023

À présent, il faut developper l'application frontend. Après la présentation de Monsieur Zanardi, nous avons commencé à créer le site en TypeScript. Pour ce faire nous avons installé le language grâce à npm puis nous l'avons compilé grâce à tsc.

- Karel : Découverte du TypeScript
    - [Suivi du tuto d'installation](https://www.digitalocean.com/community/tutorials/typescript-new-project)
    - Test de connexion à l'API et récupération des données

- Amir : Recherche et application du style du frontend
    - Création de la page de connexion

On s'est rendu compte que notre api n'avait pas de système de login ni de connexion, par conséquent nous devons légerement retraivailler la base et les points d'entrées.

## 03.10.2023

Nous continuons à developper le front end de l'API. La dernière fois nous avons presque terminé le login, il nous manquais juste la redirection en cas de réussite de la connexion. Par la suite, nous allons devoir stoquer les données dans une BDD IndexedDB afin de les faire passer dans les autres pages et continuer à developper les autres fonctionnalités.

- Karel
    - Fin du login
        - Demande à Mr Zanardi pour la correction du problème du login.
        - Même si la requête fonctionne et que l'API renvoie un code 200, il nous est impossible de l'interpreter dans le code. Le problème vennait du fait que on cherchait une donnée qui n'existait pas.
    - Travail sur l'affichage des cours en fonction des inscriptions de l'utlisateur
-  Amir
    - Refonte de l'HTML et creation du server.
        - Creation d'une bonne ergonomie pour l'application.
    - Nous avons fait en sorte de nous connecter sur le même travail afin de simplifier le travail en commun.