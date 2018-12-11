import React, { Component } from "react";
import Header from "./components/Header/index";
import BeerCards from "./components/BeerCards/index";

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
  }

  handleChange(event) {
    event.preventDefault();
    const value = event.target.value;
    this.setState({
      addedBeer: value
    });
  }

  addBeerClick(event) {
    event.preventDefault();
    const beerName = this.state.addedBeer;
    const addedBeerPostBody = {
      name: beerName,
      likes: "0"
    };
    console.log(beerName, addedBeerPostBody);
    fetch(proxyURL + beerURL, {
      method: "POST",
      headers: new Headers({
        "content-type": "application/json"
      }),
      body: JSON.stringify(addedBeerPostBody)
    })
      .then(response => {
        console.log(response);
        if (response.ok) {
          return response.json();
        } else {
          const contentType = response.headers.get("content-type");
          if (contentType.startsWith("application/json")) {
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
        console.error("error", error.message);
        // show an error message
      });
  }

  componentDidMount() {
    fetch(proxyURL + beerURL)
      .then(response => {
        return response.json();
      })
      .then(response => {
        console.log(response);
        this.setState({ allBeers: response });
      })
      .catch(() =>
        console.log(
          "Can’t access " + beerURL + " response. Blocked by browser?"
        )
      );
      this.setState({ loading: false })
  }

  render() {
    console.log(this.state);
    if (this.state.allBeers.length === 0) {
      return <div class="progress">
      <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: 300 }}></div>
    </div>;
    }
    const beerSections = this.state.allBeers.map(beer => {
      return (
        <BeerCards
          id={beer.id}
          name={beer.name}
          likes={beer.likes}
          likeClick={this.likeClick}
        />
      );
    });

    return (
      <div>
        <Header />
        <main className="container">
          <section className="row">
            <div className="card mb-3 col-sm-4">
              <h2 className="card-header text-warning font-weight-bold">Beer Cooler</h2>
              <div className="card-body">
                <h3 className="card-title font-weight-bold">Beers</h3>
              </div>
              <ul className="list-group list-group-flush">{beerSections}</ul>
            </div>
            <div className="card mb-3 col-sm-4">
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
                    placeholder="Budweiser"
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
          </section>
        </main>
      </div>
    );
  }
}

export default App;
