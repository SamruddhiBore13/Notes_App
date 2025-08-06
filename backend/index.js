require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

const cors = require('cors');
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// ...existing code...

// Use note routes
const noteRoutes = require('./routes/noteRoutes');
app.use('/notes', noteRoutes);

// ...existing code...

app.delete('/notes/:id', async (req, res) => {
  const note = await Note.findByIdAndDelete(req.params.id);
  if (!note) return res.status(404).send('Note not found');
  res.json({ message: 'Note deleted' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
