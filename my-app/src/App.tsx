import "./App.css";
import { dummyNotesList } from "./constants";
import FavoriteButton from "./favoriteButton";
import FavoriteList from "./FavoriteList";
import { useState } from "react";

function App() {
  const [favorites, setFavorites] = useState<string[]>([]);

  const handleToggleFavorite = (item: string) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(item)) {
        return prevFavorites.filter((fav) => fav !== item);
      } else {
        return [...prevFavorites, item];
      }
    });
  };

  return (
    <div className="app-container">
      <form className="note-form">
        <div>
          <input placeholder="Note Title"></input>
        </div>
        <div>
          <textarea></textarea>
        </div>
        <div>
          <select>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="study">Study</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <button type="submit">Create Note</button>
        </div>
      </form>

      <div className="notes-grid">
        {dummyNotesList.map((note) => (
          <div key={note.id} className="note-item">
            <div className="notes-header">
              <FavoriteButton
                item={note.id.toString()}
                isFavorited={favorites.includes(note.id.toString())}
                onToggleFavorite={handleToggleFavorite}
              />
              <button>x</button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <p>{note.label}</p>
          </div>
        ))}
      </div>
      <FavoriteList favorites={favorites} />
    </div>
  );
}

export default App;
