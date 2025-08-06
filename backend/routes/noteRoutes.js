const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

// POST /notes - Add a new note
router.post('/addNewNote', noteController.createNote);

router.get('/getAllNotes', noteController.getAllNotes);

router.put('/updateNote/:id', noteController.updateNote);

router.delete('/deleteNote/:id', noteController.deleteNote);

module.exports = router;
