import React, { Component } from "react";
import Header from "./components/Header/index";
import BeerCards from "./components/BeerCards/index";
import "../src/App.css";
const beerURL = "https://beer.fluentcloud.com/v1/beer";
const proxyURL = "https://cors-anywhere.herokuapp.com/";

class App extends Component {
  constructor() {
    super();
    this.state = {
      allBeers: [],
      addedBeer: "",
      loading: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.addBeerClick = this.addBeerClick.bind(this);
    this.likeClick = this.likeClick.bind(this);
  }

  componentDidMount() {
    this.fetchGet();
  }

  componentDidUpdate(prevState) {
    if (prevState.allBeers !== this.state.allBeers) {
      this.fetchGet();
    }
  }

  fetchGet() {
    fetch(proxyURL + beerURL)
      .then(response => {
        return response.json();
      })
      .then(response => {
        this.setState({ allBeers: response, loading: false });
      })
      .catch(() =>
        console.log(
          "Can’t access " + beerURL + " response. Blocked by browser?"
        )
      );
  }

  handleChange(event) {
    event.preventDefault();
    const value = event.target.value;
    this.setState({
      addedBeer: value
    });
  }

  handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  likeClick(beerID, event) {
    const beers = this.state.allBeers;
    const currentLikes = parseInt(event.target["value"]);
    const newLikes = currentLikes + 1;
    let updatedBeers = beers.filter(beer => {
      return !(beer.id === beerID);
    });
    const updatedBeerBody = {
      id: beerID,
      likes: newLikes,
      name: event.target["name"]
    };
    updatedBeers.push(updatedBeerBody);

    this.setState({ allBeers: updatedBeers });

    fetch(proxyURL + `https://beer.fluentcloud.com/v1/beer/${beerID}`, {
      method: "PUT",
      headers: new Headers({
        "content-type": "application/json"
      }),
      body: JSON.stringify(updatedBeerBody)
    })
      .then(this.props.handleErrors)
      .then(json => {
        console.log(json);
      })
      .catch(error => {
        console.error(error);
      });
  }

  addBeerClick(event) {
    event.preventDefault();
    const beerName = this.state.addedBeer;
    const beers = this.state.allBeers;
    const maxId =
      Math.max.apply(
        Math,
        beers.map(function(o) {
          return o.id;
        })
      ) + 1;
    const addedBeerPostBody = {
      id: maxId,
      name: beerName,
      likes: "0"
    };
    if (beerName.length > 0) {
      fetch(proxyURL + beerURL, {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json"
        }),
        body: JSON.stringify(addedBeerPostBody)
      })
        .then(this.handleErrors)
        .then(json => {
          console.log(json);
        })
        .catch(error => {
          console.error(error);
        });
    }
    this.fetchGet();
    this.setState({ addedBeer: "" });
  }

  render() {
    if (this.state.allBeers.length === 0) {
      return (
        <div className="progress">
          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            aria-valuenow="75"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: 300 }}
          />
        </div>
      );
    }
    const beerState = this.state.allBeers;
    const beerSections = beerState.map(beer => {
      return (
        <BeerCards
          key={beer.id}
          id={beer.id}
          name={beer.name}
          likes={beer.likes}
          likeClick={this.likeClick}
        />
      );
    });

    return (
      <div className="container">
        <Header />
        <main className="container row justify-content-center">
          <div className="card col-xs-12 col-sm-6 col-md-4 border border-primary">
            <h2 className="card-header text-warning font-weight-bold">
              Beer Cooler
            </h2>
            <div className="card-body">
              <h3 className="card-title font-weight-bold">Beers</h3>
            </div>
            <ul className="list-group list-group-flush">{beerSections}</ul>
          </div>
          <div className="card col-xs-12 col-sm-6 col-md-4">
            <div className="card-body">
              <div className="form-group">
                <label
                  className="col-form-label col-form-label-sm text-danger"
                  htmlFor="inputSmall"
                >
                  Add A Beer!
                </label>
                <input
                  className="form-control form-control-sm"
                  type="text"
                  placeholder="Ex: Budweiser"
                  id="inputSmall addedBeer"
                  name="addedBeer"
                  value={this.state.addedBeer}
                  onChange={this.handleChange}
                />
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={this.addBeerClick}
                >
                  Add Beer!
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
