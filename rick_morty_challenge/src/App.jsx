import { Card } from "./componets/Card";
import debounce from "just-debounce-it" 
import { useEffect, useState,useCallback } from "react";
import "./App.css";

function App() {
  const API_URL = 'https://rickandmortyapi.com/api/character/';
  const url = new URL(API_URL);
  const [listUrl, setListUrl] = useState(url);
  const [prevUrl, setPreUrl] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);
  const [allCharacter, setAllCharacter] = useState([]);
  const WAITSEARCH = 800

  const [listFav, setListFav] = useState(() => {
    const stored = localStorage.getItem('rickAndMorty');
    return stored ? JSON.parse(stored) : [];
  });

  function addFav(character) {
    const isInFavList = (card) => {
      return card.id === character.id;
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

  const paginationUp = async () => {
    return getCharacterList(nextUrl);
  };

  const paginationDown = async () => {
    return getCharacterList(prevUrl);
  };

  const fechingApi = async (apiLink) => {
    const response = await fetch(apiLink);
    const json = await response.json();
    setNextUrl(() => {
      return json.info.next ? json.info.next : null;
    });
    setPreUrl(() => {
      return json.info.prev ? json.info.prev : null;
    });

    const characterInfo = json.results.map((element) => {
      return {
        id: element.id,
        name: element.name,
        image: element.image,
        species: element.species,
        status: element.status,
      };
    });
    return characterInfo;
  };

  const getCharacterList = async (apiLink) => {
    setAllCharacter(await fechingApi(apiLink));
  };

  const filterBySearch = (specie) => {
    setListUrl(() => {
      return modifyUrl('species', specie, 'all');
    });
    return getCharacterList(listUrl);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Read the form data
    const form = event.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    const search = formJson.searchbyname;
    setListUrl(() => {
      return modifyUrl('name', search, '');
    });
    return getCharacterList(listUrl);
  };

  const modifyUrl = (searchParam, newValue, valueToCheck) => {
    let params = new URLSearchParams(listUrl.search);
    let updatedUrl = '';
    if (newValue === valueToCheck) {
      params.delete(searchParam);
      listUrl.search = params.toString();
      updatedUrl = listUrl.toString();
      return new URL(updatedUrl);
    }
    params.delete(searchParam);
    params.set(searchParam, newValue);
    listUrl.search = params.toString();
    updatedUrl = listUrl.toString();
    return new URL(updatedUrl);
  };

  const handleChange = (event) =>{
    const newSearch = event.target.value
    debounceGetCharacter(modifyUrl('name',newSearch,''))


  }

  const debounceGetCharacter = useCallback( debounce(searching => {
    getCharacterList(searching)
  }, WAITSEARCH),[]
  )


  useEffect(() => {
    getCharacterList(listUrl.href);
  }, [listUrl]);

  return (
    <div className="main">
      <h1>Rick and Morty character</h1>
      <h2>favorites character</h2>
      <div className="cards_list_fav">
        {listFav?.map((character) => {
          return (
            <Card
              key={character.id}
              specie={character.species}
              status={character.status}
              name={character.name}
              image={character.image}
              fun={() => deleteFav(character)}
              namefuntion="delete"
            ></Card>
          );
        })}
      </div>

      <hr />

      <h2>All character</h2>

      <button onClick={paginationUp}>next</button>
      <button onClick={paginationDown}>prev</button>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange}
          type="text"
          name="searchbyname"
          placeholder="serching for character"
        />
        <button>search</button>
      </form>

      <label htmlFor="search">filter by: </label>
      <select
        name="species"
        onChange={(e) => {
          filterBySearch(e.target.value);
        }}
      >
        <option defaultValue value="all">
          All
        </option>
        <option value="human">Human</option>
        <option value="alien">Alien</option>
        <option value="animal">animal</option>
        <option value="unknown">Unknown</option>
      </select>

      <div className="cards_list">
        {allCharacter.map((character) => {
          return (
            <Card
              key={character.id}
              specie={character.species}
              status={character.status}
              name={character.name}
              image={character.image}
              fun={() => addFav(character)}
              namefuntion="add"
            ></Card>
          );
        })}
      </div>
    </div>
  );
}

export default App;
