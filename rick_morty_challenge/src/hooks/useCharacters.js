import { useState, useEffect, useCallback } from "react";
import { getCharactersList } from "../services/character";

export function useCharacters() {
  const [characters, setCharacters] = useState([]);

  const [pagination, setPagination] = useState({
    count: 0,
    pages: 0,
    next: null,
    prev: null
  });

  const [isLoading, setIsLoading] = useState(true);

  const fetchCharacters = useCallback(async (params) => {
    setIsLoading(true);

    const characters = await getCharactersList(params);

    if (characters.error) return;

    setCharacters(characters.results);
    setPagination(characters.info);

    setIsLoading(false);
  }, []);

  /**
   * Hace fetch de la pagina anterior o siguiente dependiendo de la direccion
   * @param {*} direction: es 'next' o es 'prev'
   */
  const handlePaginationChange = (direction) => {
    const search = new URL(pagination[direction] ?? "").search;
    const searchParams = new URLSearchParams(search);
    const params = Object.fromEntries(searchParams.entries());

    fetchCharacters({ ...params, page: params.page });
  };

  // Fetch on mount
  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  return {
    characters,
    pagination,
    handlePaginationChange,
    isLoading,
    fetchCharacters
  };
}
