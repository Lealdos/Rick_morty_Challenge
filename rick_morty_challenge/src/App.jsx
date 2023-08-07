import { ListGrip, Card, Paginator, SearchFilters } from "./components";
import "./App.css";
import { useCharacters, useFavoriteCharacters } from "./hooks";

function App() {


  const {
    characters,
    pagination,
    handlePaginationChange,
    isLoading,
    fetchCharacters
  } = useCharacters();

  const {
    favorites,
    addToFavorites,
    removeFromFavorites
  } = useFavoriteCharacters();

  const handleSearch = (searchParams) => {
    fetchCharacters(searchParams);
  };

  return (
    <div className="main">
      <h1>Rick and Morty character</h1>
      <h2>favorites character</h2>
      <ListGrip
        gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
        justifyItems="center"
        gap="0.5rem"
        margin-bottom="1em"
      >
        {favorites?.map((character) => {
          return (
            <Card
              key={character.id}
              specie={character.species}
              status={character.status}
              name={character.name}
              image={character.image}
              buttonProps={{
                textButton: "Delete",
                colorButton: "red",
                functionButton: () => removeFromFavorites(character),
              }}
            ></Card>
          );
        })}
      </ListGrip>

      <hr />

      <h2>All character</h2>

      <SearchFilters handleSearch={handleSearch} />
      <Paginator
        disablePrev={isLoading || !pagination.prev}
        disableNext={isLoading || !pagination.next}
        handleNextClick={() => handlePaginationChange("next")}
        handlePrevClick={() => handlePaginationChange("prev")}
      />

      <div className="cards_list">
        {characters.map((character) => {
          return (
            <Card
              key={character.id}
              specie={character.species}
              status={character.status}
              name={character.name}
              image={character.image}
              buttonProps={{
                textButton: "Add",
                colorButton: "green",
                functionButton: () => addToFavorites(character),
              }}
            ></Card>
          );
        })}
      </div>
    </div>
  );
}

export default App;
