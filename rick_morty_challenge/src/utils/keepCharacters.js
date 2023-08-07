const FAV_KEY = "rickAndMortyFavCharacter";

export function getStoredFavoriteCharacters() {
  const value = localStorage.getItem(FAV_KEY);
  return value ? JSON.parse(value) : [];
}

export function storeFavoriteCharacters(favorites) {
  localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
}
