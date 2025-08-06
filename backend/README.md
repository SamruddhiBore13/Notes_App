# Notes App Backend

This is a Node.js Express application with MongoDB integration for storing notes data. It provides CRUD endpoints for managing notes.

## Features
- Express.js REST API
- MongoDB database (via Mongoose)
- CRUD operations for notes

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Set up your MongoDB connection string in a `.env` file:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```
3. Start the server:
   ```bash
   npm start
   ```

## Endpoints
- `GET /notes` - List all notes
- `POST /notes` - Create a new note
- `GET /notes/:id` - Get a note by ID
- `PUT /notes/:id` - Update a note
- `DELETE /notes/:id` - Delete a note
