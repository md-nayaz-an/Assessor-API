const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017';
const databaseName = 'assessor_db';

let database;

async function connectToDatabase() {
    
    const client = new MongoClient(uri);
  
    try {
      await client.connect();
  
      console.log('Connected to MongoDB');
  
      database = client.db(databaseName);
  

    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
}

function getDb() {
  return database;
}

function getVideoCollection() {
  return database.collection('videos');
}

function getQuestionCollection() {
  return database.collection('questions');
}

module.exports = { connectToDatabase, getDb, getVideoCollection, getQuestionCollection };