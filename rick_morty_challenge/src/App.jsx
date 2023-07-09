import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [allCharacter, setAllCharacter] = useState([
    { name: "leonardo", image: "" },
  ]);

  const [listFav, setListFav] = useState(() =>
    JSON.parse(localStorage.getItem("rickAndMorty"))
  );

  function addfav(character) {
    setListFav((oldListFav) => {
      localStorage.setItem(
        "rickAndMorty",
        JSON.stringify([...oldListFav, character])
      );
      return [...oldListFav, character];
    });
  }

  function deleteFav(character) {
    setListFav((oldListFav) => {
      localStorage.setItem(
        "rickAndMorty",
        JSON.stringify(
          oldListFav.filter((element) => element.name != character.name)
        )
      );
      return oldListFav.filter((element) => element.name != character.name);
    });
  }

  useEffect(() => {
    const getCharacterList = async () => {
      const response = await fetch("https://rickandmortyapi.com/api/character");
      const json = await response.json();
      const cleanJson = json.results.map((element) => {
        return { name: element.name, image: element.image };
      });
      setAllCharacter(cleanJson);
    };
    getCharacterList();
  }, []);
  console.log(allCharacter);
  return (
    <div>
      <h1>Rick and Morty character</h1>

      <form>
        <input type="text" placeholder="serching for character" disabled />
        <button>search</button>
      </form>

      <h2>favorites character</h2>
      {listFav.map((character) => {
        return (
          <div className="card" key={character.name}>
            <h3>{character.name}</h3>
            <button onClick={() => deleteFav(character)}>
              Delete from fav
            </button>
            <img src={character.image} alt={character.name + " image"} />
          </div>
        );
      })}

      <hr />

      <h2>All character</h2>
      {allCharacter.map((character) => {
        return (
          <div className="card" key={character.name}>
            <h3>{character.name}</h3>
            <button onClick={() => addfav(character)}>Fav</button>
            <img src={character.image} alt={character.name + " image"} />
          </div>
        );
      })}
    </div>
  );
}

export default App;
