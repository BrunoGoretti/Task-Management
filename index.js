const express = require('express');
const bodyParser = require('body-parser');
const { connectToDatabase } = require('./db');
const routes = require('./routes');

const app = express();
app.use(bodyParser.json());

app.use(async (req, res, next) => {
  try {
    const client = await connectToDatabase();
    req.app.locals.db = client.db('TaskManeger');
    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.use('/', routes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});