const note = require('express').Router();
const { writeToFile, readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// Get All - Show all notes from db file
note.get('/', (req, res) =>{
  console.info(`${req.method} request received`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

// Get a note by ID
note.get('/:id', (req, res) =>{
  console.info(`${req.method} request received`);
  console.log(res.body);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

// POST - Save a new note
note.post('/', (req, res) => {
  console.info(`${req.method} request received`);
  console.log(req.body);
});

// Delete - Delete a new note
note.delete('/:id', (req, res) => {
  console.info(`${req.method} request received`);
});

module.exports = note;
