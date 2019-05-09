# Movie Night #

A create-react-app project.


## To Start ##

Clone this repository and navigate into it.

Run `npm install` in both the `movie-night` and `db` directories.

### Web Application ###

Run `npm start` in the `movie-night` directory.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Database and API ###

To set up the database:

1. Open PostgreSQL in the terminal: `psql`.
2. Create a movie-night database:  `CREATE DATABASE movie-night;`
3. Navigate into the database: `\c movie-night`
4. Set up the lists table: `CREATE TABLE lists(id SERIAL PRIMARY KEY, title VARCHAR(60), userid numeric NOT NULL, username VARCHAR(60) NOT NULL);`
5. Set up the lists_movies table: `CREATE TABLE lists_movies(id SERIAL PRIMARY KEY, listid int4 NOT NULL, movieid VARCHAR(60) NOT NULL);`

Once you've set up your database, run `node index.js` in the `db` directory to start the API. You should see 'App running on port 3001' in the terminal.

## Tests ##

Run `npm test` in the `movie-night` directory.

This launches the test runner in the interactive watch mode.
