const { Pool, Client } = require('pg')
const connectionString = "postgres://postgres:sack77@localhost:5433?sslmode=disable"

const pool = new Pool({
  connectionString: connectionString,
})

pool.query('SELECT * from strava_test.strava_users where username = $1', ["mats.becker@gmail.com"], (err, res) => {
  if (err) {
      console.log(err);
      return
  }
    console.log(res.rows)
})

module.exports = {
    query: (text, params, callback) => {
      return pool.query(text, params, callback)
    }
  }