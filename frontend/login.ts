/*
* Authors : Karamir
* Date : 03.10.2023
* Description doing things
*/

// Ouvrir une connexion à la base de données
const request = indexedDB.open("myDatabase", 1);

// Créer l'object store et définir le schéma
request.onupgradeneeded = (event) => {
  const db = request.result;
  if (!db.objectStoreNames.contains("myObjectStore")) {
    const objectStore = db.createObjectStore("myObjectStore", { keyPath: "_id" });
    objectStore.createIndex("email", "email", { unique: true });
  }
};

// Obtenir l'élément HTML avec l'ID "submit" et ajouter un gestionnaire d'événements avec le sélecteur de requête
document.querySelector("#submit")?.addEventListener("click", () => {
  // Obtenir les valeurs des champs d'entrée
  const email = (document.querySelector("#email") as HTMLInputElement)?.value;
  const password = (document.querySelector("#password") as HTMLInputElement)?.value;

  // Vérifier si l'utilisateur est déjà enregistré dans IndexedDB
  const db = request.result;
  const transaction = db.transaction("myObjectStore", "readonly");
  const objectStore = transaction.objectStore("myObjectStore");
  const emailIndex = objectStore.index("email");

  const getRequest = emailIndex.get(email);

  /* Interaction avec IDB,
    Vérification si l'utilisateur n'est pas déjà connecté, si oui, redirection.
    Sinon, stockage des données
  */
  getRequest.onsuccess = (event) => {
    const request = event.target as IDBRequest;
    const userData = request.result;
    if (userData) {
      console.log("User data found in IndexedDB");
      window.location.href = "./index.html"; // Rediriger vers index.html
    } else {
      console.log("User data not found in IndexedDB");
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
            console.error(data.message);
          }
        })
        .catch((error) => console.error(error));
    }
  };

  getRequest.onerror = (event) => {
    const request = event.target as IDBRequest;
    console.error("Error checking IndexedDB: " + request.error);
  };
});
