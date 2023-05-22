const express = require('express');
const bodyParser = require('body-parser');
const { connectToDatabase } = require('./db');
const routes = require('./routes');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

app.use(cors());

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

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});