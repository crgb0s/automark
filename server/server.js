const express = require('express');
const path = require('path');
const app = express();
const proxyController = require ('./controllers/proxyController')
const parseController = require ('./controllers/parseController')
const sessionRouter = require ('./routers/sessionRouter')

const mongoose = require('mongoose');
const fs = require('fs');
const {dbUser, dbPassword, dbURL} = require ('./private.js');

const connectionString = `mongodb+srv://${dbUser}:${dbPassword}@${dbURL}/automark?retryWrites=true&w=majority`;
console.log({connectionString});
mongoose.connect(connectionString);

mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/sources/*', proxyController.validateRequest, proxyController.proxyRequest, parseController.parseEdmundsListing, (req, res) => {
  let resHeaders = res.locals.headers;
  res.locals.headers.forEach(([header, value]) => res.header(header, value));
  console.log(res.locals.parsed);
  const response = res.locals.parsed;
  res.status(res.locals.status).json(response);
})

app.use('/session', sessionRouter);

app.get('/static/style.css', (req, res)=> {
  return res.status(200).sendFile(path.join(__dirname, '../client/style.css'));
});

app.get('/favicon.ico', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/assets/favicon.ico'));
})

app.use((req, res) => {
  return res.sendStatus(404)
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
