import React, { useContext, useState } from "react";
import { Label } from "./types";
import { dummyNotesList } from "./constants";
import FavoriteButton from "./favoriteButton";
import FavoriteList from "./FavoriteList";
import { ThemeContext } from "./themeContext";

function Note() {
  const [notes, setNotes] = useState(dummyNotesList);
  const [favorites, setFavorites] = useState<number[]>([]);
  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
  };
  const [createNote, setCreateNote] = useState(initialNote);
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);

  const currentTheme = useContext(ThemeContext);

  const createNoteHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newNote = {
      ...createNote,
      id: notes.length ? notes[notes.length - 1].id + 1 : 1,
    };
    setNotes([...notes, newNote]);
    setCreateNote(initialNote);
  };

  const deleteNoteHandler = (noteId: number) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    setNotes(updatedNotes);
  };

  const toggleFavorite = (noteId: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(noteId)
        ? prevFavorites.filter((id) => id !== noteId)
        : [...prevFavorites, noteId]
    );
  };

  const editNoteHandler = (
    event: React.FormEvent<HTMLFormElement>,
    noteId: number
  ) => {
    event.preventDefault();
    setNotes(notes.map((note) => (note.id === noteId ? createNote : note)));
    setEditingNoteId(null);
  };

  const startEditing = (note: any) => {
    setCreateNote(note);
    setEditingNoteId(note.id);
  };

  const favoriteNotes = notes.filter((note) => favorites.includes(note.id));

  return (
    <div className="app-container">
      <form
        className="note-form"
        onSubmit={
          editingNoteId
            ? (e) => editNoteHandler(e, editingNoteId)
            : createNoteHandler
        }
      >
        <div>
          <input
            placeholder="Note Title"
            value={createNote.title}
            onChange={(event) =>
              setCreateNote({ ...createNote, title: event.target.value })
            }
            required
          />
        </div>

        <div>
          <textarea
            value={createNote.content}
            onChange={(event) =>
              setCreateNote({ ...createNote, content: event.target.value })
            }
            required
          />
        </div>

        <div>
          <select
            value={createNote.label}
            onChange={(event) =>
              setCreateNote({
                ...createNote,
                label: event.target.value as Label,
              })
            }
            required
          >
            <option value={Label.personal}>Personal</option>
            <option value={Label.study}>Study</option>
            <option value={Label.work}>Work</option>
            <option value={Label.other}>Other</option>
          </select>
        </div>

        <div>
          <button type="submit">
            {editingNoteId ? "Save Changes" : "Create Note"}
          </button>
        </div>
      </form>

      <div className="notes-grid">
        {notes.map((note) => (
          <div
            key={note.id}
            className="note-item"
            style={{
              backgroundColor: currentTheme.background,
              color: currentTheme.foreground,
            }}
          >
            <div className="notes-header">
              <FavoriteButton
                item={note.id.toString()}
                isFavorited={favorites.includes(note.id)}
                onToggleFavorite={() => toggleFavorite(note.id)}
              />
              <button
                style={{ backgroundColor: "#d3d3d3" }}
                onClick={() => startEditing(note)}
              >
                Edit
              </button>
              <button onClick={() => deleteNoteHandler(note.id)}>x</button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <p>{note.label}</p>
          </div>
        ))}
      </div>

      <FavoriteList favorites={favoriteNotes} />
    </div>
  );
}

export default Note;
