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
});

// Use express to "get" the notes.html file
app.get("/notes", (req, res) => {
    res.sendFile(__dirname + "/public/notes.html")
});


// Use express and fs to read the JSON file and return notes
app.get("/api/notes", (req, res) => {
    let notesEL = []

    // "get" the info from the notes db and parse them into a JSON object
    fs.readFile(__dirname + "/db/db.json", "utf8", (err, data) => {
        if (err) {
            throw err
        } else {
            notesEL = JSON.parse(data)
        }
        // return a JSON object of the notes element
        res.json(notesEL)
    });
});

// Use express and fs to receive new note, set a unique identifier, and save


// Use express and fs to locate and DELETE notes in db.json







// listen to the port
app.listen(PORT, function () {
    console.log(`Listening to Port ${PORT}`)
})