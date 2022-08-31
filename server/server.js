const express = require('express');
const path = require('path');
const app = express();

const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/static/style.css', (req, res)=> {
  return res.status(200).sendFile(path.join(__dirname, '../client/style.css'));
});

app.get('/favicon.ico', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/assets/favicon.ico'));
})

app.use((req, res) => res.sendStatus(404));

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
