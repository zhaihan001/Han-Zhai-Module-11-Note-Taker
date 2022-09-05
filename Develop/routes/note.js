const note = require('express').Router();
const { writeToFile, readFromFile, readAndAppend, readAndDelete } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const db = require('../db/db.json');

// Get All - Show all notes from db file
note.get('/', (req, res) => {
  console.info(`${req.method} request received to get all notes`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// Get a note by ID
// note.get('/:id', (req, res) =>{
//   readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
//   if (req.params.id) {
//     console.info(`${req.method} request received to get a single note by id`);
//     const noteId = req.params.id;
//     for ( const noteElement of db){
//       if ( noteElement.id === noteId ){
//         res.json(noteElement);
//         console.log(res.body);
//         return;
//       }
//     }
//     res.status(404).send('Note not found');
//   } else {
//     res.status(400).send('Note ID not provided');
//   }
// });

// POST - Save a new note
note.post('/', (req, res) => {
  console.info(`${req.method} request received`);
  console.log(req.body);
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

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in adding new note');
  }
});

// Delete - Delete a note
note.delete('/:id', (req, res) => {
  if (req.params.id) {
    const noteId = req.params.id;
    console.info(`${req.method} request received to delete noteID ${noteId}`);
    for (const noteElement of db) {
      if (noteElement.id === noteId) {
        console.log(noteElement.id);
        readAndDelete(noteElement.id, './db/db.json');
        note.get();
        return;
      }
    }
  }
});

module.exports = note;
