import { useEffect, useState } from 'react';
import './App.css';

function App() {
  let url = new URL('https://rickandmortyapi.com/api/character/');

  // usar un hook para la url e inicializarlo como inicialice el listFav con una funcion anonima que retorne su valor inicial y luego cambiar eso en el codigo
  const [allCharacter, setAllCharacter] = useState([]);

  const [listFav, setListFav] = useState(() => {
    const stored = localStorage.getItem('rickAndMorty');
    return stored ? JSON.parse(stored) : [];
  });

  function addFav(character) {
    const isInFavList = (personaje) => {
      return personaje.id === character.id;
    };
    if (listFav?.some(isInFavList)) {
      return;
    }
    setListFav((oldListFav) => {
      localStorage.setItem(
        'rickAndMorty',
        JSON.stringify([...oldListFav, character])
      );
      return [...oldListFav, character];
    });
  }

  function deleteFav(character) {
    setListFav((oldListFav) => {
      localStorage.setItem(
        'rickAndMorty',
        JSON.stringify(
          oldListFav.filter((element) => element.name != character.name)
        )
      );
      return oldListFav.filter((element) => element.name != character.name);
    });
  }

  const pagination = (data) => {


  }


  const fechingApi = async (link) =>{
    const response = await fetch(link);
    const json = await response.json();
    const cleanJson = json.results.map((element) => {
      return {
        id: element.id,
        name: element.name,
        image: element.image,
        species: element.species,
        status: element.status,
      };
    });
    return cleanJson
  }

  const getCharacterList =  async (api) => {
     setAllCharacter(await fechingApi(api));
  };

  const filterSearch = (specie) => {
    let params = new URLSearchParams(url.search);
    params.set('species', specie);
    if (specie === 'all') {
      params.delete('species');
      return getCharacterList(url.href)
    }
    url.search = params.toString();
    let updatedUrl = url.toString();
    return getCharacterList(updatedUrl);
  };

  useEffect(() => {
    getCharacterList(url.href);
  }, []);
  
  return (
    <div>
      <h1>Rick and Morty character</h1>
        <button onClick= {()=>pagination(url.href)}>next</button> 
        <button>prev</button> 
      <form>
        <input type="text" placeholder="serching for character" disabled />
        <button>search</button>
      </form>

      <h2>favorites character</h2>
      <div className='cards'>
      {listFav?.map((character) => {
        return (
          
          <div className="card" key={character.id}>
            <h5>Specie: {character.species}</h5>
            <h5>Status: {character.status}</h5>
            <img src={character.image} alt={character.name + ' image'} />
            <h3>{character.name}</h3>
            <button onClick={() => deleteFav(character)}>
              Delete from fav
            </button>
          </div>
        );
      })}

      </div>

      <hr />

      <h2>All character</h2>
      <label htmlFor="species">filter by: </label>
      <select
        name="species"
        onChange={(e) => {
          filterSearch(e.target.value);
        }}
      >
        <option value="all">All</option>
        <option value="human">Human</option>
        <option value="alien">Alien</option>
        <option value="unknown">Unknown</option>
      </select>

      
      <div className="cards">
      {allCharacter.map((character) => {
        return (
          <div className="card" key={character.id}>
            <h5>Specie: {character.species}</h5>
            <h5>Status: {character.status}</h5>
            <img src={character.image} alt={character.name + ' image'} />
            <h3>{character.name}</h3>
            <button onClick={() => addFav(character)}>Fav</button>
          </div>
        );
      })}
      </div>
    </div>
  );
}

export default App;