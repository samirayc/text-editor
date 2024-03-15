import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
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
export const putDb = async (content) => { 
  console.error('putDb not implemented');
  console.log('PUT to the database');
  // Connect to DB
  const textDb = await openDB('text', 1);
  // Make new transaction, specify the db being posted to
  const tx = textDb.transaction('text','readwrite');
  // Open object store
  const store = tx.objectStore('text');
  // Use put method to pass in content
  const request = store.put({ text: content });
  // Confirm data was added
  const result = await request; console.log('Data saved to the database!', result)
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error('getDb not implemented');

initdb();
