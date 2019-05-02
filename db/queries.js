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

 pool.query('INSERT INTO lists (title, userId) VALUES ($1, $2) RETURNING *', [title, userId], (error, results) => {
   if (error) {
     throw error
   }
   response.status(201).send(results.rows[0])
 })
}

const getListById = (request, response) => {
 const id = parseInt(request.params.id)

 pool.query('SELECT * FROM lists WHERE id = $1', [id], (error, results) => {
   if (error) {
     throw error
   }
   response.status(200).json(results.rows[0])
 })
}

const updateList = (request, response) => {
  const id = parseInt(request.params.id)
  const { title } = request.body

  pool.query(
    'UPDATE lists SET title = $1 WHERE id = $2 RETURNING *',
    [title, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(results.rows[0])
    }
  )
}

const deleteList = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM lists WHERE id = $1 RETURNING *', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(results.rows[0])
  })
}

module.exports = {
  getLists,
  createList,
  getListById,
  updateList,
  deleteList
}
