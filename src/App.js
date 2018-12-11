import React, { Component } from "react";
import Header from './components/Header/index';
import Main from './components/Main/index'

const beerURL = "https://beer.fluentcloud.com/v1/beer";
const proxyURL = "https://cors-anywhere.herokuapp.com/";


class App extends Component {
  constructor() {
    super();
    this.state = {
      allBeers: [],
      selectedBeer: []
    };
  }

  // likeClick = (beerName) => {
  //   console.log("you clicked me!")
  //   console.log(beerName)
  //   let beerNames = 
  //     this.state.allBeers
  //   let newState = beerNames.filter(beer => {
       
  //       //if true current gets returned to new array
  //       //if false it gets taken out
  //       return !(beerName === beer.name)
  //     })
    
  //   this.setState({
  //     modification: beerName,
  //     data: newState
  //   })
  // }

  componentDidMount() {
    fetch(proxyURL + beerURL)
      .then(response => {
        return response.json();
      })
      .then(response => {
        console.log(response);
        this.setState({ allBeers: response })
      })
      .catch(() => console.log("Can’t access " + beerURL + " response. Blocked by browser?"))
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <Header />
        <Main beers={this.state.allBeers}
              likeClick={this.likeClick}
        />
      </div>
    );
  }
}

export default App;

// <header className="App-header">
//           <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
//             <a className="navbar-brand" href="#">
//               Navbar
//             </a>
//           </nav>
//         </header>
//         <main className="container">
//           <h2>Show Beers Here</h2>
//         </main>