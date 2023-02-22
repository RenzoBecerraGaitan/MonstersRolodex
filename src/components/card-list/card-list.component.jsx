import Card from "../card/card.component";
import "./card-list.style.css";

const CardList = ({ monsters }) => (
  <div className="card-list">
    {monsters.map((monster) => {
      return <Card key={monster.id} monster={monster}></Card>;
    })}
  </div>
);

export default CardList;

//cuado retornamos components nos tenemos que asegurar que sea solo 1 componente, puede tener multiples componentes dentro pero siempre tiene que existir 1 solo padre
