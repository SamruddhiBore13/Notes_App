import { useContext, useEffect, useState } from "react";
import "./../assets/css/app.css";
import { Navbar } from "./../components/Navbar";
import { NoteCard } from "./../components/NoteCard";
import { NoteDetails } from "./../components/NoteDetails";
import { UpsertNote } from "./../components/UpsertNote";
import { PaletteContext } from "./../context/PaletteContext";
import axios from "axios";

const palettes = [
  { id: 1, color: "#0d1282", name: "blue-palette" },
  { id: 2, color: "#ff2171", name: "rose-palette" },
  { id: 3, color: "#360d95", name: "violet-palette" },
  { id: 4, color: "#333", name: "black-palette" },
];

const Home = () => {

  const { state, dispatch } = useContext(PaletteContext);
  const [onCreateNote, setOnCreateNote] = useState(false);
  const [onViewNote, setOnViewNote] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPalette, setCurrentPalette] = useState(
    state?.palette
      ? palettes.find((p) => p.id === state.palette.id)
      : palettes[0]
  );
  let filteredNotes = [];
  

  const getAllNotes = async() => {
    const allNotes = await axios.get("http://localhost:3000/notes/getAllNotes")
    setNotes(allNotes.data);
  }

  useEffect(() => {
    // const tempNotes = JSON.parse(localStorage.getItem("notes"));
    // tempNotes && setNotes(tempNotes);
    getAllNotes();
  }, []);

  const saveNotes = (items) => {
    localStorage.setItem("notes", JSON.stringify(items));
  };

  const handleCreateNote = async(note) => {
    if (note) {
      const url = "http://localhost:3000/notes/addNewNote"
      const createNote = await axios.post(url, note)
      console.log("Created Note", createNote)

      await getAllNotes();
    }
  };

  const handleOnUpdate = (note) => {
    setCurrentNote(note);
    setOnCreateNote(true);
  };

  const handleUpdateNote = async(note) => {
    if (note) {
      // const tempNotes = [...notes.map((n) => (n.id === note.id ? note : n))];
      // setNotes(tempNotes);
      // setCurrentNote(null);
      // saveNotes(tempNotes);

      const url = `http://localhost:3000/notes/updateNote/${note.id}`;
      const body = {
        title: note.title,
        desc: note.desc
      }
      const updatedNote = await axios.put(url, body)

      await getAllNotes()

    }
  };

  const handleDeleteNote = async(noteId) => {
    // const tempNotes = [...notes.filter((n) => n.id !== noteId)];
    // setNotes(tempNotes);
    // saveNotes(tempNotes);

    const url = `http://localhost:3000/notes/deleteNote/${noteId}`

    const deletedNote = await axios.delete(url);

    console.log("deletedNote", deletedNote);

    await getAllNotes();
  };

  const handleOnPreview = (note) => {
    setCurrentNote(note);
    setOnViewNote(true);
  };

   console.log("filtered notes", notes)

  if (search) {
    filteredNotes = [
      ...notes.filter(
        (n) =>
          n.title.toLowerCase().startsWith(search.toLocaleLowerCase()) ||
          n.desc.toLowerCase().startsWith(search.toLocaleLowerCase())
      ),
    ];
  } else {
    filteredNotes = [...notes];
  }

 

  return (
    <div
      className={`app ${
        state?.palette ? state?.palette?.name : currentPalette?.name
      }`}
    >
      <Navbar
        setOpen={setOnCreateNote}
        state={state}
        dispatch={dispatch}
        setCurrentPalette={setCurrentPalette}
        palettes={palettes}
        currentPalette={currentPalette}
      />
      <div className="wrapper container">
        <div className="search-wrapper">
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="search-input"
            placeholder="Search"
          />
          <button className="search-btn">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <div className="notes-wrapper">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note?.id}
              note={note}
              onDelete={handleDeleteNote}
              onUpdate={handleOnUpdate}
              onPreview={handleOnPreview}
            />
          ))}
        </div>
        {onCreateNote && (
          <UpsertNote
            note={currentNote}
            setCurrentNote={setCurrentNote}
            createNote={handleCreateNote}
            updateNote={handleUpdateNote}
            setOpen={setOnCreateNote}
          />
        )}
        {onViewNote && (
          <NoteDetails note={currentNote} setView={setOnViewNote} />
        )}
      </div>
    </div>
  );
}
// ...existing code...
export default Home;