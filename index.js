const { notStrictEqual } = require("assert")

const fs = require("fs")
const express = require("express")
const path = require("path")

const app = express()

PORT = 8080

// Use express to "get" the notes.html file
app.get("/notes", (req,res)=>{
    res.sendFile(path.join(__dirname, "notes.html"))
})
// Use express to "get" the index.html file
app.get("*", (req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"))
})










app.listen(PORT, function () {
    console.log(`Listening to Port ${PORT}`)
})