import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [allCharacter, setAllCharacter] = useState([
    { name: "leonardo", image: "" ,species:""},
  ]);

  const [listFav, setListFav] = useState(() =>
    JSON.parse(localStorage.getItem("rickAndMorty"))
  );

  function addFav(character) {
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

 const filterSearch = (specie)=>{
  const getCharacterList = async () => {
    const response = await fetch(`https://rickandmortyapi.com/api/character/?species=${specie}`);
    const json = await response.json();
    const cleanJson = json.results.map((element) => {
      return {id:element.id, name: element.name, image: element.image, species:element.species,status:element.status };
    });
    setAllCharacter(cleanJson);
  };
  getCharacterList();

 }

  useEffect(() => {
    const getCharacterList = async () => {
      const response = await fetch("https://rickandmortyapi.com/api/character/");
      const json = await response.json();
      const cleanJson = json.results.map((element) => {
        return { id:element.id,name: element.name, image: element.image, species:element.species,status:element.status };
      });
      setAllCharacter(cleanJson);
    };
    getCharacterList();
  }, []);
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
          <div className="card" key={character.id}>
            <h3>{character.name}</h3>
            <h5>Specie: {character.species}</h5>
            <h5>Status: {character.status}</h5>
            <img src={character.image} alt={character.name + " image"} />
            <button onClick={() => deleteFav(character)}>
              Delete from fav
            </button>
          </div>
        );
      })}

      <hr />

      <h2>All character</h2>
      <label htmlFor="species">filter by: </label>
      <select name="species"  onChange={e =>{
        filterSearch(e.target.value)
      }
      } >
      <option value=''>All</option>
      <option value='human'>Human</option>
      <option value='alien'>Alien</option>
      <option value='unknown'>Unknown</option>
      </select>
   

      {allCharacter.map((character) => {
        return (
          <div className="card" key={character.id}>
            <h3>{character.name}</h3>
            <h5>Specie: {character.species}</h5>
            <h5>Status: {character.status}</h5>
            <img src={character.image} alt={character.name + " image"} />
            <button onClick={() => addFav(character)}>Fav</button>
          </div>
        );
      })}
    </div>



  );
}

export default App;
