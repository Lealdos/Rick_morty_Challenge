import { useState } from "react";
import {
  getStoredFavoriteCharacters,
  storeFavoriteCharacters
} from "../utils/keepCharacters";

export function useFavoriteCharacters() {
  const [favorites, setFavorites] = useState(() =>
    getStoredFavoriteCharacters()
  );

  const addToFavorites = (character) => {
    const alreadyInFav = favorites.some((fav) => fav.id === character.id);
    if (alreadyInFav) return;

    const newFavorites = [...favorites, character];
    setFavorites(newFavorites);
    storeFavoriteCharacters(newFavorites);
  };

  const removeFromFavorites = (character) => {
    const newFavorites = favorites.filter((fc) => fc.id !== character.id);
    setFavorites(newFavorites);
    storeFavoriteCharacters(newFavorites);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites
  };
}
