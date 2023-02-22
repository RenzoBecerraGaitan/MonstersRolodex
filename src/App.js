//esto es una "clase" que nos brinda react en donde podemos usar todos los metodos. En  este caso al crear app extends component lo que hacemoss es poder acceder a los metodos y por ende tenemos este llamado render

import { useState, useEffect } from "react";

import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/serch-box/search-box.component";

import logo from "./logo.svg";
import "./App.css";

// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       name: { firstName: "Renzo", lastName: "Becerra" },
//       company: "Google",
//     };
//   }
//setState es un metodo que utilizamos para cambiar una key de un objeto. En este caso lo que cambia es el nombre de renzo por el de Andrei, no se puede hacer como en js, ya que si hacemos this.state.name lo que sucede es que existe un cambio en el objeto pero sigue siendo el mismo objeto, al ser el mismo objeto react no hace el render como es de esperarse.

//hay que teneren cuenta que si pasamos un str cuando deberiamos pasar un objeto lo que va a suceder es que no va a hacer el render que nosotros queremos, ya que el renden en si apunta a un objeto, y no a un string, entonces cuando el render busque por ej, this.state.name = 'renzo', no lo va a encontrar pero aun asi va a crear el objeto

//podemos notar que cuando realizamos en change name, que tiene un console.log, el objeto que nos da es el anterior al que ya esta render.. por que pasa eso? el setState es Asyng

/* <button
            onClick={() => {
              this.setState({
                name: { firstName: "Andrei", lastName: "Philips" },
              });
              console.log(this.state);
            }}
          > */
//otra forma de hacer esto es poniendo dos funciones dentro de setState(()=>{ return{}},()=>{}), la segunda solo se va a ejecutar una vez que la funcion 1 termine de ejecutarse. basicamete le pone un await (hablando en js)

//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Hi {this.state.name.firstName} {this.state.name.lastName}, I work at{" "}
//             {this.state.company}
//           </p>
//           <button
//             onClick={() => {
//               this.setState(
//                 () => {
//                   return {
//                     name: { firstName: "Andrei", lastName: "Philips" },
//                   };
//                 },
//                 () => {
//                   console.log(this.state);
//                 }
//               );
//             }}
//           >
//             Change Name
//           </button>
//         </header>
//       </div>
//     );
//   }
// }

// Monsters-rolodex Aplication

//pure functions, simpre retornan el mismo resultado estableciendo los mismos parametros, por ejemplo si realizamos una funcion donde establescamos un let que cambia, cuando usamos los mismos parametros ahora el resultado sera distinto

//otras impure function son las que tienen side effects  es cuando crea algo nuevo fuera de su scope ej
//const funccB = (a,b)=>{
//   c = a + b
//   return a * b;
// }
// en este caso el c seria un side effect ya que podriamos ingresar fuera de el scope

//hooks IMPORTANT
// todos los fetch son side effect por lo que hay que usar useEffect
//

const App = () => {
  const [searchField, setSearchField] = useState(""); // [value , setValue]
  const [monsters, setMonsters] = useState([]);
  const [filterMonsters, setFilterMonsters] = useState(monsters);
  console.log("render");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((respose) => respose.json())
      .then((users) => setMonsters(users));
  }, []); //tenemos que poner la funcion que genera sideeffects y luego lo que pasemos en los [] es lo que tenemos que poner cuando queremos que esto se repita

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    setFilterMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (e) => {
    const searchFieldString = e.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>

      <SearchBox
        className={"search-box-monsters"}
        placeholder={"Search Monsters"}
        onChangeHandler={onSearchChange}
      ></SearchBox>

      <CardList monsters={filterMonsters}></CardList>
    </div>
  );
};

// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       monsters: [],
//       searchField: "",
//     };
//   }

//   //obtener la lista de usuarios

//   //componentDidMount es un metodo que se ejecuta cuando se monta el sitio en el DOM y no antes

//   //notar que el setState es basicamente un re-render

//   componentDidMount() {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((respose) => respose.json())
//       .then((users) =>
//         this.setState(() => {
//           return { monsters: users };
//         })
//       );
//   }

//   //A good rule of thumb as to when to use the key attribute you saw in the previous video, is this: Anytime you use the map() function inside of render, or you have a list of the same jsx elements one after another, they need a key attribute (and CRA will warn you about it if you miss it)

//   //react necesita el key value, y como vemos no lo displea ni nada por el estilo

//   //tener en cuenta que NO debemos modificar los array o objetos originales, y siempre trabajar con la copia de estos. en este caso paso que cuando hacemos el setState lo que ocurre es que nos cambia el array original y eso es algo que debemos evitar

//   onSearchChange = (e) => {
//     const searchField = e.target.value.toLocaleLowerCase();

//     this.setState(() => {
//       return { searchField };
//     });
//   };
//   //en este caso al principio teniamos este statement dentro de onchange event, que es lo que pasa, que cada vez que nosotros buscabamos algo react tenia que re crear la funcion, y cuando en realidad lo unico que se modifica es el event, para que esto no pase, creamos el statement fuera del method para que sea mas eficiente

//   render() {
//     //para acortar el codigo y no tengamos que utilizar el this tantas veces podemos usar distructuring
//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;

//     const filterMonsters = monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchField);
//     });

//     return (
//       <div className="App">
//         <h1 className="app-title">Monsters Rolodex</h1>

//         <SearchBox
//           className={"search-box-monsters"}
//           placeholder={"Search Monsters"}
//           onChangeHandler={onSearchChange}
//         ></SearchBox>

//         <CardList monsters={filterMonsters}></CardList>
//       </div>
//     );
//     //los props son en este caso monsters={filterMonsters}, como vemos podemos usarlos para pasar info de un archivo a otro. otra ventaja de los props es que cuando cambian ejecutan un re-render

//     //vemos varios render ya que por cada prop o cada setState se re-render
//   }
// }

export default App;
