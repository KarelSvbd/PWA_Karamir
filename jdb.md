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
        - Suite du travail sur les EndPoint, creation d'un fichier obsidian pour le diagramme.
        - Création d'un diagramme avec la liste de tous les endpoints -> reflexion de l'organisation des endpoints

## 19.09.2023
Nous devons terminer l'API aujourd'hui.

- 8h05
    - Karel : Creation des modèles mangoose en fonction de la bdd mango db
        - Test Postman
    - Amir : Mise à jour des endpoints et collection de la base mangoDB
        - Documentation du projet API du côté BDD
        - Modifcation du diagramme API selon les nouveaux endpoints
        - Création d'un diagramme -> Schéma de la base de données

----
## Developpment de du frontend

## 26.09.2023

À présent, il faut developper l'application frontend. Après la présentation de Monsieur Zanardi, nous avons commencé à créer le site en TypeScript. Pour ce faire nous avons installé le language grâce à npm puis nous l'avons compilé grâce à tsc.

- Karel : Découverte du TypeScript
    - [Suivi du tuto d'installation](https://www.digitalocean.com/community/tutorials/typescript-new-project)
    - Test de connexion à l'API et récupération des données

- Amir : Recherche et application du style du frontend
    - Création de la page de connexion
    - Je suis rentré car j'étais malade

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
    - Affichage des cours sur l'html via l'API

## 10.10.2023

Nous devons continer le devellopement de l'API, l'objectif du jour est d'ajouter le système d'inscrition aux cours, d'ajouter les images et de paufiner la documentaiton. Pour le système d'images, nous allons essayer pexel et son api.

- Karel
    - Travail sur le système d'inscription aux cours
- Amir
    - Implémentation du clique sur un cours afin de permettre l'appel API pour s'inscrire sur un cours.
    - Implémementation du système d'image par nom de cours.

Nous pensons avoir terminé la partie frontend de l'application.

### 17.10.2023

Suite à la présentation de Monsieur Zanardi, nous devons commencer les PWA. Pour ce faire, il nous a mis à disposition un login FTP. Cependant, avant de mettre notre application sur le site, nous allons devoir mettre notre API en ligne. Monsieur Zanardi nous a conseillé d'utiliser render.com pour l'héberger.

- Karel
    - Déploiement du projet sur un serveur distant à l'aide de github
    - Exportation sous postman des tests avec les nouveaux endpoints
- Amir
    - Documentation du code coté backend et frontend
    - Implémentation de l'API quexel

### 31.10.2023

Présentation et évaluation de notre projet auprès de Monsieur Zanardi, cela a pris une grande partie du cours.
Nous avons ensuite effectué des recherches concernant la création d'une PWA.

### 07.11.2023

Création d'une PWA, le but est de pouvoir télécharger l'application depuis une page web.

- Karel
    - Ajout du manifest
    - Ajout du service worker
    - Faire en sorte qu'une fois que l'utilisateur s'est connecté, il reste connecté et qu'il n'ai pas besoin de saisir son mot de passe à chaque fois.
- Amir
    - Documentation
    - Test -> L'application ne marche pas sur le navigateur Brave mais fonctionne parfaitement sur les autres
    - Test -> L'application a pu être télécharger depuis un navigateur, le navigateur Brave reste à éviter
