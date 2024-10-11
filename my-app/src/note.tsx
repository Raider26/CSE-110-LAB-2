import { useState } from "react";
import { Label } from "./types";
import { dummyNotesList } from "./constants";

function Note() {
  const [notes, setNotes] = useState(dummyNotesList);
  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
  };
  const [createNote, setCreateNote] = useState(initialNote);

  const createNoteHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newNote = {
      ...createNote,
      id: notes.length ? notes[notes.length - 1].id + 1 : 1,
    };

    setNotes([...notes, newNote]);

    setCreateNote(initialNote);
  };

  return (
    <div className="app-container">
      <form className="note-form" onSubmit={createNoteHandler}>
        <div>
          <input
            placeholder="Note Title"
            value={createNote.title}
            onChange={(event) =>
              setCreateNote({ ...createNote, title: event.target.value })
            }
            required
          ></input>
        </div>

        <div>
          <textarea
            value={createNote.content}
            onChange={(event) =>
              setCreateNote({ ...createNote, content: event.target.value })
            }
            required
          ></textarea>
        </div>

        <div>
          <select
            value={createNote.label}
            onChange={(event) =>
              setCreateNote({
                ...createNote,
                label: Label[event.target.value as keyof typeof Label],
              })
            }
            required
          >
            <option value="personal">Personal</option>
            <option value="study">Study</option>
            <option value="work">Work</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <button type="submit">Create Note</button>
        </div>
      </form>

      <div className="notes-grid">
        {notes.map((note) => (
          <div key={note.id} className="note-item">
            <div className="notes-header">
              <button>x</button>
            </div>
            <h2> {note.title} </h2>
            <p> {note.content} </p>
            <p> {note.label} </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Note;
