import { card } from "./index.module.css";

export function Card(cardProps) {
  const { specie, status, name, image, buttonProps } = cardProps;
  return (
    <div className={card}>
      <h5>Specie: {specie}</h5>
      <h5>Status: {status}</h5>
      <img src={image} alt={name + " image"} />
      <h3>{name}</h3>
      <button
        style={{ backgroundColor: buttonProps.colorButton }}
        onClick={buttonProps.functionButton}
      >
        {buttonProps.textButton} from fav
      </button>
    </div>
  );
}
