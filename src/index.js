require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const PORT = process.env.PORT;
const BASE_URL = process.env.BASE_URL;
const corsOptions = {
  exposedHeaders: '*',
  origin: '*',
  optionsSuccessStatus: 200,
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', (req, res) => {
  return res.send(`Api is running at port ${BASE_URL}!`);
});

app.listen(PORT, () => {
  console.log(`Api is running at port ${BASE_URL}!`);
});

app.use((error, req, res, next) => {
  if (process.env.ENV !== 'production') {
    return res.status(500).json({ error: error.message, stack: error.stack });
  }

  return res.status(500).json({ error: 'Internal server error.' });
});

module.exports = app;
