const { MongoClient } = require('mongodb');

let client = null;

async function connectToDatabase() {
  if (!client) {
    const uri = 'mongodb://localhost:27017';
    client = new MongoClient(uri);
    await client.connect();
  }
  return client;
}

module.exports = { connectToDatabase };