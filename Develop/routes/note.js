const note = require('express').Router();
const { writeToFile, readFromFile, readAndAppend} = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const db = require('../db/db.json');

// Get All - Show all notes from db file
note.get('/', (req, res) => {
  console.info(`${req.method} request received to get all notes`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST - Save a new note
note.post('/', (req, res) => {
  console.info(`${req.method} request received`);
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };
    readAndAppend(newNote, './db/db.json');
    const response = {
      status: 'success',
      body: newNote,
    };
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in adding new note');
  }
});

// Delete - Delete a note
note.delete('/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile('./db/db.json').then((data) => {
    const parsedData = JSON.parse(data);
    const newArray = [];
    for ( let i = 0; i < parsedData.length; i++){
      if ( noteId != parsedData[i].id){
        newArray.push(parsedData[i]);
      }
    }
    writeToFile('./db/db.json', newArray);
    res.json(newArray);
  });
});

module.exports = note;
