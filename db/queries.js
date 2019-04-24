const { Pool } = require('pg');

const pool = new Pool({
  user: 'melissasedgwick',
  host: 'localhost',
  database: 'movie_night',
  port: 5432,
})

const getLists = (request, response) => {
  pool.query('SELECT * FROM lists ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createList = (request, response) => {
 const { title, userId } = request.body

 pool.query('INSERT INTO lists (title, userId) VALUES ($1, $2) RETURNING *', [title, userId], (error, result) => {
   if (error) {
     throw error
   }
   response.status(201).send(result.rows[0])
 })
}

module.exports = {
  getLists,
  createList
}
