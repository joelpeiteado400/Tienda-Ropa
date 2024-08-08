const connection = require('../models/db.js');

module.exports.ping = (req, res) => {
  const consult = 'SELECT * FROM login';
  connection.query(consult, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Error querying the database');
    } else {
      res.json(results);
    }
  });
};
