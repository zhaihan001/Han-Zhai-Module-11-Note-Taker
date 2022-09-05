const express = require('express');
const noteRouter = require('./note.js');
const app = express();

app.use('/notes',noteRouter);

module.exports = app;
