const Note = require('../models/note');

// Controller to add a new note
exports.createNote = async (req, res) => {
  try {
    const note = new Note({
        id: req.body.id,
        title: req.body.title,
        desc: req.body.desc,
        createdAt: req.body.createdAt
    });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller to get all notes
exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to update an existing note
exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { id: req.params.id },
      {
        title: req.body.title,
        desc: req.body.desc,
        // Optionally update createdAt if needed
      },
      { new: true }
    );
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller to delete a note
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ id: req.params.id });
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};