const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    id: {type: String, required: true},
  title: { type: String, required: true },
  desc: { type: String, required: true },
  createdAt: {type: String, required: true}
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);
