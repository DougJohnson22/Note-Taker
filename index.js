const { notStrictEqual } = require("assert")

const fs = require("fs")
const express = require("express")
const path = require("path")

const app = express()

// Set up the port
PORT = 8080


// Allow express to access the public folder
app.use(express.static("public"))

// Allow express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Use express to "get" the index.html file
app.get("/", (req, res) => {
    res.sendFile(__dirname, "index.html")
})

// Use express to "get" the notes.html file
app.get("/notes", (req, res) => {
    res.sendFile(__dirname + "/public/notes.html")
})

// Use express and fs to read the JSON file and return notes

// Use express and fs to receive new note and save

// Use express and fs to locate and DELETE notes in db.json







// listen to the port
app.listen(PORT, function () {
    console.log(`Listening to Port ${PORT}`)
})