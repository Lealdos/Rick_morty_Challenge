import { Card } from "./componets/Card";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const API_URL = "https://rickandmortyapi.com/api/character/?";
  const url = new URL(API_URL);
  const [listUrl, setListUrl] = useState([url]);
  const [prevUrl, setPreUrl] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);
  const [allCharacter, setAllCharacter] = useState([]);

  const [listFav, setListFav] = useState(() => {
    const stored = localStorage.getItem("rickAndMorty");
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
      return json.info.next;
    });
    setPreUrl(() => {
      return json.info.prev;
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

  const filterSearch = (specie) => {
    let params = new URLSearchParams(url.search);
    let updatedUrl = "";
    params.delete("page");
    params.set("species", specie);
    if (specie === "all") {
      params.delete("species");
      url.search = params.toString();
      updatedUrl = url.toString();
      return getCharacterList(updatedUrl);
    }
    url.search = params.toString();
    updatedUrl = url.toString();
    return getCharacterList(updatedUrl);
  };

  const searching = (e, formsearch) => {
    e.preventDefault();
  };
  useEffect(() => {
    getCharacterList(url.href);
  }, []);

  return (
    <div>
      <h1>Rick and Morty character</h1>
      <button onClick={() => paginationUp()}>next</button>
      <button onClick={() => paginationDown()}>prev</button>
      <form onSubmit={(e) => searching(e, e.value)}>
        <input type="text" placeholder="serching for character" />
        <button>search</button>
      </form>

      <h2>favorites character</h2>
      <div className="cards_list">
        {listFav?.map((character) => {
          return (
            <Card key={character.id} specie={character.specie} status={character.status} name={character.name} image={character.image} fun={()=>deleteFav(character)} namefuntion='delete'></Card>
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

      <div className="cards_list">
        {allCharacter.map((character) => {
          return (
            <Card key={character.id} specie={character.specie} status={character.status} name={character.name} image={character.image} fun={()=>addFav(character)} namefuntion='add' ></Card>
          );
        })}
      </div>
    </div>
  );
}

export default App;
