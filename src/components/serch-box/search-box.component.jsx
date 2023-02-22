import "./search-box.style.css";

//cada vez que importamos un estilo se aplica a toda la app no solo donde lo importamos. por ejemplo podemos cambiar el color de card-list por mas que no este aca

const SearchBox = ({ className, placeholder, onChangeHandler }) => (
  <input
    className={`search-box ${className}`}
    type="search"
    placeholder={placeholder}
    onChange={onChangeHandler}
  ></input>
);

export default SearchBox;
