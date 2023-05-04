const express = require("express");
const app = express();

const path = require("path");
//sqlite db module importing
const { open } = require("sqlite");
//driver for sqlite
const sqlite3 = require("sqlite3");

const dbPath = path.join(__dirname, "goodreads.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    app.listen(3000, () => {
      console.log("Server is Running on http://localhost:3000");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

//getting books list for that we're creating an api

app.get("/books/", async (request, response) => {
  const getBooksQuery = `
        SELECT 
        *
        FROM
        book 
        ORDER BY 
        book_id;
    `;
  const booksList = await db.all(getBooksQuery);
  //it returns the promise object so we're using await keyword to wait until it reaches to resolved state
  response.send(booksList);
});

initializeDBAndServer();
