import React from "react";
import { Note } from "./types";

interface FavoriteListProps {
  favorites: Note[];
}

const FavoriteList: React.FC<FavoriteListProps> = ({ favorites }) => {
  return (
    <div>
      <h3>List of favorites:</h3>
      {favorites.length > 0 ? (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {favorites.map((note) => (
            <li key={note.id}>{note.title}</li>
          ))}
        </ul>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default FavoriteList;
