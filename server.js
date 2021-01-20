const fs = require("fs")
const express = require("express")
const path = require("path")

const app = express()

// Set up the port
PORT = process.env.PORT || 8080;


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
app.get("/api/notes", function (req, res) {
    let notesArr = []

    // "get" the info from the notes db and parse them into a JSON object
    fs.readFile(__dirname + "/db/db.json", "utf8", function (err, data) {
        if (err) {
            console.log("Could not parse @ line 39")
            throw err
        } else {
            notesArr = JSON.parse(data)
        }
        // return a JSON object of the notes element
        res.json(notesArr)
    });
});

// Use express and fs to receive new note, set a unique identifier, and save
app.post("/api/notes", function (req, res) {
    let notesArr = [];

    fs.readFile(__dirname + "/db/db.json", "utf8", function (err, data) {
        if (err) {
            console.log("Could not read database @ 55")
            throw err
        } else {
            notesArr = JSON.parse(data)
        }
        // return a JSON object of the notes element
        res.json(notesArr)

        // generate unique id for each note using a conditional
        let noteID = notesArr.length > 0 ? notesArr[notesArr.length - 1].id + 1 : 0;
        // append the unique ID
        notesArr.push({ id: noteID, title: req.body.title, text: req.body.text });

        fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notesArr), function (err, data) {
            if (err) {
                console.log(err);

            } else {
                res.json(data);
            }

        })

    });

});

// Use express and fs to locate and DELETE notes in db.json
app.delete("/api/notes/:id", function (req, res) {
    let notesArr = [];

    fs.readFile(__dirname + "/db/db.json", "utf8", function (err, data) {
        if (err) {
            throw err
        } else {
            notesArr = JSON.parse(data);

            for (var i in notesArr) {
                if (notesArr[i].id === parseInt(req.params.id)) {
                    notesArr.splice(i, 1);
                }
            }

            fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notesArr), function (err, data) {
                if (err) {
                    throw err
                } else {
                    res.send(data)
                }
            })
        }
    });
});






// listen to the port
app.listen(PORT, function () {
    console.log(`Listening to Port ${PORT}`)
})