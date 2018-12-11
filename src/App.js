import React, { Component } from "react";
import Header from './components/Header/index';
import BeerCards from './components/BeerCards/index'

const beerURL = "https://beer.fluentcloud.com/v1/beer";
const proxyURL = "https://cors-anywhere.herokuapp.com/";


class App extends Component {
  constructor() {
    super();
    this.state = {
      allBeers: [],
      addedBeer: "",
      selectedBeer: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.addBeerClick = this.addBeerClick.bind(this);

  }

  handleChange(event) {
    event.preventDefault();
    const value = event.target.value;
    console.log()
    // const name = event.target.name;
    
    this.setState({
      addedBeer: value
    });
    // this.isbeingfilled();
  }

  addBeerClick(event) {
    event.preventDefault();
    const beerName = this.state.addedBeer;
    const addedBeerPostBody = {
      "name": beerName,
      "likes": "0"
    }
    console.log(beerName, addedBeerPostBody)
    fetch((proxyURL + beerURL)
    , {
      method: 'POST',
      headers: new Headers({
        "content-type": "application/json"
      }),
      body: JSON.stringify(addedBeerPostBody)
    })
    // // .then((response) => response.json())
    // .then(function(response) {
    //   console.log(response);
    // });
    .then(response => {
      console.log(response);
      if(response.ok) {
        return response.json();
      } else {
        const contentType = response.headers.get('content-type');
        if (contentType.startsWith('application/json')) {
          return response.json().then(json => {
            const error = new Error(json.error.message);
            throw error;
          });
        } else {
          const error = new Error(response.statusText);
          throw error;
        }
      }
    })
    .then(json => {
      console.log(json);
      
    })
    .catch(error => {
      console.error('error', error.message);
      // show an error message
    });
  

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

    const beerSections = this.state.allBeers.map(beer => {
      return <BeerCards 
          id={beer.id} 
          name={beer.name} 
          likes={beer.likes} 
          likeClick={this.likeClick}
      />;
    });

    return (
      <div>
        <Header />
        <main className="container">
      <section className=" column">
        <div className="card mb-3">
          <h2 className="card-header">Beer Cooler</h2>
          <div className="card-body">
            <h3 className="card-title">Beers</h3>
          </div>
          <ul className="list-group list-group-flush">{beerSections}</ul>
        </div>
      </section>
      <section className=" column">
        <div className="card mb-3">
          <div className="card-body">
            <div className="form-group">
              <label
                className="col-form-label col-form-label-sm"
                htmlFor="inputSmall"
              >
                Add A Beer!
              </label>
              <input
                className="form-control form-control-sm"
                type="text"
                placeholder="Budweiser"
                id="inputSmall addedBeer"
                name="addedBeer"
                value={this.state.addedBeer}
                onChange={this.handleChange}
              />
              <button type="button" className="btn btn-primary btn-sm" onClick= { this.addBeerClick}
              >Add Beer!</button>             
            </div>
          </div>
        </div>
      </section>
    </main>
        
      </div>
    );
  }
}

export default App;

// <Main beers={this.state.allBeers}
//               addBeerClick={this.addBeerClick}
//               likeClick={this.likeClick}
//               value={this.state.addedBeer}
//               handleChange={this.handleChange}
//         />




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