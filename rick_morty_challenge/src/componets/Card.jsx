export function Card(props) {
    console.log(props)
  return (
    <div className="card">
      <h5>Specie: {props.specie}</h5>
      <h5>Status: {props.status}</h5>
      <img src={props.image} alt={props.name + " image"} />
      <h3>{props.name}</h3>
      <button onClick={props.fun}>{props.namefuntion} from fav</button>
    </div>
  );
}
