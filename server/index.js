const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/helpers');

const app = express();

app.use(bodyParser.json());

app.get('/avgTrueSize', (req, res) => {
  const { shoeName, shoeBrand } = req.query;
  db.getShoeIdByNameAndBrand(shoeName, shoeBrand)
  .then(id => db.getUsersTrueSizesForDeterminingAverage(id))
  .then(trueSizeAverage => {
      res.send(JSON.stringify({ trueSizeAverage }));
  })
  .catch(err => {
    console.error(err);  
  })
});

app.post('/trueSizeSubmit', (req, res) => {
  const { shoeName, shoeBrand, trueSize } = req.body;
  let shoeId;
  db.getShoeIdByNameAndBrand(shoeName, shoeBrand)
  .then(id => {
    shoeId = id;
    return db.addUserTrueSizeSubmission(id, trueSize);
  })
  .then(() => db.getUsersTrueSizesForDeterminingAverage(shoeId))
  .then(avg => db.updateTrueSizeAverage(shoeId, avg))
  .then(() => {
    res.end('connected');
  })
  .catch(err => {
    console.error(err);
    
  })
});


const port = 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}!`);
  app.keepAliveTimeout = 0;
});