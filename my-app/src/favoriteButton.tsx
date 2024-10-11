import React from "react";

interface FavoriteButtonProps {
  item: string;
  isFavorited: boolean;
  onToggleFavorite: (item: string) => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  item,
  isFavorited,
  onToggleFavorite,
}) => {
  const toggleFavorite = () => {
    onToggleFavorite(item);
  };

  const heartColor = isFavorited ? "red" : "gray";

  return (
    <button
      onClick={toggleFavorite}
      style={{
        color: heartColor,
      }}
    >
      &#9829;
    </button>
  );
};

export default FavoriteButton;
