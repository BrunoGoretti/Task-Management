const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');

app.use(bodyParser.json());

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

app.post('/tasks', async (req, res) => {
  try {
    const { task_name, task_description } = req.body;

    // Подключение к серверу MongoDB
    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri);

    await client.connect();

    // Выбор базы данных и коллекции
    const database = client.db('TaskManeger');
    const collection = database.collection('user_tasks'); 

    // Создание новой задачи
    const newTask = {
      task_name,
      task_description,
      is_completed: false,
      created_at: new Date(),
      completed_at: null
    };

    // Вставка новой задачи в коллекцию
    const result = await collection.insertOne(newTask);
    res.send(result.ops[0]);
  } catch (err) {
    res.status(500).send(err.message);
  } finally {
    await client.close();
  }
});

app.patch('/tasks/:taskId', async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const { is_completed } = req.body; // Получаем новое значение is_completed из тела запроса

    // Подключение к серверу MongoDB
    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri);

    await client.connect();

    // Выбор базы данных и коллекции
    const database = client.db('TaskManeger');
    const collection = database.collection('user_tasks');

    // Обновление статуса is_completed задачи по идентификатору
    const result = await collection.updateOne(
      { _id: new ObjectId(taskId) },
      { $set: { is_completed } }
    );

    if (result.matchedCount === 0) {
      res.status(404).send('Task not found');
    } else {
      res.sendStatus(200);
    }
  } catch (err) {
    res.status(500).send(err.message);
  } finally {
    await client.close();
  }
});

app.delete('/tasks/:taskId', async (req, res) => {
  try {
    const taskId = req.params.taskId;

    // Подключение к серверу MongoDB
    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri);

    await client.connect();

    // Выбор базы данных и коллекции
    const database = client.db('TaskManeger');
    const collection = database.collection('user_tasks');

    // Удаление задачи по ее идентификатору
    const result = await collection.deleteOne({ _id: new ObjectId(taskId) });
    if (result.deletedCount === 1) {
      res.send('Task deleted successfully');
    } else {
      res.status(404).send('Task not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  } finally {
    await client.close();
  }
});

app.listen(3000, () => {
  console.log('Server is launch in port 3000');
});