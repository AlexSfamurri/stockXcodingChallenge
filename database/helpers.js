const pg = require('pg-promise')();
const password = require('../config');
const cn = {
  host: 'stampy.db.elephantsql.com',
  port: 5432,
  database: 'cmzwwyoj',
  user: 'cmzwwyoj',
  password: password,
};

const db = pg(cn);

module.exports = {
  addShoe: (name, brand) => db.any(`
  INSERT INTO shoes (name, brand, true_size_avg)
  VALUES ($1, $2, 3)
  `, [name, brand]),

  getShoeIdByNameAndBrand: (name, brand) => db.any(`
  SELECT id FROM shoes
  WHERE name = $1 AND brand = $2
  `, [name, brand]).then(([shoe]) => shoe.id),

  addUserTrueSizeSubmission: (shoeId, trueSize) => db.any(`
  INSERT INTO user_submissions (shoes_id, true_size)
  VALUES ($1, $2)
  `, [shoeId, trueSize]),

  updateTrueSizeAverage: (shoeId, avg) => db.any(`
  UPDATE shoes
  SET true_size_avg = $2
  WHERE id = $1
  `, [shoeId, avg]),

  getUsersTrueSizesForDeterminingAverage: (shoeId) => db.any(`
  SELECT true_size FROM user_submissions
  WHERE shoes_id = $1
  `, [shoeId]).then(submissions => {
    return submissions.reduce((sum, {true_size}, index)=>{
      if(index === submissions.length - 1) {
        return (sum + true_size) / (index + 1);
      }
      return sum + true_size;
    }, 0);
  })
};