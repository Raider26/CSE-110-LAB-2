import React from "react";

interface FavoriteListProps {
  favorites: string[];
}

const FavoriteList: React.FC<FavoriteListProps> = ({ favorites }) => {
  return (
    <div>
      <h3>List of favorites:</h3>
      {favorites.length > 0 ? (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {favorites.map((favorite, index) => (
            <li key={index}>test note {favorite}</li>
          ))}
        </ul>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default FavoriteList;
