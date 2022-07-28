import { openDB } from 'idb';

const initdb = async () =>
// We are creating a new databased named 'jate' which will be using version 1 of the database.
  openDB('jate', 1, {
    // Adds our data base Schema if it has not been initialized.
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// Not sure of the syntax of the put method. Ask the Tutor. 
export const putDb = async (content) => {

  console.log('ADD to the database');

  // Connects to the database (database, version)
  const jateDb = await openDB('jate', 1);

  // Creates a new transaction and specifies the database and data privileges.
  const tx = jateDb.transaction('jate', 'readwrite')

  // Opens the desired object 
  const store = tx.objectStore('jate');

  // Gets all the data in the database
  const request = store.put({id:1, value: content});

  // Gets confirmation of the request
  const result = await request;
  console.log('🥳- Congrats!!! The data has been saved to the data base!', result.value)
}





// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from database');

  // Connects to the database (database, version)
  const jateDb = await openDB('jate', 1);

  // Creates a new transaction and specifies the database and data privileges.
  const tx = jateDb.transaction('jate', 'readonly');

  // Opens the desired object 
  const store = tx.objectStore('jate');

  // Gets all the data in the database
  const request = store.getAll();

  // Gets confirmation of the request
  const result = await request;
  console.log('🥳- Congrats!!! The data has been saved to the data base!', result)
}

initdb();