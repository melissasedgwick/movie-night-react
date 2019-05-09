const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3001
const db = require('./queries')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, PATCH");
  next();
});

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/lists', db.getLists)
app.post('/lists', db.createList)
app.get('/lists/:id', db.getListById)
app.patch('/lists/:id', db.updateList)
app.delete('/lists/:id', db.deleteList)
app.get('/lists/user/:userid', db.getListsByUserId)

app.post('/listsmovies', db.createListMovie)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
