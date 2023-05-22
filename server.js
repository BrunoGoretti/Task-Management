const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');

async function getTasks() {
  const uri = 'mongodb://localhost:27017';
  const client = new MongoClient(uri);

  try {
    // Подключение к серверу MongoDB
    await client.connect();

    // Выбор базы данных и коллекции
    const database = client.db('TaskManeger');
    const collection = database.collection('user_tasks'); 

    // Получение данных из коллекции
    const tasks = await collection.find().toArray();
    return tasks;
  } catch (err) {
    console.log(err);
  } finally {
    // Закрытие подключения
    await client.close();
  }
}

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await getTasks();
    res.send(tasks);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});