const world = 'world';

export function hello(who: string = world): string {
  return `Hello ${who}! `;
}

// open a connection to the database
const request = indexedDB.open("myDatabase", 1);

// handle errors that may occur when opening the database
request.onerror = (event: any) => {
  console.error("Database error:", event.target.errorCode);
};

// get the data from the object store
request.onsuccess = (event: any) => {
  const db = event.target.result;
  const transaction = db.transaction("myObjectStore", "readonly");
  const objectStore = transaction.objectStore("myObjectStore");
  const request = objectStore.getAll();
  request.onsuccess = (event: any) => {
    const data = event.target.result;
    console.log(data);
  };
};

fetch('http://10.5.51.40:3000/notes')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));