const express = require('express');
const { ObjectId } = require('mongodb');

const router = express.Router();

router.get('/tasks', async (req, res) => {
  try {
    const { db } = req.app.locals;
    const collection = db.collection('user_tasks');
    const tasks = await collection.find().toArray();
    res.send(tasks);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/tasks', async (req, res) => {
  try {
    const { task_name, task_description } = req.body;
    const { db } = req.app.locals;
    const collection = db.collection('user_tasks');

    const newTask = {
      task_name,
      task_description,
      is_completed: false,
      created_at: new Date(),
      completed_at: null
    };

    const result = await collection.insertOne(newTask);
    res.send(result.ops[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.patch('/tasks/:taskId', async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const { is_completed } = req.body;
    const { db } = req.app.locals;
    const collection = db.collection('user_tasks');

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
  }
});

router.delete('/tasks/:taskId', async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const { db } = req.app.locals;
    const collection = db.collection('user_tasks');

    const result = await collection.deleteOne({ _id: new ObjectId(taskId) });
    if (result.deletedCount === 1) {
      res.send('Task deleted successfully');
    } else {
      res.status(404).send('Task not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;