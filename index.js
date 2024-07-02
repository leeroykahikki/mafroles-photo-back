require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const path = require('path');
const { dbconnect } = require('./utils/db');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use('/api', router);

// cron
app.get('/ping', (req, res) => {
  res.send('pong');
});

// Обработка ошибок, последний Middleware
app.use(errorHandler);

const start = () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    dbconnect();
  } catch (e) {
    console.log(e);
  }
};

start();
