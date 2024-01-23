const path = require('path');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGODB_URI, { dbName: 'Flashcards' })
  .then(console.log('DB Connected (ﾉ^ヮ^)ﾉ*:･ﾟ✧'));

// To do: require routers and config 
const deckRouter  = require('./routers/deckRouter');
const cardRouter  = require('./routers/cardRouter');

const PORT = process.env.PORT;

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/deck', deckRouter);
app.use('/card', cardRouter);

app.get('/', (req, res) => {
  return res
    .status(200)
    .sendField(path.join(__dirname, '../client/index.html'));
});

app.use('*', (req, res) => res.status(404).send('Page not found'));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught an unknown middlware error',
    status: 500,
    message: { err: 'An error occured' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj);
  return res.status(errorObj.status).send(errorObj.message);
});

app.listen(PORT, () =>
  console.log(`Server online, listening on port: ${PORT}`)
);
