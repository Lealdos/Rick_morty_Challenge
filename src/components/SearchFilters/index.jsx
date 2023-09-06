import { CHARACTER_STATUSES } from "../../services/character";
// import debounce from "just-debounce-it";
import styles from "./index.module.css";

const noOp = () => null;

export function SearchFilters(searching) {
  
  const { handleSearch = noOp } = searching;
  const { handleFilterSearch = noOp } = searching;
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    handleSearch(formValues);
  };

    //reparar esta funcion 
  const filterBySearch = (event) => {
    const filterData = new Object(event.currentTarget);
    console.log('leo ',filterData)
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleFormSubmit}
      autoComplete="off"
    >
      <input name="name" type="search" placeholder="search by name..." />
      <select name="status" onChange={filterBySearch}>
        <option value="">Select an option</option>
        {CHARACTER_STATUSES.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
      <button type="submit">Search</button>
    </form>
  );
}

// const debounceGetCharacter = useCallback(
//     debounce((searching) => {
//       getCharacterList(searching);
//     }, SEARCH_WAIT),
//     [getCharacterList]
//   );
